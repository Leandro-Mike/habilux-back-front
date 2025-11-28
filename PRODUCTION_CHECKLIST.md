# Checklist de Producción - Habilux

## ✅ Antes del Despliegue

### Código
- [ ] Todo el código está en GitHub
- [ ] No hay archivos `.env` en el repositorio
- [ ] Los archivos `.env.example` están actualizados
- [ ] El código funciona correctamente en local

### Base de Datos
- [ ] El schema de Prisma usa `postgresql` (no `sqlite`)
- [ ] Todas las migraciones están creadas y funcionan
- [ ] Tienes un backup de tus datos de desarrollo (si son importantes)

### Configuración
- [ ] CORS configurado en `server/src/index.js`
- [ ] Variables de entorno configuradas en `axios.js`
- [ ] Archivos de uploads están en `.gitignore`

---

## 🚀 Durante el Despliegue

### Railway (Backend)
- [ ] Base de datos PostgreSQL creada
- [ ] Repositorio conectado
- [ ] Root directory configurado: `Habilux-3/server`
- [ ] Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start command: `npm start`
- [ ] Variables de entorno configuradas:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `PORT`
  - [ ] `NODE_ENV`
  - [ ] `CLIENT_URL` (después de desplegar frontend)
- [ ] Dominio generado y copiado

### Vercel (Frontend)
- [ ] Repositorio importado
- [ ] Framework preset: Vite
- [ ] Root directory: `Habilux-3/client`
- [ ] Variable de entorno configurada:
  - [ ] `VITE_API_URL` (URL de Railway + `/api`)
- [ ] Deploy exitoso
- [ ] URL de producción copiada

### Conexión
- [ ] `CLIENT_URL` actualizado en Railway con URL de Vercel
- [ ] Backend reiniciado en Railway

---

## 🧪 Después del Despliegue

### Pruebas Funcionales
- [ ] La página principal carga correctamente
- [ ] No hay errores en la consola del navegador
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] El token JWT se guarda correctamente
- [ ] Las rutas protegidas funcionan

### Pruebas por Rol

#### Como Admin
- [ ] Puede ver el panel de administración
- [ ] Puede crear usuarios
- [ ] Puede aprobar/rechazar usuarios
- [ ] Puede gestionar ciudades y tipos de propiedad
- [ ] Puede configurar el portal

#### Como Propietario
- [ ] Puede crear propiedades
- [ ] Puede ver sus propiedades
- [ ] Puede asignar inquilinos
- [ ] Puede ver pagos
- [ ] Puede subir documentación

#### Como Inquilino
- [ ] Puede ver propiedades asignadas
- [ ] Puede crear solicitudes de mantenimiento
- [ ] Puede ver pagos pendientes
- [ ] Puede subir comprobantes de pago
- [ ] Recibe notificaciones

### Funcionalidades Específicas
- [ ] Subida de imágenes funciona
- [ ] Subida de documentos funciona
- [ ] Sistema de notificaciones funciona
- [ ] Sistema de pagos funciona
- [ ] Filtros y búsquedas funcionan

---

## 🔍 Verificación de Seguridad

- [ ] No se pueden ver datos sin autenticación
- [ ] Los inquilinos solo ven sus propiedades
- [ ] Los propietarios solo ven sus propiedades
- [ ] Los endpoints de admin están protegidos
- [ ] Las contraseñas están hasheadas
- [ ] El JWT_SECRET es único y seguro

---

## 📊 Monitoreo

### Logs a Revisar
- [ ] No hay errores en logs de Railway
- [ ] No hay errores en logs de Vercel
- [ ] No hay errores 500 en las peticiones
- [ ] Las migraciones se ejecutaron correctamente

### Performance
- [ ] La página carga en menos de 3 segundos
- [ ] Las imágenes se cargan correctamente
- [ ] No hay memory leaks evidentes

---

## 📝 Documentación

- [ ] URLs de producción documentadas:
  - Frontend: ___________________________
  - Backend: ___________________________
  - Base de datos: Railway (panel de control)

- [ ] Credenciales de admin creadas:
  - Email: ___________________________
  - Contraseña: (guardada de forma segura)

- [ ] Variables de entorno documentadas (sin valores sensibles)

---

## 🔄 Plan de Mantenimiento

### Backups
- [ ] Configurar backups automáticos de la base de datos
- [ ] Probar restauración de backup

### Actualizaciones
- [ ] Proceso de deploy documentado
- [ ] Plan para actualizaciones de dependencias
- [ ] Plan para migraciones de base de datos

### Monitoreo Continuo
- [ ] Configurar alertas de errores (opcional)
- [ ] Revisar logs semanalmente
- [ ] Monitorear uso de recursos

---

## ⚠️ Problemas Conocidos

### Almacenamiento de Archivos
Railway tiene almacenamiento efímero. Los archivos subidos se perderán en cada redeploy.

**Soluciones:**
- Migrar a Cloudinary para imágenes
- Usar AWS S3 para documentos
- Usar Supabase Storage

### Límites del Plan Gratuito
- Railway: $5 de crédito mensual
- Vercel: Límites de ancho de banda y builds

**Acción:** Monitorear uso y considerar upgrade si es necesario

---

## ✅ Checklist Final

- [ ] Aplicación desplegada y funcionando
- [ ] Todas las pruebas pasadas
- [ ] URLs documentadas
- [ ] Credenciales guardadas de forma segura
- [ ] Plan de backups establecido
- [ ] Equipo notificado de las nuevas URLs

---

**Fecha de despliegue:** _______________

**Desplegado por:** _______________

**Notas adicionales:**
_______________________________________________
_______________________________________________
_______________________________________________
