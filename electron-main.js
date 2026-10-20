const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.glb':  'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

function startServer(distDir, callback) {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, url.parse(req.url).pathname);
    // Default to index.html for directory requests
    if (filePath.endsWith('/') || !path.extname(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Fallback to index.html (SPA routing)
        fs.readFile(path.join(distDir, 'index.html'), (e2, d2) => {
          if (e2) { res.writeHead(404); res.end('Not found'); return; }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(d2);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
  // Listen on a random available port
  server.listen(0, '127.0.0.1', () => {
    callback(server.address().port);
  });
  return server;
}

function createWindow(port) {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'NeuroAtlas — 3D Nervous System Explorer',
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, 'dist', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(`http://127.0.0.1:${port}`);
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  const distDir = path.join(__dirname, 'dist');
  startServer(distDir, (port) => {
    createWindow(port);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const distDir = path.join(__dirname, 'dist');
      startServer(distDir, (port) => createWindow(port));
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
