/**
 * HILFSSKRIPT ZUR GALERIE-ERSTELLUNG
 * 
 * Führe dieses Skript aus, um den Ordner 'images' zu scannen 
 * und die gallery.json automatisch zu erstellen.
 * 
 * Nutzung (im Terminal):
 * node scripts/generate-gallery.js
 */

const fs = require('fs');
const path = require('path');

// Konfiguration - Wir gehen davon aus, dass 'images' im Hauptverzeichnis liegt
// __dirname ist 'scripts/', also gehen wir eins hoch '../' und dann in 'images'
const IMAGES_DIR = path.join(__dirname, '../images'); 
const OUTPUT_FILE = path.join(__dirname, '../gallery.json'); // gallery.json direkt ins Hauptverzeichnis
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function scanDirectory() {
  console.log(`Scanne Ordner: ${IMAGES_DIR}`);

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Fehler: Ordner ${IMAGES_DIR} existiert nicht. Bitte anlegen!`);
    return;
  }

  const galleryData = [];
  try {
    const categories = fs.readdirSync(IMAGES_DIR);

    categories.forEach(category => {
        const categoryPath = path.join(IMAGES_DIR, category);
        
        // Prüfen, ob es ein Ordner ist (das ist dann unsere Rubrik)
        if (fs.statSync(categoryPath).isDirectory()) {
        const files = fs.readdirSync(categoryPath);
        
        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (ALLOWED_EXTENSIONS.includes(ext)) {
            // WICHTIG FÜR GITHUB PAGES: Keine führenden Slashes!
            // 'images/...' statt '/images/...' sorgt dafür, dass es auch in Unterordnern funktioniert.
            const webPath = `images/${category}/${file}`;
            
            galleryData.push({
                filename: webPath,
                category: category
            });
            }
        });
        }
    });

    // JSON schreiben
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    console.log(`Erfolg! ${galleryData.length} Bilder gefunden.`);
    console.log(`Manifest gespeichert unter: ${OUTPUT_FILE}`);
  } catch (e) {
      console.error("Ein Fehler ist aufgetreten:", e);
  }
}

scanDirectory();