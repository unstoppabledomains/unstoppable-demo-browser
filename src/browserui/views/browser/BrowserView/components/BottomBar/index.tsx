import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Container } from './style';
import ipfsNode from '~/browserui/mixins/ipfs-node';

let currentSession: BrowserSession = null;

const IPFSRunningIndicator = (props:any) => {
  if (props.running) {
    return (
      <Container>
        IPFS node running
      </Container>
    );
  } else {
    return (
      <Container>
        IPFS node not running --> Support decentralization - run your own IPFS node
      </Container>
    );
  }
}

export const BottomBar = observer(() => {
  return (
    <div>
      <IPFSRunningIndicator running={ipfsNode.running} />
    </div>
  );
});