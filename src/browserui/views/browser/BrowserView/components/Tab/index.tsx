import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledTab, TabContainer, StyledIcon, StyledClose, StyledContent, StyledTitle } from './style';
import { BrowserSession } from '~/browserui/models/browser-session';
import { ITab } from '~/browserui/models/tab';
import { Preloader } from '~/browserui/views/browser/BrowserView/components/Preloader';

let currentSession: BrowserSession = null;

const removeTab = (tab: ITab) => {
  currentSession.removeTab(tab);
};

const setSelectedTab = (tab: ITab) => {
  console.log("Selected tab set");
  currentSession.selectedTab = tab;
}

const Content = observer(({ tab }: { tab: ITab }) => {
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

const Close = observer(({ tab }: { tab: ITab }) => {
  if(tab.collapsable){
    return (
      <StyledClose onClick={(event) => { event.stopPropagation(); removeTab(tab) }} />
    );
  }else{
    return (<div></div>);
  }
});

export default observer(({ tab, browserSession }: { tab: ITab, browserSession: BrowserSession }) => {
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