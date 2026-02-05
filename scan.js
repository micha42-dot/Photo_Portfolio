const fs = require('fs');
const path = require('path');

// --- KONFIGURATION ---
const CONFIG = {
    imagesDir: './images',
    outputFile: './data.js',
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
};

// --- LOGIK ---

function getAllFiles(dirPath, arrayOfFiles = []) {
    try {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
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
        const rootItems = fs.readdirSync(CONFIG.imagesDir, { withFileTypes: true });
        
        // Bilder im Root
        rootItems.filter(item => !item.isDirectory()).forEach(item => {
            if (CONFIG.allowedExtensions.includes(path.extname(item.name).toLowerCase())) {
                const relativePath = path.join(CONFIG.imagesDir, item.name).replace(/\\/g, '/');
                rootImages.push(relativePath);
            }
        });

        // Unterordner als Kategorien
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

    // Root Bilder hinzufügen falls vorhanden
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