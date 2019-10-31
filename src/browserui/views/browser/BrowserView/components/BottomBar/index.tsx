import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Container, YellowContainer, RunYourOwnNodeLinkStyle } from './style';
import ipfsNode from '~/browserui/mixins/ipfs-node';

let currentSession: BrowserSession = null;


const handleRunYourOwnNodeClick = () => {
  currentSession.selectedTab.setUrl('settings');
}

const IPFSRunningIndicator = (props:any) => {
  if (props.running) {
    return (
      <Container>
        IPFS node running
      </Container>
    );
  } else {
    return (
      <YellowContainer>
        IPFS node not running --> <RunYourOwnNodeLinkStyle href='#' onClick={handleRunYourOwnNodeClick}>Support decentralization - run your own IPFS node</RunYourOwnNodeLinkStyle>
      </YellowContainer>
    );
  }
}

export const BottomBar = observer(({ browserSession }: { browserSession: BrowserSession }) => {

  currentSession = browserSession;

  return (
    <div>
      <IPFSRunningIndicator running={ipfsNode.running} />
    </div>
  );
});