const { app, BrowserWindow } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

let mainWindow;

app.whenReady().then(() => {
  // Configurar la aplicación para que se inicie automáticamente al encender el PC
  app.setLoginItemSettings({
    openAtLogin: true, // Se inicia con el sistema operativo
    path: app.getPath('exe')
  });

  // Crear la ventana principal
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: true,
    alwaysOnTop: true, // Mantiene la ventana siempre en primer plano
    // frame: false, // Oculta los controles de la ventana
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true, // 🔥 Habilita el uso de require() en renderer.js
    contextIsolation: false // 🔥 Desactiva el aislamiento de contexto (necesario para require)
    }
  });

  mainWindow.loadFile('index.html').then(() => {
    console.log('Ventana principal cargada');
  });

  // Cerrar la aplicación cuando todas las ventanas estén cerradas
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});