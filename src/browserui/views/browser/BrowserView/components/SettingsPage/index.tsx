import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from 'mobx-react-lite';
import { SettingsHeader, Box1, Box2, Header1, LearnMoreButton, OptionLabel, OptionLabel2, Topic1, RadioButton } from './style';
import { BrowserSession } from "~/browserui/models/browser-session";
import { BrowserSettings, IPFSContentMethod, DomainResolutionMethod } from "~/browserui/models/browser-settings";
import { version } from "../../../../../../../package.json";

let currentSession: BrowserSession = null;

const handleIPFSMethodChange = (newMethod: IPFSContentMethod) => {
  currentSession.settings.ipfsContentMethod = newMethod;
}

const handleDomainLookupMethodChange = (newMethod: DomainResolutionMethod) => {
  currentSession.settings.domainResolutionMethod = newMethod;
}


const SettingsHeaderText = () => {
  if(currentSession.updateAvailable){
    return (
      <div>
        Settings [version {version} -- Update Available]
      </div>
    );
  }else{
    return (
      <div>
        Settings [version {version}]
      </div>
    );
  }
}

export const SettingsPage = observer(({ visible, browserSession }: { visible: boolean, browserSession: BrowserSession }) => {
  currentSession = browserSession;
  let settings:BrowserSettings = browserSession.settings;

  var pageStyle: any = {
    display: visible ? "block" : "none",
    overflowY: 'auto',
    paddingBottom: '30px'
  }

  return (
    <div style={pageStyle}>
      <SettingsHeader>
        { SettingsHeaderText() }
      </SettingsHeader>
      <Box1>
        Domain
        <Box2>
          <LearnMoreButton>
            Learn More
          </LearnMoreButton>
          <Header1>
            Resolve domain via
          </Header1>
          <div>
            <div>
              <RadioButton type="radio" name="domain" value="1" onChange={() => { handleDomainLookupMethodChange(DomainResolutionMethod.UnstoppableAPI) }} checked={settings.domainResolutionMethod === DomainResolutionMethod.UnstoppableAPI} />
              <OptionLabel>Unstoppable.com API -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="domain" value="2" onChange={() => { handleDomainLookupMethodChange(DomainResolutionMethod.ZilliqaApi) }} checked={settings.domainResolutionMethod === DomainResolutionMethod.ZilliqaApi} />
              <OptionLabel>Zilliqa API -</OptionLabel> <OptionLabel2> Direct blockchain lookup via API - non-parnoid + fast response times</OptionLabel2>
            </div>
            {/* <div>
              <RadioButton type="radio" name="domain" value="3" onChange={() => { handleDomainLookupMethodChange(DomainResolutionMethod.DirectBlockchainLookup) }} checked={settings.domainResolutionMethod === DomainResolutionMethod.DirectBlockchainLookup} />
              <OptionLabel>Direct blockchain lookup -</OptionLabel> <OptionLabel2> Non-parnoid + slow response times</OptionLabel2>
            </div>
            <Topic1>
              <OptionLabel>Read address from - </OptionLabel><input type="text" name="firstname" />
            </Topic1> */}
          </div>
        </Box2>
      </Box1>
      <Box1>
        IPFS Content
        <Box2>
          <LearnMoreButton>
            Learn More
          </LearnMoreButton>
          <Header1>
            Download IPFS content via
          </Header1>
          <div>
            <div>
              <RadioButton type="radio" name="content" value="1" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.CloudflareCDN) }} checked={settings.ipfsContentMethod == IPFSContentMethod.CloudflareCDN} />
              <OptionLabel>Cloudlare CDN -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            <div>
              <RadioButton type="radio" name="content" value="2" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.InfuraAPI) }} checked={settings.ipfsContentMethod == IPFSContentMethod.InfuraAPI} />
              <OptionLabel>Infura API -</OptionLabel> <OptionLabel2> Non-parnoid + fast response times</OptionLabel2>
            </div>
            {/* <div>
              <RadioButton type="radio" name="content" value="3" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.DesignatedIPFSNode) }} checked={settings.ipfsContentMethod == IPFSContentMethod.DesignatedIPFSNode} />
              <OptionLabel>Designted IPFS Node -</OptionLabel> <OptionLabel2> Non-parnoid + slow response times</OptionLabel2>
            </div>
            <Topic1>
              <div>
                <RadioButton type="radio" name="content" value="4" />
                <OptionLabel> Specify a node - </OptionLabel><input type="text" name="firstname" />
              </div>
              <div>
                <RadioButton type="radio" name="content" value="5" />
                <OptionLabel> Run your own local node (use more internet bandwidth) </OptionLabel>
              </div>
            </Topic1> */}
          </div>
        </Box2>
      </Box1>
    </div >
  );
});

