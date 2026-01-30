// KONFIGURATION
// ==========================================
// WICHTIG:
// 1. Die Pfade müssen RELATIV sein (z.B. "images/foto.jpg" statt "/images/foto.jpg")
// 2. Achte genau auf Groß-/Kleinschreibung (foto.jpg ist nicht Foto.JPG)
// 3. Keine Backslashes (\) verwenden, nur normale Schrägstriche (/)
// ==========================================

window.portfolioData = [
    {
        titel: "LANDSCHAFT & Natur",
        bilder: [
            // Beispiel: Ordner "images" -> Unterordner "landscape" -> Bild "01.jpg"
            "images/Landschaft & Natur/Bild (01).jpg",
            "images/Landschaft & Natur/Bild (02).jpg",
            "images/Landschaft & Natur/Bild (03).jpg",
            "images/Landschaft & Natur/Bild (04).jpg",
            "images/Landschaft & Natur/Bild (05).jpg",
            "images/Landschaft & Natur/Bild (06).jpg",
            "images/Landschaft & Natur/Bild (07).jpg",
            "images/Landschaft & Natur/Bild (08).jpg",
            "images/Landschaft & Natur/Bild (09).jpg",
            "images/Landschaft & Natur/Bild (10).jpg",
            "images/Landschaft & Natur/Bild (11).jpg",
            "images/Landschaft & Natur/Bild (12).jpg"        ]
    },
    {
        titel: "URBAN",
        bilder: [
            // Beispiel: Einfach direkt im "images" Ordner
            "images/urban_01.jpg",
            "images/urban_02.jpg"
        ]
    },
    {
        titel: "PORTRÄTS",
        bilder: [
            // Zum Testen lassen wir hier noch funktionierende Online-Bilder drin
            "https://picsum.photos/800/1000?random=8",
            "https://picsum.photos/900/1200?random=9"
        ]
    },
    {
        titel: "KONZEPTUELL",
        bilder: [
            "images/concept/art1.jpg",
            "images/concept/art2.jpg"
        ]
    }
];
