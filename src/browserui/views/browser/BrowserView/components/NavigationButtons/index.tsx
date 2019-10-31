import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledContainer } from './style';
import { ToolbarButton } from '../ToolbarButton';
import { icons } from '~/browserui/resources/constants';
import { BrowserSession } from '~/browserui/models/browser-session';


let currentBrowserSession:BrowserSession;

const handleBackClick = () => {
  console.log("Back clicked");
  if(currentBrowserSession.selectedTab){
    currentBrowserSession.selectedTab.goBack();
  }
}

const handleForwardClick = () => {
  if(currentBrowserSession.selectedTab){
    currentBrowserSession.selectedTab.goForward();
  }
}

const handleReloadClick = () => {
  if(currentBrowserSession.selectedTab){
    currentBrowserSession.selectedTab.reload();
  }
}

export const NavigationButtons = observer(({ browserSession }: { browserSession: BrowserSession }) => {

  currentBrowserSession = browserSession;

  let isWindow = false;
  let loading = false;

  return (
    <StyledContainer>
      <ToolbarButton
        size={24}
        icon={icons.back}
        style={{ marginLeft: 8 }}
        onClick={handleBackClick}
        disabled={!browserSession.navigationState.canGoBack}
      />
      <ToolbarButton
        size={24}
        icon={icons.forward}
        onClick={handleForwardClick}
        disabled={!browserSession.navigationState.canGoForward}
      />
      <ToolbarButton
        size={20}
        icon={loading ? icons.close : icons.refresh}
        style={{ marginRight: 8 }}
        onClick={handleReloadClick}
      />
    </StyledContainer>
  );
});