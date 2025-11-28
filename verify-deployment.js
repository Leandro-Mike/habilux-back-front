#!/usr/bin/env node

/**
 * Pre-deployment Verification Script
 * Verifica que todo esté listo para el despliegue
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para despliegue...\n');

let hasErrors = false;
let hasWarnings = false;

// Verificar archivos necesarios
const requiredFiles = [
    { path: 'server/package.json', description: 'Package.json del servidor' },
    { path: 'server/prisma/schema.prisma', description: 'Schema de Prisma' },
    { path: 'server/src/index.js', description: 'Punto de entrada del servidor' },
    { path: 'client/package.json', description: 'Package.json del cliente' },
    { path: 'client/src/api/axios.js', description: 'Configuración de Axios' },
    { path: 'railway.json', description: 'Configuración de Railway' },
    { path: 'vercel.json', description: 'Configuración de Vercel' },
];

console.log('📁 Verificando archivos necesarios...');
requiredFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
        console.log(`  ✅ ${file.description}`);
    } else {
        console.log(`  ❌ ${file.description} - NO ENCONTRADO`);
        hasErrors = true;
    }
});

// Verificar .env.example
console.log('\n📝 Verificando archivos .env.example...');
const envExamples = [
    'server/.env.example',
    'client/.env.example'
];

envExamples.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ⚠️  ${file} - NO ENCONTRADO (recomendado)`);
        hasWarnings = true;
    }
});

// Verificar que .env no esté en el repositorio
console.log('\n🔒 Verificando archivos .env (no deben estar en Git)...');
const envFiles = [
    'server/.env',
    'client/.env'
];

envFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ⚠️  ${file} existe - ASEGÚRATE de que esté en .gitignore`);
        hasWarnings = true;
    } else {
        console.log(`  ✅ ${file} no existe (correcto para repositorio)`);
    }
});

// Verificar package.json del servidor
console.log('\n📦 Verificando package.json del servidor...');
try {
    const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));

    // Verificar que Prisma esté en dependencies
    if (serverPackage.dependencies &&
        serverPackage.dependencies['@prisma/client'] &&
        serverPackage.dependencies['prisma']) {
        console.log('  ✅ Prisma está en dependencies');
    } else {
        console.log('  ❌ Prisma debe estar en dependencies, no en devDependencies');
        hasErrors = true;
    }

    // Verificar scripts
    if (serverPackage.scripts && serverPackage.scripts.start) {
        console.log('  ✅ Script "start" definido');
    } else {
        console.log('  ❌ Script "start" no encontrado');
        hasErrors = true;
    }

    if (serverPackage.scripts && serverPackage.scripts.build) {
        console.log('  ✅ Script "build" definido');
    } else {
        console.log('  ⚠️  Script "build" no encontrado (recomendado)');
        hasWarnings = true;
    }
} catch (error) {
    console.log('  ❌ Error al leer server/package.json');
    hasErrors = true;
}

// Verificar schema.prisma
console.log('\n🗄️  Verificando schema.prisma...');
try {
    const schema = fs.readFileSync('server/prisma/schema.prisma', 'utf8');

    if (schema.includes('provider = "postgresql"')) {
        console.log('  ✅ Usando PostgreSQL');
    } else if (schema.includes('provider = "sqlite"')) {
        console.log('  ❌ Usando SQLite - Cambiar a PostgreSQL para producción');
        hasErrors = true;
    } else {
        console.log('  ⚠️  Provider de base de datos no identificado');
        hasWarnings = true;
    }

    if (schema.includes('env("DATABASE_URL")')) {
        console.log('  ✅ Usando variable de entorno DATABASE_URL');
    } else {
        console.log('  ❌ DATABASE_URL no está configurada como variable de entorno');
        hasErrors = true;
    }
} catch (error) {
    console.log('  ❌ Error al leer schema.prisma');
    hasErrors = true;
}

// Verificar axios.js
console.log('\n🌐 Verificando configuración de Axios...');
try {
    const axios = fs.readFileSync('client/src/api/axios.js', 'utf8');

    if (axios.includes('import.meta.env.VITE_API_URL') || axios.includes('process.env.VITE_API_URL')) {
        console.log('  ✅ Usando variable de entorno VITE_API_URL');
    } else if (axios.includes('localhost')) {
        console.log('  ⚠️  URL hardcodeada detectada - Considera usar VITE_API_URL');
        hasWarnings = true;
    }
} catch (error) {
    console.log('  ❌ Error al leer axios.js');
    hasErrors = true;
}

// Verificar CORS en index.js
console.log('\n🔐 Verificando configuración de CORS...');
try {
    const indexJs = fs.readFileSync('server/src/index.js', 'utf8');

    if (indexJs.includes('process.env.CLIENT_URL') || indexJs.includes('env.CLIENT_URL')) {
        console.log('  ✅ CORS configurado con variable de entorno');
    } else if (indexJs.includes('cors()')) {
        console.log('  ⚠️  CORS permite todos los orígenes - Considera restringirlo en producción');
        hasWarnings = true;
    }
} catch (error) {
    console.log('  ❌ Error al leer index.js');
    hasErrors = true;
}

// Verificar .gitignore
console.log('\n🚫 Verificando .gitignore...');
if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');

    const requiredIgnores = ['.env', 'node_modules', 'dist', 'uploads'];
    requiredIgnores.forEach(pattern => {
        if (gitignore.includes(pattern)) {
            console.log(`  ✅ Ignora ${pattern}`);
        } else {
            console.log(`  ⚠️  No ignora ${pattern} - Agrégalo a .gitignore`);
            hasWarnings = true;
        }
    });
} else {
    console.log('  ❌ .gitignore no encontrado');
    hasErrors = true;
}

// Resumen
console.log('\n' + '='.repeat(50));
if (hasErrors) {
    console.log('❌ ERRORES ENCONTRADOS - Corrige los errores antes de desplegar');
    process.exit(1);
} else if (hasWarnings) {
    console.log('⚠️  ADVERTENCIAS ENCONTRADAS - Revisa las advertencias');
    console.log('✅ Puedes continuar con el despliegue, pero considera las advertencias');
    process.exit(0);
} else {
    console.log('✅ TODO LISTO PARA DESPLEGAR');
    console.log('\nPróximos pasos:');
    console.log('1. Sube tu código a GitHub');
    console.log('2. Sigue la guía en DEPLOYMENT.md');
    console.log('3. Configura las variables de entorno en Railway y Vercel');
    process.exit(0);
}
