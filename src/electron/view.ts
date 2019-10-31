import { BrowserView, BrowserWindow, ipcMain } from "electron";

interface IUrlMap {
  url: string;
  domain: string;
  [url: string] : string;
} 


export class View extends BrowserView {
  private window: BrowserWindow;
  public favicon = '';
  private urlMappings: Map<string, string> = new Map();

  constructor(window: BrowserWindow, url: string) {
    super({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        // partition: incognito ? 'view_incognito' : 'persist:view',
        plugins: true,
        additionalArguments: [`--window-id=${window.id}`],
        nativeWindowOpen: true,
        webSecurity: true,
        javascript: true,
      }
    });

    let incognito: boolean = false;
    this.window = window;

    let newBounds = this.window.getBounds();
    this.window.setBrowserView(this);

    this.setBounds({ x: 0, y: 80, width: newBounds.width, height: newBounds.height - 80 });
    this.setAutoResize({
      width: true,
      height: true,
    } as any);

    this.webContents.loadURL(url);
    this.window.setBrowserView(null);

    this.webContents.addListener('did-finish-load', () => {
      let url = this.webContents.getURL();
      
      if(this.urlMappings.has(url)){
        url = this.urlMappings.get(url);
      }

      this.window.webContents.send(
        `view-url-updated-${this.webContents.id}`,
        url
      );
    });

    this.webContents.addListener('page-title-updated', (e, title) => {
      this.window.webContents.send(
        `view-title-updated-${this.webContents.id}`,
        title,
      );
    });

    // this.webContents.openDevTools();

    ipcMain.on(`load-new-url-${this.webContents.id}`, (event, url, urlValue) => {
      console.log("Will navigate to " + url);

      if(urlValue){
        this.urlMappings.set(url, urlValue);
      }

      let extension = new URL(url).hostname.split('.').pop();

      if(extension === 'zil'){
        console.log('zil domain');
      }else{
        this.webContents.loadURL(url);
      }
    }); 

    this.webContents.addListener('will-navigate', (event, url) => {
      console.log("Will navigate to " + url);

      let extension = new URL(url).hostname.split('.').pop();

      if ( extension == "zil"){
        console.log("zil domain");
        event.preventDefault();
      }

    });

    this.webContents.addListener('did-navigate', (event, url) => {
      if(this.urlMappings.has(url)){
        url = this.urlMappings.get(url);
      }

      this.window.webContents.send(
        `navigate-done-${this.webContents.id}`,
        url,
      );
    });


    this.webContents.addListener('did-stop-loading', () => {
      this.updateNavigationState();
      this.window.webContents.send(
        `view-loading-${this.webContents.id}`,
        false,
      );
    });

    this.webContents.addListener('found-in-page', (e, result) => {
      // this.window.findWindow.webContents.send('found-in-page', result);
    });

    this.webContents.addListener('did-start-loading', () => {
      this.updateNavigationState();
      this.window.webContents.send(`view-loading-${this.webContents.id}`, true);
    });

    this.webContents.addListener(
      'page-favicon-updated',
      async (e, favicons) => {
        this.favicon = favicons[0];

        this.window.webContents.send(
          `browserview-favicon-updated-${this.webContents.id}`,
          this.favicon,
        );
      },
    );

  }

  public updateNavigationState() {
    if (this.isDestroyed()) return;
    this.window.webContents.send('update-navigation-state', {
      canGoBack: this.webContents.canGoBack(),
      canGoForward: this.webContents.canGoForward(),
    });
  }
}