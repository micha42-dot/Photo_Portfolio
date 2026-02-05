const fs = require('fs');
const path = require('path');

// Konfiguration
const IMAGES_DIR = './images';
const OUTPUT_FILE = './data.js';
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Hilfsfunktion: Rekursiv alle Dateien in einem Ordner finden
function getAllFilesRecursively(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFilesRecursively(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

console.log('📷 Starte tiefen Bild-Scan...');

try {
    if (!fs.existsSync(IMAGES_DIR)) {
        throw new Error(`Ordner "${IMAGES_DIR}" existiert nicht.`);
    }

    // 1. Kategorien sind die obersten Ordner in /images
    const categories = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    let portfolioData = [];
    let totalImages = 0;

    // 2. Durch jede Kategorie iterieren
    categories.forEach(category => {
        const categoryPath = path.join(IMAGES_DIR, category);
        
        // Rekursiv alle Dateien holen
        const allFiles = getAllFilesRecursively(categoryPath);
        
        // Filtern nach Bild-Endungen und Pfad bereinigen
        const images = allFiles
            .filter(filePath => {
                const ext = path.extname(filePath).toLowerCase();
                return ALLOWED_EXTENSIONS.includes(ext);
            })
            .map(filePath => {
                // Pfad relativ zum Projekt-Root machen und Backslashes ersetzen
                // Wir entfernen alles vor "images/" damit der Pfad sauber für den Browser ist
                let relativePath = path.relative(process.cwd(), filePath);
                return relativePath.replace(/\\/g, '/');
            });

        if (images.length > 0) {
            console.log(`✅ Kategorie "${category}": ${images.length} Bilder gefunden.`);
            totalImages += images.length;
            portfolioData.push({
                titel: category,
                bilder: images
            });
        } else {
            console.log(`ℹ️  Kategorie "${category}" ist leer (oder keine Bilder).`);
        }
    });

    // 3. JS Datei schreiben
    const fileContent = `// AUTOMATISCH GENERIERT DURCH 'npm run scan'
// MANUELLE ÄNDERUNGEN WERDEN ÜBERSCHRIEBEN
// Generiert am: ${new Date().toLocaleString()}

window.portfolioData = ${JSON.stringify(portfolioData, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\n🎉 Fertig! Insgesamt ${totalImages} Bilder verarbeitet.`);
    console.log(`Datei gespeichert unter: ${OUTPUT_FILE}`);

} catch (err) {
    console.error('❌ Ein Fehler ist aufgetreten:', err.message);
}