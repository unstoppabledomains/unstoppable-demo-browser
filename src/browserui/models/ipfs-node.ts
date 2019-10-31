
const IPFS = require('ipfs');


class IPFSNode {
  private ipfsNode: any;

  constructor() {
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
      address = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';
      // address = 'QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ';

      // this.ipfsNode.get(address, (error: any, files: any) => {
      //   console.log("Got a response");
      //   debugger;
      // });

      const resp: string = await this.ipfsNode.cat(address);
      resolve(resp);
    })
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;