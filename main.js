const { app, BrowserWindow, globalShortcut } = require('electron')
const { exec } = require('child_process');
const Promise = require('bluebird');
 const cmd = require('node-cmd');

require('electron-reload')(__dirname, 'dist/agenda-dental/index.html')

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

// Executa comando para encontrar PID da porta
exec('netstat -o -n -a | findstr 0.0:3333', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  // Mata o processo da porta 3333 com o PID encontrado
  getAsync(`taskKill.exe /F /PID ${stdout.substring(71)}`)
});

let win;

function createWindow() {

  // Criar uma janela de navegação.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/favicon-dente.ico',
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true,
      enableBlinkFeatures: ['ExecCommandInJavaScript'],
      nodeIntegration: true,
      contextIsolation: true,
      preload: 'preload.js'
    }
  });

  win.setMenu(null)

  // Carrega index.html do app.
  win.loadFile('dist/agenda-dental/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitido quando a janela é fechada.
  win.on('closed', () => {
    process.exit(0)
    win = null
  })
}

try {

  // Executa backend antes de abrir a janela
  getAsync('npm run backend').then(data => {
    console.log('cmd data', data)
  }).catch(err => {
    console.log('cmd err', err)
  })

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

} catch (e) {
  // Catch Error
  throw e;
}
