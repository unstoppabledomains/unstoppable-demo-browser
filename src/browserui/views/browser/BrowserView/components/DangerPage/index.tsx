import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Container, ProceedButton } from './style';

let currentSession: BrowserSession = null;

const handleProceed = () => {
  let currentURL:string = currentSession.selectedTab.urlBarValue;
  currentSession.selectedTab.setUrl(currentURL, true);
}

export const DangerPage = observer(({ browserSession, visible }: { browserSession: BrowserSession, visible: boolean }) => {

  currentSession = browserSession;

  var pageStyle: any = {
    display: visible ? "block" : "none"
  }

  return (
    <Container style={pageStyle}>
      <p>
        {browserSession.selectedTab.dangerousSiteReport.message}
      </p>

      <p>
        Do you wish to proceed?
      </p>

      <p>
        <ProceedButton onClick={handleProceed}>Proceed</ProceedButton>
      </p>
    </Container>
  );
});