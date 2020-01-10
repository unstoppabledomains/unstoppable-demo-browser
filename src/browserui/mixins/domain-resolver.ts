import {fetch as fetchPolyfill} from "whatwg-fetch";

window.fetch = fetchPolyfill;

import UDResolution from "@unstoppabledomains/resolution";
import axios from "axios";
import {
  BrowserSettings,
  DomainResolutionMethod,
  IPFSContentMethod
} from "~/browserui/models/browser-settings";

const isIPFS = require("is-ipfs");

let resolution = new UDResolution();

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
                  resolve({url: undefined, dest: destUrl, type: "http"});
                }
              });
            break;
          case DomainResolutionMethod.ZilliqaApi:
            console.log("Resolving via Zilliqa API", domain, extension);

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
                  resolve({url: undefined, dest: destUrl, type: "http"});
                }
              });
            break;
        }
      } else {
        resolve({url: undefined, dest: url, type: "http"});
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
    return new Promise(async (resolve, reject) => {
      let dmn = domain + "." + extension;

      console.log(dmn);

      console.log(resolution as any);

      console.log((resolution as any).cns.isNode());

      (global as any).fetch = fetchPolyfill;

      await (resolution as any).cns
        .fetch("http://google.com/")
        .then((r: any) => r.text())
        .then(console.log)
        .catch(console.error);

      resolution
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
            reject({response: 400, message: "Address not found"});
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

/* 
  List of gateways

	"https://ipfs.io/ipfs/:hash"
	"https://:hash.ipfs.dweb.link"
	"https://gateway.ipfs.io/ipfs/:hash"
	"https://ipfs.infura.io/ipfs/:hash"
	"https://rx14.co.uk/ipfs/:hash"
	"https://ninetailed.ninja/ipfs/:hash"
	"https://ipfs.globalupload.io/:hash"
	"https://ipfs.jes.xxx/ipfs/:hash"
	"https://10.via0.com/ipfs/:hash"
	"https://ipfs.eternum.io/ipfs/:hash"
	"https://hardbin.com/ipfs/:hash"
	"https://ipfs.wa.hle.rs/ipfs/:hash"
	"https://gateway.blocksec.com/ipfs/:hash"
	"https://ipfs.renehsz.com/ipfs/:hash"
	"https://cloudflare-ipfs.com/ipfs/:hash"
	"https://:hash.ipfs.cf-ipfs.com"
	"https://ipns.co/:hash"
	"https://ipfs.mrh.io/ipfs/:hash"
	"https://gateway.originprotocol.com/ipfs/:hash"
	"https://gateway.pinata.cloud/ipfs/:hash"
	"https://ipfs.doolta.com/ipfs/:hash"
	"https://ipfs.sloppyta.co/ipfs/:hash"
	"https://ipfs.busy.org/ipfs/:hash"
	"https://ipfs.greyh.at/ipfs/:hash"
	"https://gateway.serph.network/ipfs/:hash"
	"https://jorropo.ovh/ipfs/:hash"
	"https://gateway.temporal.cloud/ipfs/:hash"
	"https://ipfs.fooock.com/ipfs/:hash"
	"https://cdn.cwinfo.net/ipfs/:hash"
	"https://ipfs.privacytools.io/ipfs/:hash"
	"https://ipfs.jeroendeneef.com/ipfs/:hash"
	"https://permaweb.io/ipfs/:hash"
	"https://ipfs.stibarc.gq/ipfs/:hash"
	"https://ipfs.best-practice.se/ipfs/:hash"
	"https://:hash.ipfs.2read.net"
  "https://ipfs.2read.net/ipfs/:hash"
*/
