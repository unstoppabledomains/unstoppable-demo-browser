import { observable } from "mobx";
import * as mime from "mime-types";

const IPFS = require('ipfs');
const http = require('http');

// TODO:
// Clear caches between loads
// Handle port collisions
// Handle bad responses more elegantly
// Set the title when the load completes for raw files
// Enable turning on and off IPFS node
// Set up loading indicator
// Set up indicator for whether or not IPFS node is active

class IPFSNode {
  private ipfsNode: any;

  private contentType:string;

  private webFiles:{[index:string] : {data: any}} = {};
  private rawFile:any;

  @observable
  public loading: boolean = false;

  constructor() {
    var server = http.createServer((req:any, res:any) => {
      if (req.url == '/') {
        if(this.contentType === 'raw'){
          res.write(this.rawFile);
          res.end();
        }else if(this.contentType == 'web'){
          res.setHeader('Content-Type', 'text/html');
          res.end(this.webFiles['/index.html']);
        }
      }else if(this.webFiles[req.url] !== undefined){
        if(mime.lookup(req.url)){
          res.setHeader('Content-Type', mime.lookup(req.url));
        }        
        res.write(this.webFiles[req.url]);
        res.end();
      }else{
        console.log(req.url);
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
      }
      return;
    });
  
    try{
      server.listen(10000, 'localhost');
    } catch(err){
      console.log("Error starting local http server");
    }
  }

  public async loadIPFSSite(address: string) {
    return new Promise(async (resolve, reject) => {
      if (!this.ipfsNode) {
        try {
          this.ipfsNode = await IPFS.create();
          const id = await this.ipfsNode.id();
          console.log("Node ready " + id);
        } catch (err) {
          console.log(err)
          reject(err);
        }
      }

      console.log("Doing lookup -- " + address);
      // SIMPLE
      // address = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';

      // PINIATA
      // address = 'QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ';

      // MATT.ZIL
      // address = 'QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD';

      this.ipfsNode.get(address).then((files: any) => {
        if(files.length > 1){
          this.contentType = 'web';
          for(let i:number = 0; i < files.length; i++){
            let file:any = files[i];
            let filePath = file.path.replace(address, '');
            if(filePath){
              this.webFiles[filePath] = file.content;
              console.log("Added " + filePath);
            }else{
              console.log("Invalid file path " + file);
            }
          }
          resolve();
        }else if(files.length == 1){
          this.contentType = 'raw';
          this.rawFile = files[0].content;

          resolve();
        }else{
          console.log("Invalid response");
          reject("Bad response from ipfs network");
        }
      }).catch((error:any) => {
        console.log(error);
      });
    })
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;