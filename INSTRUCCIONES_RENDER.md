# Guía de Despliegue en Render (Backend)

Sigue estos pasos para poner tu servidor en línea usando la capa gratuita de Render.

## 1. Preparación en GitHub
1.  Asegúrate de haber subido todos los cambios recientes a GitHub:
    ```bash
    git add .
    git commit -m "Config for Render"
    git push
    ```

## 2. Crear servicio en Render
1.  Ve a [dashboard.render.com](https://dashboard.render.com/).
2.  Haz clic en **New +** y selecciona **Web Service**.
3.  Conecta tu cuenta de GitHub y selecciona el repositorio `habilux-back-front`.
4.  Configura los siguientes campos:
    *   **Name**: `habilux-backend` (o el nombre que quieras)
    *   **Root Directory**: `server`  <-- ¡IMPORTANTE!
    *   **Environment**: `Node`
    *   **Build Command**: `npm install && npx prisma generate && npx prisma db push`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free

## 3. Variables de Entorno (Environment Variables)
En la sección "Environment Variables" del servicio en Render, debes añadir las claves exactas que tienes en tu archivo `.env` local.

Copia los valores de tu archivo `server/.env`:

*   `DATABASE_URL`: (La conexión a Supabase con `?sslmode=require`)
*   `SUPABASE_URL`: (Tu URL de proyecto Supabase)
*   `SUPABASE_KEY`: (Tu Service Role Key - la larga)
*   `JWT_SECRET`: (Inventa una contraseña segura o usa la del .env)
*   `CLIENT_URL`: `https://tu-frontend-en-vercel.vercel.app` (Pon aquí la URL real de tu Frontend cuando la tengas. Mientras tanto puedes poner `*` para probar, pero cámbialo luego por seguridad).
*   `NODE_ENV`: `production`

## 4. Finalizar
1.  Haz clic en **Create Web Service**.
2.  Espera a que termine el despliegue. Si todo sale bien, verás un mensaje de éxito.
3.  Copia la URL que te da Render (ej: `https://habilux-backend.onrender.com`).

## 5. Conectar el Frontend
1.  Ve a tu proyecto de Frontend en Vercel.
2.  En **Settings** -> **Environment Variables**, añade/edita:
    *   `VITE_API_URL`: Pega la URL que copiaste de Render + `/api` (ej: `https://habilux-backend.onrender.com/api`).
3.  Redespliega el Frontend en Vercel.

¡Listo!
