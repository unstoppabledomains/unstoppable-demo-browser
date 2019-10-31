import { PopupWindow } from './popup';
import { BrowserWindow } from 'electron';

const TOOLBAR_HEIGHT = 80;
const WIDTH = 400;
const HEIGHT = 64;

export class FindWindow extends PopupWindow {
  public constructor(appWindow: BrowserWindow) {
    super(appWindow, 'find');

    this.setBounds({
      height: HEIGHT,
      width: WIDTH,
    } as any);
  }

  public find(tabId: number, data: any) {
    data.visible = true;
    this.rearrange();
    this.show();
    this.updateInfo(tabId, data);
  }

  public updateInfo(tabId: number, data: any) {
    this.webContents.send('update-info', tabId, data);
  }

  public rearrange() {
    const cBounds = this.appWindow.getContentBounds();
    this.setBounds({
      x: Math.round(cBounds.x + cBounds.width - WIDTH),
      y: cBounds.y + TOOLBAR_HEIGHT,
    } as any);
  }
}
