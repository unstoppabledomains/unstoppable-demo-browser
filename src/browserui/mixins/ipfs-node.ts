import { observable } from "mobx";
import * as mime from "mime-types";

const URL = require('url');
var sha1 = require('sha1');

export class IPFSContent {
  public webFiles: { [index: string]: { data: any } } = {};
  public rawFile: any;
  public contentType: string;
  public loaded: boolean = false;

  private ipfsNode: any;

  constructor(ipfsNode: any) {
    this.ipfsNode = ipfsNode;
  }

  public getWebContent(filename: string) {
    console.log("Getting file content " + filename);
    return this.webFiles[filename];
  }

  public getIndexContentType(){
    if(this.contentType == 'web'){
      return 'text/html';
    }

    return undefined;
  }

  public getIndex() {
    if (this.contentType == 'web') {
      return this.getWebContent('/index.html');
    } else {
      return this.rawFile;
    }
  }

  public async loadIPFSSite(address: string) {
    return new Promise((resolve, reject) => {
      this.ipfsNode.get(address).then((files: any) => {
        if (files.length > 1) {
          this.contentType = 'web';
          for (let i: number = 0; i < files.length; i++) {
            let file: any = files[i];
            let filePath = file.path.replace(address, '');
            if (filePath) {
              this.webFiles[filePath] = file.content;
              console.log("Added " + filePath);
            } else {
              console.log("Invalid file path " + file);
            }
          }
          this.loaded = true;
          resolve();
        } else if (files.length == 1) {
          this.contentType = 'raw';
          this.rawFile = files[0].content;
          this.loaded = true;
          resolve();
        } else {
          console.log("Invalid response");
          reject("Bad response from ipfs network");
        }
      }).catch((error: any) => {
        reject(error);
      });
    })
  }
}


class IPFSNode {
  private ipfsNode: any;
  private server: any;
  public port: number = 10000;

  private contentCache: { [index: string]: IPFSContent } = {}

  @observable
  public running: boolean = false;

  constructor() {

  }

  public webProxyUrl(url: string) {
    return 'http://' + this.getHashUrl(url) + '.localhost:' + this.port + '/';
  }

  public startIPFSNode() {

    return new Promise((resolve, reject) => {
      if (this.ipfsNode) {
        resolve(this.ipfsNode);
      } else {
        const IPFS = require('ipfs');
        console.log("Starting IPFS node");
        IPFS.create().then((node: any) => {
          this.ipfsNode = node;
          this.running = true;
        }).then(() => {
          return this.startWebServer();
        }).then(() => {
          resolve(this.ipfsNode);
        }).catch((err: any) => {
          reject(err);
        });
      }
    });
  }

  public stopIPFSNode() {
    return new Promise((resolve, reject) => {
      if (this.ipfsNode) {
        console.log("Stopping IPFS node");
        this.ipfsNode.stop().then(() => {
          this.server.close();
        }).then(() => {
          this.ipfsNode = undefined;
          this.running = false;
          resolve();
        })
      } else {
        resolve();
      }
    });
  }

  public startWebServer() {
    return new Promise((resolve, reject) => {
      if (!server) {
        const http = require('http');
        var server = http.createServer((req: any, res: any) => {
          let site = req.headers.host.split('.')[0];

          if (site) {
            console.log("Displaying site: " + site);
            var content: IPFSContent = this.contentCache[site];

            if (req.url == '/') {
              if(content.getIndexContentType()){
                res.setHeader('Content-Type', content.getIndexContentType());
              }

              res.write(content.getIndex())
              res.end();
            } else {
              if (mime.lookup(req.url)) {
                res.setHeader('Content-Type', mime.lookup(req.url));
              }
              res.write(content.getWebContent(req.url));
              res.end();
            }   
          } else {
            console.log(req.url);
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 Not Found\n");
            res.end();
          }
        });

        try {
          server.listen(this.port, 'localhost');
          this.server = server;
          resolve(this.server);
        } catch (err) {
          console.log("Error starting local http server");
          reject();
        }
      } else {
        resolve(this.server);
      }
    });
  }

  public getHashUrl(url: string) {
    return sha1(url);
  }

  public loadIPFSSite(url: string, address: string) {
    let ipfsContentLoader = new IPFSContent(this.ipfsNode);
    this.contentCache[this.getHashUrl(url)] = ipfsContentLoader;

    console.log("Site will be available at " + this.webProxyUrl(url));

    return ipfsContentLoader.loadIPFSSite(address);
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;