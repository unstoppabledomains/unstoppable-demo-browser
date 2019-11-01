import { observable, computed, action } from 'mobx';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ipcRenderer } from 'electron';
import ipfsNode from './ipfs-node';
import { DomainResolver } from '../mixins/domain-resolver';

export enum BrowserState {
  NewTab = 'newtab',
  Browsing = 'browsing',
  NotFound = 'not-found',
  Settings = 'settings'
}

export class Tab {

  constructor(session: BrowserSession) {
    this._session = session;

    this.buildBrowserView();
  }

  private _session: BrowserSession;

  @observable
  public id: number;

  @observable
  public viewId: number;

  @observable
  private _title: string = 'New tab';

  @computed
  public get title(){
    switch(this.browserState){
      case BrowserState.Browsing:
        return this._title;
      case BrowserState.NotFound:
        return 'Not found';
      case BrowserState.Settings:
        return 'Settings';
    }

    return 'New Tab';
  }

  @observable
  public loading = false;

  @observable
  public favicon = '';

  @observable
  public urlBarValue = '';

  @computed
  public get selected(){
    return this._session.selectedTab == this;
  }

  @computed
  public get collapsable(){
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
  private _browserState: BrowserState = BrowserState.NewTab;
  
  public set browserState(browserState:BrowserState){
    if(browserState == BrowserState.Browsing){
      ipcRenderer.send('set-browser-visibility', true);
    }else{
      ipcRenderer.send('set-browser-visibility', false);
    }

    this._browserState = browserState;
  }

  @computed
  public get browserState(){
    return this._browserState;
  }

  @observable
  private _url = '';

  public set url(url: string) {
    console.log("Setting url to " + url);
    if(this.url === url){
      return;
    }

    this.urlBarValue = url;

    if(url == "settings"){
      this.settingsPage();
    }else{
      new DomainResolver(this._session.settings).resolve(url).then((response: any) => {
        ipcRenderer.send(`load-new-url-${this.viewId}`, response.dest, response.url);
      }).catch((err) => {
        this.browserState = BrowserState.NotFound;
      })
    }
  }

  public get url() {
    return this._url;
  }

  public activate(){
    ipcRenderer.send('set-selected-browser', this.viewId);

    if(this._browserState == BrowserState.Browsing){
      ipcRenderer.send('set-browser-visibility', true);
    }else{
      ipcRenderer.send('set-browser-visibility', false);
    }
  }

  public settingsPage() {
    this.browserState = BrowserState.Settings;
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

      ipcRenderer.on(`navigate-done-${this.viewId}`, (event, url:string) => {
        this._url = url;
        this.urlBarValue = url;

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
}