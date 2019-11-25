
const IPFS = require('ipfs');
const http = require('http');

class IPFSNode {
  private ipfsNode: any;

  constructor() {
    var server = http.createServer((req:any, res:any) => {     
      if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`<!DOCTYPE html><meta charset="utf8"><body>Hello there</body>`);
        return;
      }
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
          console.error(err)
          reject(err);
        }
      }

      console.log("Doing lookup");
      // PINIATTA
      // address = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';

      // SIMPLE
      // address = 'QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ';

      // MATT.ZIL
      address = 'QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD';

      const stream = this.ipfsNode.getReadableStream(address);
      stream.on('data', (file: any) => {
        // write the file's path and contents to standard out
        console.log(file.path)
        if(file.type !== 'dir') {
          file.content.on('data', (data: any) => {
            console.log(data.toString())
          })
          file.content.resume()
        }
      })

      // this.ipfsNode.get(address, (error: any, files: any) => {
      //   console.log("Got a response");
      //   debugger;
      // }).catch((err) {
      //   console.log("Error: " + err);
      // });
    })
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;