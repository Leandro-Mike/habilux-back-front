const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const uploadDocumentation = require('../middleware/uploadDocumentation');
const {
    createDocumentation,
    getDocumentation,
    deleteDocumentation
} = require('../controllers/documentationController');

const uploadToSupabase = require('../middleware/uploadToSupabase');

router.post('/', protect, uploadDocumentation.single('file'), uploadToSupabase('documentation'), createDocumentation);
router.get('/', protect, getDocumentation);
router.delete('/:id', protect, deleteDocumentation);

module.exports = router;
