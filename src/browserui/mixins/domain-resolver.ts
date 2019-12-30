import UDResolution from "@unstoppabledomains/resolution";
import axios from "axios";
import {
  BrowserSettings,
  DomainResolutionMethod,
  IPFSContentMethod
} from "~/browserui/models/browser-settings";
const isIPFS = require("is-ipfs");

let _resolutionInst: UDResolution = undefined;

const getUDResolution = () => {
  if (_resolutionInst) {
    return _resolutionInst;
  } else {
    _resolutionInst = new UDResolution();
    return _resolutionInst;
  }
};

export class DomainResolver {
  private IPFS_CLOUDFLARE_CDN_BASE: string =
    "https://cloudflare-ipfs.com/ipfs/";
  private IPFS_INFURA_CDN_BASE: string = "https://ipfs.infura.io/ipfs/";

  private browserSettings: BrowserSettings;

  constructor(browserSettings: BrowserSettings) {
    this.browserSettings = browserSettings;
  }

  public resolve(url: string) {
    return new Promise((resolve, reject) => {
      let destUrl: string = undefined;
      let showUrl: string = undefined;

      if (!url.includes(".")) {
        url = "https://www.google.com/search?q=" + url;
      } else if (!/^https?:\/\//i.test(url)) {
        url = url.replace("ipfs://", "");
        url = ("http://" + url).replace(/\/?$/, "/");
      }

      let hostnameParts = new URL(url).hostname.split(".");
      let extension = hostnameParts[hostnameParts.length - 1];
      let domain = hostnameParts.slice(0, hostnameParts.length - 1).join(".");

      console.log(
        "Resolving",
        domain + "." + extension,
        "with",
        this.browserSettings.domainResolutionMethod
      );

      if (extension == "zil" || extension == "crypto") {
        showUrl = url;

        switch (this.browserSettings.domainResolutionMethod) {
          case DomainResolutionMethod.UnstoppableAPI:
            console.log("Resolving via unstoppable API");
            this.resolveUnstoppableAPI(domain, extension)
              .then(result => {
                if (result) {
                  showUrl = url.replace("http://", "ipfs://");
                  destUrl = (this.cdnBaseUrl + result).replace(/\/?$/, "/");
                  resolve({
                    url: showUrl,
                    dest: destUrl,
                    type: "zil",
                    ipfsHash: result
                  });
                }
              })
              .catch(err => {
                if (err.response == 500) {
                  reject(err);
                } else {
                  destUrl =
                    "https://unstoppabledomains.com/search?searchTerm=" +
                    domain +
                    "&searchRef=home";
                  resolve({ url: undefined, dest: destUrl, type: "http" });
                }
              });
            break;
          case DomainResolutionMethod.ZilliqaApi:
            console.log("Resolving via Zilliqa API");

            this.resolveLibrary(domain, extension)
              .then(result => {
                if (result) {
                  showUrl = url.replace("http://", "ipfs://");
                  destUrl = (this.cdnBaseUrl + result).replace(/\/?$/, "/");
                  resolve({
                    url: showUrl,
                    dest: destUrl,
                    type: "zil",
                    ipfsHash: result
                  });
                }
              })
              .catch(err => {
                if (err.response == 500) {
                  reject(err);
                } else {
                  destUrl =
                    "https://unstoppabledomains.com/search?searchTerm=" +
                    domain +
                    "&searchRef=home";
                  resolve({ url: undefined, dest: destUrl, type: "http" });
                }
              });
            break;
        }
      } else {
        resolve({ url: undefined, dest: url, type: "http" });
      }
    });
  }

  public resolveUnstoppableAPI(domain: string, extension: string) {
    let resolveFrom =
      "https://unstoppabledomains.com/api/v1/" + domain + "." + extension;
    return new Promise((resolve, reject) => {
      axios.get(resolveFrom).then(response => {
        if (response.data["ipfs"] && response.data.ipfs["html"]) {
          console.log(response.data.ipfs.html);
          resolve(response.data.ipfs.html);
        } else {
          reject("No valid API response returned");
        }
      });
    });
  }

  public resolveLibrary(domain: string, extension: string) {
    return new Promise((resolve, reject) => {
      let dmn = domain + "." + extension;

      console.log(dmn);

      getUDResolution()
        .ipfsHash(dmn)
        .then(ipfsHash => {
          console.log(dmn, " has addresses ", ipfsHash);
          try {
            if (!isIPFS.multihash(ipfsHash)) {
              reject({
                response: 500,
                mesasge:
                  "IPFS address " + ipfsHash + " is not a valid IPFS multihash"
              });
            } else {
              resolve(ipfsHash);
            }
          } catch (e) {
            reject({ response: 400, message: "Address not found" });
          }
        })
        .catch(console.error);
    });
  }

  public resolveCryptoApi(domain: string) {
    return new Promise((resolve, reject) => {
      let dmn = domain + ".crypto";

      getUDResolution()
        .ipfsHash(dmn)
        .then(ipfsHash => {
          console.log(dmn, " has addresses ", ipfsHash);
          try {
            if (!isIPFS.multihash(ipfsHash)) {
              reject({
                response: 500,
                mesasge:
                  "IPFS address " + ipfsHash + " is not a valid IPFS multihash"
              });
            } else {
              resolve(ipfsHash);
            }
          } catch (e) {
            reject({ response: 400, message: "Address not found" });
          }
        })
        .catch(console.error);
    });
  }

  public resolveDemoUrl(domain: string) {
    console.log("Demo domain: " + domain);
    if (domain.indexOf("brad") != -1) {
      return (
        this.cdnBaseUrl + "QmefehFs5n8yQcGCVJnBMY3Hr6aMRHtsoniAhsM1KsHMSe/"
      );
    } else if (domain.indexOf("matt") != -1) {
      return (
        this.cdnBaseUrl + "QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD/"
      );
    } else {
      return (
        this.cdnBaseUrl + "QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ/"
      );
    }
  }

  public get cdnBaseUrl() {
    switch (this.browserSettings.ipfsContentMethod) {
      case IPFSContentMethod.CloudflareCDN:
        return this.IPFS_CLOUDFLARE_CDN_BASE;
      case IPFSContentMethod.InfuraAPI:
        return this.IPFS_INFURA_CDN_BASE;
    }

    return this.IPFS_CLOUDFLARE_CDN_BASE;
  }
}
