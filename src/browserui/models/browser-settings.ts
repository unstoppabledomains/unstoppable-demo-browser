
import { observable, computed, action } from 'mobx';
import { ipcRenderer } from 'electron';

export enum DomainResolutionMethod {
  UnstoppableAPI = "UnstoppableAPI",
  ZilliqaApi = "ZilliqaApi",
  DirectBlockchainLookup = "DirectBlockchainLookup"
}

export enum IPFSContentMethod {
  CloudflareCDN = "CloudflareCDN",
  InfuraAPI = "InfuraAPI",
  DesignatedIPFSNode = "DesignatedIPFSNode"
}

export class BrowserSettings {
  constructor() {
    this.loadSettings();
  }

  @computed
  public get domainResolutionMethod() {
    return this._resolutionMethod;
  }

  public set domainResolutionMethod(method: DomainResolutionMethod) {
    this._resolutionMethod = method;
    this.saveSettings();
  }

  @computed
  public get ipfsContentMethod() {
    return this._contentMethod;
  }

  public set ipfsContentMethod(method: IPFSContentMethod) {
    this._contentMethod = method;
    this.saveSettings();
  }

  @computed
  public get alwaysRunIPFS() {
    return this._alwaysRunIPFS;
  }

  public set alwaysRunIPFS(yesno:boolean){
    this._alwaysRunIPFS = yesno;
    this.saveSettings();
  }

  public loadSettings() {
    let settings: any = ipcRenderer.sendSync('load-settings');
    this._resolutionMethod = settings.domainResolutionMethod;
    this._contentMethod = settings.ipfsContentMethod;
    this._alwaysRunIPFS = settings.alwaysRunIPFS;
  }

  public saveSettings() {
    ipcRenderer.send("save-settings", {
      domainResolutionMethod: this._resolutionMethod,
      ipfsContentMethod: this._contentMethod,
      alwaysRunIPFS: this._alwaysRunIPFS
    });
  }

  @observable
  private _resolutionMethod: DomainResolutionMethod;

  @observable
  private _contentMethod: IPFSContentMethod;

  @observable
  private _alwaysRunIPFS: boolean = true;
}

