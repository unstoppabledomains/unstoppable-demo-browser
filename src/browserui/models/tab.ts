import { observable, computed, action, onBecomeObserved } from 'mobx';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ipcRenderer } from 'electron';
import ipfsNode from '../mixins/ipfs-node';
import { DomainResolver } from '../mixins/domain-resolver';
import { IPFSContentMethod } from '~/browserui/models/browser-settings';
import dangerousSiteChecker, { DangerousSiteReport } from '~/browserui/mixins/dangerous-site-checker';

export enum BrowserState {
  NewTab = 'newtab',
  Browsing = 'browsing',
  Error = 'error',
  Settings = 'settings',
  DangerPage = 'danger',
  AddBookmark = 'add-bookmark',
  Bookmarks = 'bookmarks'
}

export class Tab {

  constructor(session: BrowserSession) {
    this._session = session;


    this.init();
  }

  private async init() {
    this.buildBrowserView();
    this.browserState = BrowserState.NewTab;
  }

  private _session: BrowserSession;

  @observable
  public id: number;

  @observable
  public viewId: number;

  @observable
  private _title: string = 'New tab';

  @computed
  public get title() {
    switch (this.browserState) {
      case BrowserState.Browsing:
        return this._title;
      case BrowserState.Error:
        return 'Error';
      case BrowserState.Settings:
        return 'Settings';
      case BrowserState.Bookmarks:
        return 'Bookmarks';
      case BrowserState.DangerPage:
        return 'Unsafe site';
      case BrowserState.NewTab:
        return 'New Tab';
      case BrowserState.AddBookmark:
        return this._title;
    }

    return '';
  }

  @observable
  public dangerousSiteReport:DangerousSiteReport;

  @observable
  public loading = false;

  @observable
  public favicon = '';

  @observable
  public urlBarValue = '';

  @observable
  public emptyTabUrlValue = '';

  @computed
  public get reportable() {
    if (this._reportable && this.browserState == BrowserState.Browsing) {
      return true;
    }

    return false;
  }

  @computed
  public get bookmarkable() {
    if (this.browserState == BrowserState.Browsing) {
      return true;
    }

    return false;
  }

  @observable
  private _reportable: boolean = false;

  @computed
  public get selected() {
    return this._session.selectedTab == this;
  }

  @computed
  public get collapsable() {
    return this._session.tabs.length > 1;
  }

  @computed
  public get isIconSet() {
    return this.favicon !== '' || this.loading;
  }

  public goBack() {
    this.browserViewCall('webContents.goBack');
  }

  public goForward() {
    this.browserViewCall('webContents.goForward');
  }

  public reload() {
    this.browserViewCall('webContents.reload');
  }

  @observable
  private _browserState: BrowserState;

  public set browserState(browserState: BrowserState) {

    if (browserState == BrowserState.Browsing) {
      ipcRenderer.send('set-browser-visibility', true);
    } else {
      ipcRenderer.send('set-browser-visibility', false);
    }

    switch (browserState) {
      case BrowserState.Bookmarks:
        this._url = 'bookmarks';
        this.urlBarValue = this._url;
        break;
      case BrowserState.Settings:
        this._url = 'settings';
        this.urlBarValue = this._url;
        break;
    }

    this._browserState = browserState;
  }

  @computed
  public get browserState() {
    return this._browserState;
  }

  @observable
  private _url = '';

  public setUrl(url: string, ignoreDangerousSites: boolean = false) {
    console.log("Setting url to " + url);
    this.urlBarValue = url;

    if (url == "settings") {
      this.browserState = BrowserState.Settings;
    } else if (url == "bookmarks") {
      this.browserState = BrowserState.Bookmarks;
    } else {
      new DomainResolver(this._session.settings).resolve(url).then((response: any) => {
        if (response.type == 'zil') {
          this.handleZilResponse(response.url, response.ipfsHash, response.dest, ignoreDangerousSites);
        }else{
          ipcRenderer.send(`load-new-url-${this.viewId}`, response.dest, response.url);
        }
      }).catch((err) => {
        console.error("Error loading domain name " + err);
      });
    }
  }

  public get url() {
    return this._url;
  }

  public activate() {
    ipcRenderer.send('set-selected-browser', this.viewId);

    if (this._browserState == BrowserState.Browsing) {
      ipcRenderer.send('set-browser-visibility', true);
    } else {
      ipcRenderer.send('set-browser-visibility', false);
    }
  }

  public buildBrowserView() {
    if (!this.viewId) {
      this.viewId = ipcRenderer.sendSync('create-browser-view', this._url);

      ipcRenderer.on(`view-url-updated-${this.viewId}`, (event, url: string) => {
        this._url = url;
        this.urlBarValue = url;
      });

      ipcRenderer.on(`view-title-updated-${this.viewId}`, (event, title: string) => {
        this._title = title;
      });

      ipcRenderer.on(`navigate-done-${this.viewId}`, (event, url: string) => {
        this._url = url;
        this.urlBarValue = url;

        if (this._url.includes('.zil')) {
          this._reportable = true;
        } else {
          this._reportable = false;
        }

        this.browserState = BrowserState.Browsing;
      })

      ipcRenderer.on(`view-loading-${this.viewId}`, (event, yesno) => {
        this.loading = yesno;
      });

      ipcRenderer.on(`browserview-favicon-updated-${this.id}`,
        async (e, favicon: string) => {
          this.favicon = favicon;
        },
      );
    }
  }

  public destroyBrowserView() {
    if (this.viewId) {
      ipcRenderer.send('destroy-browser-view', this.viewId);
      this.viewId = null;
    }
  }

  private browserViewCall(call: string, ...args: any[]) {
    ipcRenderer.send(`browserview-call`, {
      viewId: this.viewId,
      scope: call,
      args
    });
  }

  private handleZilResponse(url:string, ipfsHash:string, defaultDestination:string,  ignoreDangerousSites:boolean){
    let dangerousSiteReport: DangerousSiteReport = dangerousSiteChecker.checkSite(url, ipfsHash);
    if (dangerousSiteReport != null && !ignoreDangerousSites) {
      this.dangerousSiteReport = dangerousSiteReport;
      this.browserState = BrowserState.DangerPage;
      return;
    }else{
      dangerousSiteReport = null;
    }

    if (this._session.settings.ipfsContentMethod == IPFSContentMethod.DesignatedIPFSNode) {
      console.log("Load content via IPFS node -- " + url);
      ipfsNode.startIPFSNode().then(() => {
        // Test hash
        // response.ipfsHash = 'QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD';
        this.loading = true;
        return ipfsNode.loadIPFSSite(url, ipfsHash)
      }).then(() => {
        this.loading = false;
        ipcRenderer.send(`load-new-url-${this.viewId}`, ipfsNode.webProxyUrl(url), url);
      }).catch((err) => {
        this.loading = false;
        console.log("Error: " + err);
        this.browserState = BrowserState.Error;
      })
    }else{
      ipcRenderer.send(`load-new-url-${this.viewId}`, defaultDestination, url);
    }
  }
}
