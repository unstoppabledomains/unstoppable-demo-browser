import { BrowserWindow, app, ipcMain } from 'electron';
import { join } from 'path';

export class PopupWindow extends BrowserWindow {
  protected appWindow: BrowserWindow;

  public constructor(appWindow: BrowserWindow, name: string, devtools = false) {
    super({
      frame: false,
      resizable: false,
      hasShadow: false,
      transparent: true,
      show: false,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      skipTaskbar: true,
      backgroundColor: '#00ffffff',
    });

    this.appWindow = appWindow;

    this.loadURL(`http://localhost:3001/${name}.html`);

    ipcMain.on(`get-window-id-${this.id}`, e => {
      e.returnValue = this.appWindow.id;
    });

    this.setParentWindow(this.appWindow);
  }
}