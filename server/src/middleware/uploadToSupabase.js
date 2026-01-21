const supabase = require('../config/supabase');
const path = require('path');

/**
 * Middleware to upload file to Supabase Storage
 * @param {string} bucketName - The name of the storage bucket
 * @param {string} [folderName] - Optional folder within the bucket (default: '')
 */
const uploadToSupabase = (bucketName, folderName = '') => async (req, res, next) => {
    if (!req.file) return next();

    try {
        const file = req.file;
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
        // If folderName is provided, ensure it ends with /
        const folderPath = folderName ? (folderName.endsWith('/') ? folderName : `${folderName}/`) : '';
        const filePath = `${folderPath}${fileName}`;

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return res.status(500).json({
                message: 'Error uploading file to storage',
                error: error.message,
                details: 'Make sure the Storage Bucket exists in Supabase and is public.'
            });
        }

        // Get public URL
        const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        // Update req.file to have the properties expected by controllers
        req.file.filename = fileName;
        req.file.path = publicData.publicUrl;
        req.file.publicUrl = publicData.publicUrl;
        // Also set destination to mimic disk behavior if needed, but path is the URL now.

        next();
    } catch (err) {
        console.error('Upload middleware exception:', err);
        res.status(500).json({ message: 'Server upload error' });
    }
};

module.exports = uploadToSupabase;
