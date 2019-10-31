import { observable, computed } from "mobx";
import { ipcRenderer } from "electron";



export class Bookmark{
  public title: string;
  public url: string;

  constructor(title: string, url: string){
    this.title = title;
    this.url = url;
  }
}

export class Bookmarks{
  constructor(){
    this.init();
  }

  private async init(){
    this.load();
  }

  public bookmarks:Bookmark[] = observable.array([], { deep: false });

  public set pendingTitle(value:string){
    this.error = '';
    if(value){
      this._pendingTitle = value;
    }else{
      this._pendingTitle = '';
    }
  }

  public set pendingUrl(value:string){
    this.error = '';
    if(value){
      this._pendingUrl = value;
    }else{
      this._pendingUrl = '';
    }
  }

  @computed
  public get pendingTitle(){
    return this._pendingTitle;
  }

  @computed
  public get pendingUrl(){
    return this._pendingUrl;
  }

  @observable
  public _pendingTitle: string = '';
  
  @observable
  public _pendingUrl: string = '';

  @observable
  public error: string = '';

  public createPendingBookmark(){
    this.addBookmark(this._pendingTitle, this._pendingUrl);
  }

  public addBookmark(title:string, url:string){
    this.error = '';

    if(!title || !url){
      this.error = 'Title and url must be set';
      throw 'Title and url must be set';
      return;
    }

    for(var i:number = 0; i < this.bookmarks.length; i++){
      console.log(title == this.bookmarks[i].title);
      if(title == this.bookmarks[i].title){
        this.error = 'Bookmark title already taken.';
        throw 'Bookmark title already taken.';
        return;
      }
    }

    if(!this.isValidUrl(url)){
      this.error = 'Url is not a valid url.';
      throw 'Url is not a valid url.';
      return;
    }

    this.bookmarks.push(new Bookmark(title, url));
    this.save();
  }

  public removeBookmark(bookmark: Bookmark){
    var index = this.bookmarks.indexOf(bookmark);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
    }

    this.save();
  }

  public save(){
    ipcRenderer.send("save-bookmarks", this.bookmarks);
  }

  public load(){
    let bookmarks: any = ipcRenderer.sendSync('load-bookmarks');
    for(var key in bookmarks){
      this.bookmarks.push(new Bookmark(bookmarks[key].title, bookmarks[key].url));
    }
  }

  private isValidUrl(url:string){
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;  
    }
  }
}
