import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const images = [
    { src: 'about_profile.jpg', dest: 'about_profile.webp', maxWidth: 800, quality: 82 },
    { src: 'client_journey.jpg', dest: 'client_journey.webp', maxWidth: 900, quality: 82 },
    { src: 'achievements/achievement_1.jpg', dest: 'achievements/achievement_1.webp', maxWidth: 700, quality: 80 },
    { src: 'achievements/achievement_2.jpg', dest: 'achievements/achievement_2.webp', maxWidth: 700, quality: 80 },
    { src: 'achievements/achievement_3.jpg', dest: 'achievements/achievement_3.webp', maxWidth: 700, quality: 80 },
    { src: 'achievements/achievement_4.jpg', dest: 'achievements/achievement_4.webp', maxWidth: 700, quality: 80 },
    { src: 'achievements/achievement_5.jpg', dest: 'achievements/achievement_5.webp', maxWidth: 700, quality: 80 },
];

for (const img of images) {
    const srcPath = path.join(publicDir, img.src);
    const destPath = path.join(publicDir, img.dest);

    // ensure achievements/ dir exists
    const destDir = path.dirname(destPath);
    if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

    try {
        const info = await sharp(srcPath)
            .resize({ width: img.maxWidth, withoutEnlargement: true })
            .webp({ quality: img.quality })
            .toFile(destPath);

        const kb = (info.size / 1024).toFixed(1);
        console.log(`✓ ${img.dest}  (${kb} kB)`);
    } catch (e) {
        console.error(`✗ ${img.src}: ${e.message}`);
    }
}

console.log('\nDone! All WebP files saved to /public/');
