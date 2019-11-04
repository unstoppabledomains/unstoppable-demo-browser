import browserSession, { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/browser/BrowserView/components/SearchBar";
import { Toolbar } from "~/browserui/views/browser/BrowserView/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserContainer } from "~/browserui/views/browser/BrowserView/style";
import { StyledFind, SearchIcon, Input, Occurrences, Buttons, Button } from "~/browserui/views/browser/BrowserView/style";
import { icons } from "~/browserui/resources/constants";
import { SettingsPage } from './components/SettingsPage';
import { NotFoundPage } from "~/browserui/views/browser/BrowserView/components/NotFoundPage";
import { BrowserState } from "~/browserui/models/tab";
import { EmptyTab } from "./components/EmptyTab";
import { DangerPage} from "./components/DangerPage";


const { dialog } = require('electron').remote;

// browserSession.selectedTab.browserState = BrowserState.DangerPage;

export const BrowserView = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  return (
    <BrowserContainer visible={true}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} />
      <DangerPage visible={browserSession.selectedTab.browserState == BrowserState.DangerPage } />
      <EmptyTab browserSession={browserSession} visible={browserSession.selectedTab.browserState == BrowserState.NewTab} />
      <SettingsPage browserSession={browserSession} visible={browserSession.selectedTab.browserState == BrowserState.Settings} />
      <NotFoundPage visible={browserSession.selectedTab.browserState == BrowserState.NotFound } />
    </BrowserContainer>
  );
});