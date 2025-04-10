const fs = require('fs');

// Obtener las variables de entorno de Vercel
const apiUrl = process.env.API_URL || '';
const iconsBaseUrl = process.env.ICONS_BASE_URL || '';

// Leer el archivo de configuración de entorno (environment.ts)
let envFile = fs.readFileSync('./src/environments/environment.ts', 'utf8');

// Reemplazar las variables en el archivo environment.ts
envFile = envFile.replace(
  /API_URL: '.*'/,
  `API_URL: '${apiUrl}'`
);
envFile = envFile.replace(
  /ICONS_BASE_URL: '.*'/,
  `ICONS_BASE_URL: '${iconsBaseUrl}'`
);

// Guardar el archivo actualizado
fs.writeFileSync('./src/environments/environment.ts', envFile);
