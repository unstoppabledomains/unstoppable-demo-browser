import { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/browser/BrowserView/components/SearchBar";
import { Toolbar } from "~/browserui/views/browser/BrowserView/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserContainer } from "~/browserui/views/browser/BrowserView/style";
import { StyledFind, SearchIcon, Input, Occurrences, Buttons, Button } from "~/browserui/views/browser/BrowserView/style";
import { icons } from "~/browserui/resources/constants";
import { SettingsPage } from './components/SettingsPage';


const { dialog } = require('electron').remote;


export const BrowserView = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  return (
    <BrowserContainer visible={true}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} />
      <SettingsPage browserSession={browserSession} visible={browserSession.selectedTab.settingsPage} />
    </BrowserContainer>
  );
});