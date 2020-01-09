import { observer } from 'mobx-react-lite';
import * as React from "react";
import ipfsNode from "~/browserui/mixins/ipfs-node";
import { BrowserSession } from "~/browserui/models/browser-session";
import { BrowserSettings, DomainResolutionMethod, IPFSContentMethod } from "~/browserui/models/browser-settings";
import { version } from "../../../../../../../package.json";
import { Box1, Box2, CheckBox, Header1, LearnMoreButton, OptionLabel, OptionLabel2, OptionRow, RadioButton, SettingsHeader } from './style';

let currentSession: BrowserSession = null;

const handleIPFSMethodChange = (newMethod: IPFSContentMethod) => {
  currentSession.settings.ipfsContentMethod = newMethod;
}

const handleDomainLookupMethodChange = (newMethod: DomainResolutionMethod) => {
  currentSession.settings.domainResolutionMethod = newMethod;
}

const handleLearnMoreClick = () => {
  currentSession.selectedTab.setUrl("https://github.com/unstoppabledomains/unstoppable-demo-browser");
}

const handleIPFSAlwaysRun = (yesno: boolean) => {
  if(yesno){
    if(!ipfsNode.running){
      ipfsNode.startIPFSNode();
    }
  }else{
    if(ipfsNode.running){
      ipfsNode.stopIPFSNode();
    }
  }

  currentSession.settings.alwaysRunIPFS = yesno;
}

const handleIPFSStopClick = () => {
  if(currentSession.settings.alwaysRunIPFS){
    currentSession.settings.alwaysRunIPFS = false;
  }

  ipfsNode.stopIPFSNode();
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

const IPFSNodeControls = (props:any) => {
  if(props.running){
    return(
      <div>
        IPFS Node running -- <button onClick={() => { handleIPFSStopClick(); }}>Stop</button>
      </div>
    )
  }else{
    return(
      <div>
        IPFS Node not running -- <button onClick={() => { ipfsNode.startIPFSNode() }}>Start</button>
      </div>
    )
  }
}

export const SettingsPage = observer(({ visible, browserSession }: { visible: boolean, browserSession: BrowserSession }) => {
  currentSession = browserSession;
  let settings:BrowserSettings = browserSession.settings;

  var pageStyle: any = {
    display: visible ? "inline" : "none",
    overflowY: 'auto',
    paddingBottom: '40px'
  }

  return (
    <div style={pageStyle}>
      <SettingsHeader>
        { SettingsHeaderText() }
      </SettingsHeader>
      <Box1>
        <h2>Domain</h2>
        <Box2>
          <LearnMoreButton onClick={handleLearnMoreClick}>
            Learn More
          </LearnMoreButton>
          <Header1>
            Resolve domain via
          </Header1>
          <div>
            <OptionRow>
              <RadioButton type="radio" name="domain" value="1" onChange={() => { handleDomainLookupMethodChange(DomainResolutionMethod.UnstoppableAPI) }} checked={settings.domainResolutionMethod === DomainResolutionMethod.UnstoppableAPI} />
              <OptionLabel>Unstoppable.com API -</OptionLabel> <OptionLabel2> Non-paranoid + fast response times</OptionLabel2>
            </OptionRow>
            <OptionRow>
              <RadioButton type="radio" name="domain" value="2" onChange={() => { handleDomainLookupMethodChange(DomainResolutionMethod.ZilliqaApi) }} checked={settings.domainResolutionMethod === DomainResolutionMethod.ZilliqaApi} />
              <OptionLabel>Blockchain API -</OptionLabel> <OptionLabel2> Direct blockchain lookup via API - non-paranoid + fast response times</OptionLabel2>
            </OptionRow>
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
        <h2>IPFS Content</h2>
        <Box2>
          <LearnMoreButton onClick={handleLearnMoreClick}>
            Learn More
          </LearnMoreButton>
          <Header1>
            Download IPFS content via
          </Header1>
          <div>
            <OptionRow>
              <RadioButton type="radio" name="content" value="1" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.CloudflareCDN) }} checked={settings.ipfsContentMethod == IPFSContentMethod.CloudflareCDN} />
              <OptionLabel>Cloudflare CDN -</OptionLabel> <OptionLabel2> Non-paranoid + fast response times</OptionLabel2>
            </OptionRow>
            <OptionRow>
              <RadioButton type="radio" name="content" value="2" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.InfuraAPI) }} checked={settings.ipfsContentMethod == IPFSContentMethod.InfuraAPI} />
              <OptionLabel>Infura API -</OptionLabel> <OptionLabel2> Non-paranoid + fast response times</OptionLabel2>
            </OptionRow>
            <OptionRow>
              <RadioButton type="radio" name="content" value="3" onChange={() => { handleIPFSMethodChange(IPFSContentMethod.DesignatedIPFSNode) }} checked={settings.ipfsContentMethod == IPFSContentMethod.DesignatedIPFSNode} />
              <OptionLabel>Directly from IPFS network -</OptionLabel> <OptionLabel2> Paranoid + slow response times</OptionLabel2>
            </OptionRow>
            {/* <Topic1>
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
      <Box1>
        <h2>IPFS Node</h2>
        <Box2>
          <OptionRow>
            <OptionLabel2>
              <CheckBox type="checkbox" onChange={() => { handleIPFSAlwaysRun(!settings.alwaysRunIPFS) }} checked={settings.alwaysRunIPFS} />
              Always run IPFS node
            </OptionLabel2>
          </OptionRow>
          <OptionLabel2>
            <IPFSNodeControls running={ipfsNode.running} />
          </OptionLabel2>
        </Box2>
      </Box1>
    </div >
  );
});

