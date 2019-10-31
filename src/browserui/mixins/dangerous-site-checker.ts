import axios from 'axios';

export class DangerousSiteReport{
  public copyright: boolean;
  public illegal: boolean;
  public phishing: boolean;
  public scam: boolean;

  public get message(){
    let message = "This site contains ";
    let problems = [];

    if(this.copyright){
      problems.push('copyrighted');
    }

    if(this.illegal){
      problems.push('illegal');
    }

    if(this.phishing){
      problems.push('phishing');
    }

    if(this.scam){
      problems.push('scams');
    }

    for(var i:number = 0; i < problems.length; i++){
      message += problems[i];
      if(i > 0 && i < problems.length - 1){
        message += ", ";
      }
    }

    message += ' content.';

    return message;
  }
}

class DangerousSiteChecker{
  private CHECK_URL:string = "https://unstoppable-domains-staging.appspot.com/api/blacklist/reports";

  private dangerousSiteData: { [index: string]: { [index:string] : DangerousSiteReport }} = {};

  constructor(){
    this.loadDangerousSiteData();
  }

  private async loadDangerousSiteData(){
    return new Promise((resolve, reject) => {
      try{
        axios.get(this.CHECK_URL).then((response) => {
          for(var domain in response.data){
            for(var i:number = 0; i < response.data[domain].length; i++){
              let record:any = response.data[domain][i];
              let newSiteRecord:DangerousSiteReport = new DangerousSiteReport();
              newSiteRecord.copyright = record.issues.copyright;
              newSiteRecord.illegal = record.issues.illegal;
              newSiteRecord.phishing = record.issues.phishing;
              newSiteRecord.scam = record.issues.scam;

              if(!this.dangerousSiteData[domain]){
                this.dangerousSiteData[domain] = {};
              }
              
              this.dangerousSiteData[domain][record.ipfsHash] = newSiteRecord;
              console.log("Dangerous site: " + domain + " - " + record.ipfsHash);
            }
          }

          resolve();
        });
      }catch(err){
        reject("Error fetching dangerous site data");
      }
    });
  }

  public checkSite(url:string, ipfsHash:string){
    let regex = /^(?:ipfs?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
    let matchUrl = url.match(regex)[1];

    if(this.dangerousSiteData[matchUrl]){
      if(this.dangerousSiteData[matchUrl][ipfsHash]){
        return this.dangerousSiteData[matchUrl][ipfsHash];
      }
    }

    return null;
  }
}

const dangerousSiteChecker = new DangerousSiteChecker()
export default dangerousSiteChecker;