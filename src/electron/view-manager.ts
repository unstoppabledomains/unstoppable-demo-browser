import { ipcMain, BrowserWindow, BrowserView } from "electron";
import { View } from "~/electron/view";

export class ViewManager {
  private _window: BrowserWindow;
  private views: Map<number, View> = new Map<number, View>();

  private currentView: View;
  private visible: boolean;

  constructor(window: BrowserWindow) {
    this._window = window;
    this.visible = false;

    ipcMain.on('create-browser-view', (event, arg) => {
      const view = new View(window, arg);

      this.views.set(view.webContents.id, view);
      this.currentView = view;

      if(this.visible == true){
        console.log("Showing new browser window");
        this.window.setBrowserView(this.currentView);
      }

      event.returnValue = view.webContents.id;
    })


    ipcMain.on('set-browser-visibility', (event, visible) => {
      this.visible = visible;
      if(visible && this.currentView){
        this.window.setBrowserView(this.currentView);
      }else if(visible == false){
        this.window.setBrowserView(null);
      }

      event.returnValue = this.visible;
    })

    ipcMain.on('destroy-browser-view', (event, arg) => {
      let view: View = this.getView(arg);
      if (view) {

        if (this.window.getBrowserView() === view) {
          this.window.setBrowserView(null);
        }

        if(view == this.currentView){
          this.currentView = null;
        }

        view.destroy();
      }
    })

    ipcMain.on('set-selected-browser', (event, arg) => {
      let view: View = this.getView(arg);
      if (view) {
        this.currentView = view;
        this.window.setBrowserView(view);
        view.updateNavigationState();
      }
    })

    ipcMain.on(`browserview-call`, async (e, data) => {
      const view = this.views.get(data.viewId);
      if (view) {
        let scope: any = view;

        if (data.scope && data.scope.trim() !== '') {
          const scopes = data.scope.split('.');
          for (const s of scopes) {
            scope = scope[s];
          }
        }

        let result = scope.apply(view.webContents, data.args);

        if (result instanceof Promise) {
          result = await result;
        }

        if (data.callId) {
          this.window.webContents.send(
            `browserview-call-result-${data.callId}`,
            result,
          );
        }
      }
    });
  }

  public get window(){
    return this._window;
  }

  public get selectedId(){
    return this.currentView.webContents.id;
  }

  public get selected(){
    return this.currentView;
  }

  private getView = (id: number) => {
    return this.views.get(id);
  }
}