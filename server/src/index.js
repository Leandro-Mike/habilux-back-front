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

// Temporary Admin Init
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const initAdmin = async () => {
  try {
    const email = 'sergioleandroramirez97@gmail.com';
    const password = '003584Fyl#.#';
    const exists = await prisma.user.findUnique({ where: { email } });
    if (!exists) {
      console.log('--- AUTO-CREATING ADMIN USER ---');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await prisma.user.create({
        data: {
          name: 'Sergio',
          lastName: 'Ramirez',
          email,
          password: hashedPassword,
          role: 'ADMIN',
          status: 'APPROVED'
        }
      });
      console.log('--- ADMIN USER CREATED SUCCESSFULLY ---');
    }
  } catch (e) {
    console.error('Error init admin:', e);
  }
};

app.listen(PORT, async () => {
  await initAdmin();
  console.log(`Server running on port ${PORT}`);
});
