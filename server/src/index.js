const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const profileRoutes = require('./routes/profile.routes');
const propertyRoutes = require('./routes/propertyRoutes');
const configRoutes = require('./routes/configRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const portalConfigRoutes = require('./routes/portalConfigRoutes');
const documentationRoutes = require('./routes/documentationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
// CORS configuration
const whitelist = [
  process.env.CLIENT_URL,
  'https://gestionatuspropiedades.com',
  'https://www.gestionatuspropiedades.com',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Loose check to allow subpaths or exact matches, or just check whitelist
    if (whitelist.indexOf(origin) !== -1 || whitelist.some(w => origin.startsWith(w))) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/config', configRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/portal-config', portalConfigRoutes);
app.use('/api/documentation', documentationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
