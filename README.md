# 🏠 Habilux - Sistema de Gestión de Propiedades

Sistema completo de gestión de propiedades inmobiliarias con roles de administrador, propietarios e inquilinos.

## 🚀 Despliegue Rápido

### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

📖 **[Ver Guía Completa de Despliegue](./deployment_guide.md)**

---

## 📁 Estructura del Proyecto

```
habilux-4/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/           # Configuración de Axios
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas de la aplicación
│   │   └── ...
│   ├── .env.example       # Variables de entorno de ejemplo
│   └── package.json
│
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── middleware/    # Middleware (auth, upload, etc.)
│   │   ├── routes/        # Rutas de la API
│   │   └── index.js       # Punto de entrada
│   ├── prisma/
│   │   └── schema.prisma  # Esquema de base de datos
│   ├── .env.example       # Variables de entorno de ejemplo
│   └── package.json
│
├── railway.json           # Configuración de Railway
├── vercel.json           # Configuración de Vercel
└── DEPLOYMENT.md         # Guía de despliegue
```

---

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 18+ 
- PostgreSQL (o usar Railway para desarrollo)
- npm o yarn

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd habilux-4/Habilux-3
   ```

2. **Configurar el Backend**
   ```bash
   cd server
   cp .env.example .env
   # Edita .env con tus valores
   npm install
   npx prisma migrate dev
   npx prisma generate
   npm run dev
   ```

3. **Configurar el Frontend**
   ```bash
   cd ../client
   cp .env.example .env
   # Edita .env con la URL de tu backend
   npm install
   npm run dev
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

---

## 🌐 Variables de Entorno

### Backend (server/.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/habilux"
JWT_SECRET="tu-clave-secreta-aqui"
PORT=3000
CLIENT_URL="http://localhost:5173"
```

### Frontend (client/.env)

```env
VITE_API_URL="http://localhost:3000/api"
```

---

## 📦 Tecnologías

### Frontend
- **React 19** - Librería UI
- **Vite** - Build tool
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

### Backend
- **Node.js** - Runtime
- **Express 5** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Multer** - Upload de archivos
- **bcryptjs** - Encriptación de contraseñas

---

## 🔐 Roles y Permisos

### ADMIN
- Gestión completa del sistema
- Aprobación de usuarios
- Configuración del portal
- Gestión de propiedades, ciudades y tipos

### OWNER (Propietario)
- Gestión de sus propiedades
- Asignación de inquilinos
- Visualización de pagos
- Gestión de documentación

### TENANT (Inquilino)
- Visualización de su propiedad
- Solicitudes de mantenimiento
- Upload de comprobantes de pago
- Acceso a documentación

### GUEST
- Acceso limitado
- Pendiente de aprobación

---

## 📝 Características Principales

- ✅ Sistema de autenticación con JWT
- ✅ Gestión de usuarios con roles
- ✅ CRUD de propiedades
- ✅ Sistema de pagos con comprobantes
- ✅ Solicitudes de mantenimiento
- ✅ Gestión de documentación
- ✅ Sistema de notificaciones
- ✅ Panel de administración
- ✅ Configuración de portal (logo, favicon, título)
- ✅ Campos dinámicos para usuarios
- ✅ Perfiles de usuario con avatar

---

## 🚀 Despliegue en Producción

### Opción 1: Railway + Vercel (Recomendado)

1. **Backend en Railway:**
   - Crea un proyecto nuevo
   - Provision PostgreSQL
   - Conecta tu repositorio
   - Configura variables de entorno
   - Railway desplegará automáticamente

2. **Frontend en Vercel:**
   - Importa tu repositorio
   - Configura Root Directory: `client`
   - Agrega variable `VITE_API_URL`
   - Vercel desplegará automáticamente

📖 **[Ver Guía Completa](./deployment_guide.md)**

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y propietario.

---

## 📞 Soporte

Para preguntas o soporte, contacta al equipo de desarrollo.

---

## 🎯 Roadmap

- [ ] Integración con pasarelas de pago
- [ ] App móvil (React Native)
- [ ] Reportes y analytics
- [ ] Sistema de mensajería interna
- [ ] Integración con servicios de terceros
- [ ] API pública con documentación

---

**Hecho con ❤️ para la gestión eficiente de propiedades**
