import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Container } from './style';

let currentSession: BrowserSession = null;

export const BottomBar = observer(() => {

    return (
      <Container>
        IPFS node running
      </Container>
    );
});