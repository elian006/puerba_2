/*const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Configuración de autoactualización
  autoUpdater.checkForUpdatesAndNotify();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// Escuchar eventos de autoactualización
autoUpdater.on('update-available', () => {
  // Mostrar un diálogo de información sobre la actualización disponible
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Actualización disponible',
    message: 'Hay una actualización disponible. Descargando...',
    buttons: ['OK'],
  });

  console.log('Update available');
});

autoUpdater.on('update-downloaded', () => {
  // Mostrar un diálogo de confirmación para instalar la actualización
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Actualización descargada',
    message: 'La actualización se ha descargado y está lista para instalar. Reinicie la aplicación para aplicar la actualización.',
    buttons: ['OK'],
  });

  console.log('Update downloaded');
  autoUpdater.quitAndInstall();
});*/

const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Comprobar actualizaciones al iniciar la aplicación
  autoUpdater.checkForUpdatesAndNotify().then((updateCheckResult) => {
    if (!updateCheckResult.updateInfo) {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'Sin actualizaciones',
        message: 'No hay actualizaciones disponibles.',
      });
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// Escuchar eventos de actualización
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

// Comprobar actualizaciones cada 10 minutos (600000 ms)
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify().then((updateCheckResult) => {
    if (!updateCheckResult.updateInfo) {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'Sin actualizaciones',
        message: 'No hay actualizaciones disponibles.',
      });
    }
  });
}, 600000);