import { observable, computed, action } from 'mobx';
import { Tab } from "~/browserui/models/tab";
import { ipcRenderer } from 'electron';
import { BrowserSettings } from '~/browserui/models/browser-settings';

export class BrowserSession{

  constructor() {
    this.addTab('https://google.com');

    ipcRenderer.on('update-navigation-state', (e, data) => {
      this.navigationState = data;
    });

    ipcRenderer.on('api-tabs-create', (e) => {
      this.addTab('https://google.com');
    });

    ipcRenderer.on('open-settings', (e) => {
      this.selectedTab.url = 'settings';
    });

    ipcRenderer.on('api-remove-tab', (e, id) => {
      console.log("Remove tab " + id);
      let tab: Tab = this.tabs.find(tab => tab.viewId === id);
      if (tab && this.tabs.length > 1) {
        this.removeTab(tab);
      }
    })

    console.log("BrowserSession start listening to update-available.");

    ipcRenderer.on('update-available', (e) => {
      console.log("ipcRenderer got [Update available]");
      this.updateAvailable = true;
    });
  }

  public settings: BrowserSettings = new BrowserSettings();

  public tabs: Tab[] = observable.array([], { deep: false });

  @observable
  public navigationState = {
    canGoBack: false,
    canGoForward: false,
  };

  @observable
  public updateAvailable: boolean = false;

  @observable
  public showSettings: boolean = false;

  @observable
  private _selectedTab: Tab;

  @observable
  private _visible: boolean = null;

  public set visible(visible: boolean){
    if(visible != this._visible){
      this._visible = ipcRenderer.sendSync('set-browser-visibility', visible);
    }
  }

  public get visible(){
    return this._visible;
  }

  @computed
  public get currentUrlBarValue(){
    if(this._selectedTab){
      return this._selectedTab.urlBarValue;
    }else{
      return '';
    }
  }

  @computed
  public get selectedTab(){
    return this._selectedTab;
  }

  public set selectedTab(tab: Tab){
    console.log("Setting selected tab");

    this._selectedTab = tab;
    this._selectedTab.activate();
  }

  public addTab(url: string){
    let newTab = new Tab(url, this);
    this.tabs.push(newTab);
    this.selectedTab = newTab;
  }

  public removeTab(tab: Tab){
    var index = this.tabs.indexOf(tab);

    if (index > -1) {
       this.tabs.splice(index, 1);
    }

    tab.destroyBrowserView();

    if(tab === this.selectedTab && this.tabs.length > 0){
      this.selectedTab = this.tabs[this.tabs.length - 1];
    }

    if(this.tabs.length == 0){
      this.selectedTab = null;
    }
  }
}

const browserSession = new BrowserSession();
export default browserSession;