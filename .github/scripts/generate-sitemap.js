const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ricson5499.github.io';
const IGNORE_DIRS = ['.git', '.github', 'node_modules', '.vscode'];
const IGNORE_FILES = ['google0ed9506e57f7ed8f.html'];

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && !IGNORE_FILES.includes(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function getLastModified(filePath) {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().split('T')[0];
}

function generateSitemap() {
  const htmlFiles = getAllHtmlFiles('.');
  
  const urls = htmlFiles
    .map(file => {
      const relativePath = path.relative('.', file).replace(/\\/g, '/');
      const url = relativePath === 'index.html' 
        ? BASE_URL 
        : `${BASE_URL}/${relativePath}`;
      const lastmod = getLastModified(file);
      
      return {
        url,
        lastmod,
        priority: relativePath === 'index.html' ? '1.0' : '0.8'
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(`✓ Generated sitemap with ${urls.length} URLs`);
}

generateSitemap();
