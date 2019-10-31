import { BrowserWindow, App, BrowserView, Menu, dialog, ipcMain } from 'electron';
import { resolve, join } from 'path';
import { ViewManager } from '~/electron/view-manager';
import { getMainMenu } from '~/electron/mainmenu';
import { AppUpdater } from '~/electron/app-updater';
import { Store } from '~/electron/store/datastore';

export default class Main {
  static mainWindow: BrowserWindow;
  static application: App;
  static viewManager: ViewManager;

  private static onWindowAllClosed() {
    Main.application.quit();
  }

  private static onClose() {
    // Dereference the window object. 
    Main.mainWindow = null;
  }

  private static async onReady() {
    Main.mainWindow = new BrowserWindow({
      frame: false,
      minWidth: 400,
      minHeight: 450,
      width: 1200,
      height: 700,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        plugins: true,
        nodeIntegration: true,
        contextIsolation: false,
        javascript: true,
      }
    });

    this.viewManager = new ViewManager(Main.mainWindow);
    Menu.setApplicationMenu(getMainMenu(this.viewManager));

    // let find:FindWindow = new FindWindow(Main.mainWindow);

    const store = new Store({
      configName: 'settings-data',
      defaults: {
        settings: {
          domainResolutionMethod: 'UnstoppableAPI',
          ipfsContentMethod: 'CloudflareCDN'
        }
      }
    });

    ipcMain.on('load-settings', (event) => {
      let settings: any = store.get('settings');
      console.log("Settings loaded " + JSON.stringify(settings));
      event.returnValue = settings;
    })

    ipcMain.on('save-settings', (event, settings) => {
      console.log("Saving settings " + JSON.stringify(settings));
      store.set('settings', settings);
    })

    ipcMain.on(`window-toggle-maximize`, () => {
      if (Main.mainWindow.isMaximized()) {
        Main.mainWindow.unmaximize();
      } else {
        Main.mainWindow.maximize();
      }
    });

    ipcMain.on(`window-minimize`, () => {
      Main.mainWindow.minimize();
    });

    ipcMain.on(`window-close`, () => {
      Main.mainWindow.close();
    });

    Main.mainWindow.on('closed', Main.onClose);

    if (process.env.ENV === 'dev') {
      Main.mainWindow.loadURL('http://localhost:3001/app.html');
      Main.mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
      Main.mainWindow.loadURL(join('file://', Main.application.getAppPath(), 'build/app.html'));
    }

    let updater: AppUpdater = new AppUpdater(Main.mainWindow);

    Main.mainWindow.webContents.on('dom-ready', () => {
      console.log("dom-ready -> checkForUpdates() called");
      updater.checkForUpdates(true);
    });
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the  
    // Electron.BrowserWindow into this function 
    // so this class has no dependencies. This 
    // makes the code easier to write tests for 
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}