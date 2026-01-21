# Guía de Adaptación a Supabase

Este proyecto ha sido adaptado para funcionar con Supabase como base de datos y sistema de almacenamiento de archivos.

## 1. Configuración de Base de Datos (PostgreSQL)

1.  Crea un nuevo proyecto en [Supabase](https://supabase.com).
2.  Ve a `Settings` -> `Database`.
3.  Copia la "Connection String" (URI) para **Node.js**. Si tienes problemas con conexiones en entornos serverless (como Vercel/Railway), usa la versión "Transaction Pooler" (puerto 6543) y añade `?pgbouncer=true` al final.
4.  Crea un archivo `.env` en la carpeta `server` copiando `.env.example`.
5.  Pega la URI en `DATABASE_URL`.

Ejemplo `.env`:
```env
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

6.  Instala las dependencias y despliega el esquema:
    ```bash
    cd server
    npm install
    npx prisma migrate deploy
    ```

## 2. Configuración de Almacenamiento (Storage)

El sistema de subida de archivos (Imágenes de propiedades, avatares, documentación) ha sido modificado para usar **Supabase Storage**.

1.  En tu proyecto de Supabase, ve a `Storage`.
2.  Crea los siguientes **Buckets Públicos**:
    *   `properties`
    *   `documentation`
    *   `profiles` (o `avatars` si prefieres, el código usa el bucket "profiles" para avatares)
3.  **IMPORTANTE**: Asegúrate de que los buckets sean **Públicos** para que las imágenes se puedan ver.
4.  Configura las credenciales en tu `.env` del servidor:

```env
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_KEY="tu-clave-anon-o-service-role"
```

## 3. Frontend

El frontend ha sido actualizado para detectar automáticamente si una imagen viene de Supabase (URL absoluta) o del servidor local. No deberías necesitar configurar nada extra en el frontend para las imágenes, siempre que la API devuelva las URLs correctas.

Asegúrate de configurar la URL de tu API en el `.env` del cliente (`client/.env`):
```env
VITE_API_URL="https://tu-api-deployada.com/api"
```

## Resumen de cambios realizados

*   **Servidor**:
    *   Instalado `@supabase/supabase-js`.
    *   Creado middleware de subida a Supabase (`server/src/middleware/uploadToSupabase.js`).
    *   Modificados los middlewares de Multer (`uploadProperty.js`, `uploadDocumentation.js`, `upload.js`) para usar memoria en lugar de disco.
    *   Actualizados los controladores para guardar la URL pública de Supabase en la base de datos.
*   **Cliente**:
    *   Actualizados los componentes (`Properties.jsx`, `PropertyDetail.jsx`, `PropertyForm.jsx`, `ProfilePage.jsx`) para manejar URLs absolutas de imágenes.

¡Tu proyecto está listo para desplegarse en la nube!
