const fs = require('fs');
const path = require('path');

// Konfiguration
const IMAGES_DIR = './images';
const OUTPUT_FILE = './data.js';
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Hilfsfunktion: Rekursiv alle Dateien in einem Ordner finden
function getAllFilesRecursively(dirPath, arrayOfFiles) {
    let files = [];
    try {
        files = fs.readdirSync(dirPath);
    } catch (e) {
        console.warn(`⚠️ Konnte Ordner nicht lesen: ${dirPath}`);
        return arrayOfFiles || [];
    }

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        try {
            if (fs.statSync(fullPath).isDirectory()) {
                arrayOfFiles = getAllFilesRecursively(fullPath, arrayOfFiles);
            } else {
                arrayOfFiles.push(fullPath);
            }
        } catch (e) {
            // Datei überspringen bei Fehler
        }
    });

    return arrayOfFiles;
}

// Hilfsfunktion: Bilder aus einer Dateiliste filtern
function filterImages(files) {
    return files
        .filter(filePath => {
            const ext = path.extname(filePath).toLowerCase();
            return ALLOWED_EXTENSIONS.includes(ext);
        })
        .map(filePath => {
            let relativePath = path.relative(process.cwd(), filePath);
            return relativePath.replace(/\\/g, '/');
        });
}

console.log('📷 Starte Scan...');

try {
    if (!fs.existsSync(IMAGES_DIR)) {
        throw new Error(`Ordner "${IMAGES_DIR}" existiert nicht.`);
    }

    let portfolioData = [];
    let totalImages = 0;

    // 1. Root-Bilder im 'images'-Ordner finden (ohne Unterordner zu scannen vorerst)
    // Wir nutzen readdirSync direkt für Root, um Dateien von Ordnern zu trennen
    const rootItems = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
    
    // 1a. Root-Bilder sammeln
    const rootFiles = rootItems
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => path.join(IMAGES_DIR, dirent.name));
    
    const rootImages = filterImages(rootFiles);

    if (rootImages.length > 0) {
        console.log(`✅ Root: ${rootImages.length} Bilder gefunden (kommen in "Allgemein").`);
        portfolioData.push({
            titel: "Allgemein", // Name für Bilder ohne Unterordner
            bilder: rootImages
        });
        totalImages += rootImages.length;
    }

    // 1b. Kategorien (Unterordner) finden
    const categories = rootItems
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    // 2. Durch jede Kategorie iterieren
    categories.forEach(category => {
        const categoryPath = path.join(IMAGES_DIR, category);
        
        // Rekursiv alle Dateien in diesem Unterordner holen
        const allFiles = getAllFilesRecursively(categoryPath);
        const images = filterImages(allFiles);

        if (images.length > 0) {
            console.log(`✅ Kategorie "${category}": ${images.length} Bilder gefunden.`);
            totalImages += images.length;
            portfolioData.push({
                titel: category,
                bilder: images
            });
        } else {
            console.log(`ℹ️  Kategorie "${category}" ist leer.`);
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