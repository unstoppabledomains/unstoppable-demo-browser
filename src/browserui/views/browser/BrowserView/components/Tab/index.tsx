import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledTab, TabContainer, StyledIcon, StyledClose, StyledContent, StyledTitle } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { Tab } from '~/browserui/models/tab';
import { Preloader } from '~/browserui/views/browser/BrowserView/components/Preloader';

let currentSession: BrowserSession = null;

const removeTab = (tab: Tab) => {
  currentSession.removeTab(tab);
};

const setSelectedTab = (tab: Tab) => {
  console.log("Selected tab set");
  currentSession.selectedTab = tab;
}

const Content = observer(({ tab }: { tab: Tab }) => {
  return (
    <StyledContent collapsed={true} pinned={false}>
      {!tab.loading && tab.favicon !== '' && (
        <StyledIcon
          isIconSet={tab.favicon !== ''}
          style={{ backgroundImage: `url(${tab.favicon})` }}
        ></StyledIcon>
      )}

      {tab.loading && (
        <Preloader
          color={'#333333'}
          thickness={6}
          size={16}
          style={{ minWidth: 16 }}
        />
      )}
      {(
        <StyledTitle
          isIcon={tab.isIconSet}
          style={{
            color: '#000000'
          }}
        >
          {tab.title}
        </StyledTitle>
      )}
    </StyledContent>
  );
});

const Close = observer(({ tab }: { tab: Tab }) => {
  if(tab.collapsable){
    return (
      <StyledClose onClick={(event) => { event.stopPropagation(); removeTab(tab) }} />
    );
  }else{
    return (<div></div>);
  }
});

export default observer(({ tab, browserSession }: { tab: Tab, browserSession: BrowserSession }) => {
  currentSession = browserSession;
  
  return (
    <StyledTab
      selected={tab.selected}
      title={tab.title}
      onClick={() => setSelectedTab(tab)}
    >
      <TabContainer style={{
        backgroundColor: tab.selected
          ? '#cccccc'
          : '#eeeeee'
      }}>
        <Content tab={tab} />
        <Close tab={tab} />
      </TabContainer>
    </StyledTab>
  );
});