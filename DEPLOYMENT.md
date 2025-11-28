# Guía de Despliegue a Producción - Habilux

Esta guía te llevará paso a paso para desplegar tu aplicación Habilux a producción usando **Railway** (Backend + PostgreSQL) y **Vercel** (Frontend).

## 📋 Requisitos Previos

- [ ] Cuenta de GitHub con tu código subido
- [ ] Cuenta en [Railway.app](https://railway.app/) (gratis)
- [ ] Cuenta en [Vercel.com](https://vercel.com/) (gratis)

---

## 🚀 Parte 1: Desplegar el Backend en Railway

### Paso 1: Crear Base de Datos PostgreSQL

1. Ve a [Railway.app](https://railway.app/) e inicia sesión
2. Haz clic en **"New Project"**
3. Selecciona **"Provision PostgreSQL"**
4. Railway creará automáticamente una base de datos PostgreSQL

### Paso 2: Desplegar el Backend

1. En el mismo proyecto de Railway, haz clic en **"New"** → **"GitHub Repo"**
2. Conecta tu repositorio de GitHub
3. Railway detectará automáticamente tu proyecto

### Paso 3: Configurar el Servicio del Backend

1. Haz clic en el servicio que se creó
2. Ve a la pestaña **"Settings"**
3. Configura lo siguiente:
   - **Root Directory:** `Habilux-3/server`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`

### Paso 4: Configurar Variables de Entorno

1. Ve a la pestaña **"Variables"** del servicio backend
2. Haz clic en **"New Variable"** y añade las siguientes:

```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
```
*(Railway conectará automáticamente la base de datos)*

```bash
JWT_SECRET=tu-clave-secreta-super-segura-aqui
```
*(Genera una clave segura con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` en tu terminal local)*

```bash
PORT=3000
```

```bash
NODE_ENV=production
```

3. **Importante:** Deja `CLIENT_URL` vacío por ahora. Lo configuraremos después de desplegar el frontend.

### Paso 5: Obtener la URL del Backend

1. Ve a la pestaña **"Settings"** del servicio backend
2. En la sección **"Networking"**, haz clic en **"Generate Domain"**
3. Railway te dará una URL como: `https://tu-proyecto.up.railway.app`
4. **Copia esta URL** - la necesitarás para el frontend

---

## 🎨 Parte 2: Desplegar el Frontend en Vercel

### Paso 1: Importar Proyecto

1. Ve a [Vercel.com](https://vercel.com/) e inicia sesión
2. Haz clic en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub

### Paso 2: Configurar el Proyecto

1. **Framework Preset:** Vite
2. **Root Directory:** Haz clic en **"Edit"** y escribe `Habilux-3/client`
3. **Build Command:** `npm run build` (por defecto)
4. **Output Directory:** `dist` (por defecto)

### Paso 3: Configurar Variables de Entorno

1. Antes de hacer deploy, expande **"Environment Variables"**
2. Añade la siguiente variable:

```bash
VITE_API_URL=https://tu-proyecto.up.railway.app/api
```
*(Reemplaza con la URL de Railway que copiaste en el Paso 5 de la Parte 1, agregando `/api` al final)*

3. Haz clic en **"Deploy"**

### Paso 4: Obtener la URL del Frontend

1. Espera a que termine el despliegue (1-2 minutos)
2. Vercel te dará una URL como: `https://tu-proyecto.vercel.app`
3. **Copia esta URL**

---

## 🔗 Parte 3: Conectar Frontend y Backend

### Actualizar CORS en Railway

1. Vuelve a Railway
2. Ve al servicio del backend → pestaña **"Variables"**
3. Añade una nueva variable:

```bash
CLIENT_URL=https://tu-proyecto.vercel.app
```
*(Usa la URL de Vercel que copiaste)*

4. El servicio se reiniciará automáticamente

---

## ✅ Parte 4: Verificación

### Prueba tu Aplicación

1. Abre la URL de Vercel en tu navegador
2. Verifica que la página carga correctamente
3. Intenta registrar un nuevo usuario
4. Intenta iniciar sesión
5. Prueba las funcionalidades principales:
   - Crear una propiedad
   - Subir documentos
   - Crear pagos
   - Verificar notificaciones

### Revisar Logs (si algo falla)

**Backend (Railway):**
1. Ve a tu proyecto en Railway
2. Haz clic en el servicio backend
3. Ve a la pestaña **"Deployments"**
4. Haz clic en el deployment activo
5. Revisa los logs para ver errores

**Frontend (Vercel):**
1. Ve a tu proyecto en Vercel
2. Haz clic en el deployment
3. Ve a la pestaña **"Logs"**

---

## 🔧 Solución de Problemas Comunes

### Error: "CORS policy"
- Verifica que `CLIENT_URL` en Railway tenga la URL correcta de Vercel
- Asegúrate de que no haya espacios ni barras al final

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté configurada correctamente en Railway
- Asegúrate de que las migraciones se ejecutaron: revisa los logs del build

### Error: "API is not responding"
- Verifica que la URL en `VITE_API_URL` sea correcta
- Asegúrate de que termine en `/api`
- Verifica que el backend esté corriendo en Railway

### Las imágenes no se cargan
- Las imágenes subidas se guardan en el sistema de archivos del servidor
- Railway tiene almacenamiento efímero, considera usar un servicio como:
  - Cloudinary
  - AWS S3
  - Supabase Storage

---

## 📝 Notas Importantes

### Seguridad
- ✅ Nunca subas archivos `.env` a GitHub
- ✅ Usa claves JWT seguras y únicas para producción
- ✅ Cambia las credenciales por defecto

### Base de Datos
- ✅ Railway incluye backups automáticos en planes pagos
- ✅ Considera exportar tu base de datos regularmente
- ✅ Las migraciones se ejecutan automáticamente en cada deploy

### Costos
- Railway: Plan gratuito con $5 de crédito mensual
- Vercel: Plan gratuito generoso para proyectos personales
- Considera actualizar a planes pagos cuando tengas usuarios reales

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios en tu código:

1. **Haz commit y push a GitHub:**
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```

2. **Railway y Vercel desplegarán automáticamente** los cambios

3. **Si cambias el schema de Prisma:**
   - Crea una nueva migración localmente: `npx prisma migrate dev`
   - Haz push a GitHub
   - Railway ejecutará las migraciones automáticamente

---

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs en Railway y Vercel
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que las URLs no tengan errores tipográficos

¡Felicidades! Tu aplicación Habilux ahora está en producción 🎉
