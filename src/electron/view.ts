import {BrowserView, BrowserWindow, ipcMain} from "electron";

interface IUrlMap {
  url: string;
  domain: string;
  [url: string]: string;
}

export class View extends BrowserView {
  private window: BrowserWindow;
  public favicon = "";
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
        javascript: true
      }
    });

    let incognito: boolean = false;
    this.window = window;

    let newBounds = this.window.getBounds();
    this.window.setBrowserView(this);

    this.setBounds({
      x: 0,
      y: 80,
      width: newBounds.width,
      height: newBounds.height - 110
    });
    this.setAutoResize({
      width: true,
      height: true
    } as any);

    this.webContents.loadURL(url);
    this.window.setBrowserView(null);

    this.webContents.addListener("did-finish-load", () => {
      let url = this.webContents.getURL();

      if (this.urlMappings.has(url)) {
        url = this.urlMappings.get(url);
      }

      if (url == "data:blank") {
        return;
      }

      this.window.webContents.send(
        `view-url-updated-${this.webContents.id}`,
        url
      );
    });

    this.webContents.addListener("page-title-updated", (e, title) => {
      title = title.replace("localhost", "");

      this.window.webContents.send(
        `view-title-updated-${this.webContents.id}`,
        title
      );
    });

    // this.webContents.openDevTools();

    ipcMain.on(
      `load-new-url-${this.webContents.id}`,
      (event, url, urlValue) => {
        console.log("Will navigate to " + url);

        if (urlValue) {
          this.urlMappings.set(url, urlValue);
        }

        let extension = new URL(url).hostname.split(".").pop();

        if (["zil", "crypto", "eth"].includes(extension)) {
          console.log("zil domain");
        } else {
          this.webContents.loadURL(url);
        }
      }
    );

    this.webContents.addListener("will-navigate", (event, url) => {
      console.log("Will navigate to " + url);

      let extension = new URL(url).hostname.split(".").pop();

      if (["zil", "crypto", "eth"].includes(extension)) {
        console.log("zil domain");
        event.preventDefault();
      }
    });

    this.webContents.addListener("did-navigate", (event, url) => {
      console.log("Did navigate " + this.webContents.getURL());

      if (this.urlMappings.has(url)) {
        url = this.urlMappings.get(url);
      }

      if (url != "data:blank") {
        this.window.webContents.send(
          `navigate-done-${this.webContents.id}`,
          url
        );
      }
    });

    this.webContents.addListener(
      "did-navigate-in-page",
      (event, url, isMainFrame) => {
        if (isMainFrame) {
          console.log("Did navigate in page - " + url);

          this.window.webContents.send(
            `view-url-updated-${this.webContents.id}`,
            url
          );
        }
      }
    );

    this.webContents.addListener("did-stop-loading", () => {
      this.updateNavigationState();
      this.window.webContents.send(
        `view-loading-${this.webContents.id}`,
        false
      );
    });

    this.webContents.addListener("found-in-page", (e, result) => {
      // this.window.findWindow.webContents.send('found-in-page', result);
    });

    this.webContents.addListener("did-start-loading", () => {
      this.updateNavigationState();
      this.window.webContents.send(`view-loading-${this.webContents.id}`, true);
    });

    this.webContents.addListener(
      "page-favicon-updated",
      async (e, favicons) => {
        this.favicon = favicons[0];

        this.window.webContents.send(
          `browserview-favicon-updated-${this.webContents.id}`,
          this.favicon
        );
      }
    );

    this.webContents.addListener(
      "new-window",
      (e, url, frameName, disposition) => {
        console.log(frameName + " " + disposition);
        if (disposition === "new-window") {
          if (frameName === "_self") {
            e.preventDefault();
            this.webContents.loadURL(url);
          } else if (frameName === "_blank") {
            e.preventDefault();
            this.window.webContents.send("api-tabs-create", url);
          }
        } else if (disposition == "foreground-tab") {
          e.preventDefault();
          console.log("Foreground create tab");
          this.window.webContents.send("api-tabs-create", url);
        } else if (disposition === "background-tab") {
          e.preventDefault();
          this.window.webContents.send("api-tabs-create", url);
        }
      }
    );
  }

  public updateNavigationState() {
    if (this.isDestroyed()) return;
    this.window.webContents.send("update-navigation-state", {
      canGoBack: this.webContents.canGoBack(),
      canGoForward: this.webContents.canGoForward()
    });
  }
}
