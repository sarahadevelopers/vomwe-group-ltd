// add-whatsapp-to-blogs.js
const fs = require('fs');
const path = require('path');

const blogsDir = './blogs';
const scriptTag = '<script src="../js/whatsapp-float.js"></script>';

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(blogsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has the script
    if (content.includes('whatsapp-float.js')) {
        console.log(`✅ ${file} already has the script.`);
        return;
    }
    
    // Insert before </body>
    content = content.replace('</body>', `\n    ${scriptTag}\n</body>`);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added script to ${file}`);
});

console.log('🎉 Done!');