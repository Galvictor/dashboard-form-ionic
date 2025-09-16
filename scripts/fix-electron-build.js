import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '../dist/index.html');

console.log('Corrigindo build para Electron...');

if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Corrigir base href
    htmlContent = htmlContent.replace('<base href="/" />', '<base href="./" />');

    // Forçar modo claro (remover modo escuro)
    htmlContent = htmlContent.replace('<meta name="color-scheme" content="light dark" />', '<meta name="color-scheme" content="light only" />');

    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✅ Build corrigido para Electron (modo claro forçado)!');
} else {
    console.log('❌ Arquivo dist/index.html não encontrado. Execute "npm run build" primeiro.');
}
