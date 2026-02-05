const fs = require('fs');
const path = require('path');

// --- KONFIGURATION ---
const CONFIG = {
    imagesDir: './images',
    outputFile: './data.js',
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'],
    // Dateien, die nicht in der Galerie erscheinen sollen:
    excludedFiles: ['port.jpg'] 
};

// --- LOGIK ---

function getAllFiles(dirPath, arrayOfFiles = []) {
    try {
        const files = fs.readdirSync(dirPath).sort(); // Alphabetisch sortieren

        files.forEach(file => {
            // Exclude Filter prüfen
            if (CONFIG.excludedFiles.includes(file)) return;

            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                getAllFiles(fullPath, arrayOfFiles);
            } else {
                arrayOfFiles.push(fullPath);
            }
        });
    } catch (e) {
        // Ordner existiert vielleicht nicht oder keine Rechte, ignorieren
    }
    return arrayOfFiles;
}

function scan() {
    console.log("📷 Starte Portfolio-Scan...");

    if (!fs.existsSync(CONFIG.imagesDir)) {
        console.error(`❌ Fehler: Ordner '${CONFIG.imagesDir}' existiert nicht. Bitte anlegen!`);
        return;
    }

    const categories = [];
    const rootImages = [];

    // 1. Root scannen (Dateien direkt in /images)
    try {
        // Root Items holen und alphabetisch sortieren
        const rootItems = fs.readdirSync(CONFIG.imagesDir, { withFileTypes: true })
            .sort((a, b) => a.name.localeCompare(b.name));
        
        // Bilder im Root
        rootItems.filter(item => !item.isDirectory()).forEach(item => {
            const isAllowed = CONFIG.allowedExtensions.includes(path.extname(item.name).toLowerCase());
            const isExcluded = CONFIG.excludedFiles.includes(item.name);

            if (isAllowed && !isExcluded) {
                const relativePath = path.join(CONFIG.imagesDir, item.name).replace(/\\/g, '/');
                rootImages.push(relativePath);
            }
        });

        // Unterordner als Kategorien (ebenfalls sortiert)
        const dirs = rootItems.filter(item => item.isDirectory());
        
        dirs.forEach(dir => {
            const catName = dir.name;
            const catPath = path.join(CONFIG.imagesDir, catName);
            
            // Rekursiv alle Bilder in diesem Ordner holen
            const allFiles = getAllFiles(catPath);
            const images = allFiles
                .filter(f => CONFIG.allowedExtensions.includes(path.extname(f).toLowerCase()))
                .map(f => path.relative(process.cwd(), f).replace(/\\/g, '/')); // Relativ zum Root

            if (images.length > 0) {
                categories.push({
                    id: catName.toLowerCase().replace(/[^a-z0-9]/g, ''),
                    label: catName,
                    images: images
                });
            }
        });

    } catch (e) {
        console.error("Fehler beim Scannen:", e);
    }

    // Root Bilder hinzufügen falls vorhanden (General Category)
    if (rootImages.length > 0) {
        categories.unshift({
            id: 'general',
            label: 'Allgemein',
            images: rootImages
        });
    }

    // JS Datei schreiben
    const jsContent = `// AUTOMATISCH GENERIERT. NICHT EDITIEREN.
window.portfolioData = ${JSON.stringify(categories, null, 2)};`;

    fs.writeFileSync(CONFIG.outputFile, jsContent);

    console.log(`✅ Scan fertig! ${categories.length} Kategorien gefunden.`);
    console.log(`💾 Datei gespeichert: ${CONFIG.outputFile}`);
}

scan();