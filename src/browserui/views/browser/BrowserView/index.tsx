import browserSession, { BrowserSession } from "~/browserui/models/browser-session";

import { SearchBox } from "~/browserui/views/browser/BrowserView/components/SearchBar";
import { Toolbar } from "~/browserui/views/browser/BrowserView/components/Toolbar";

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserContainer } from "~/browserui/views/browser/BrowserView/style";
import { SettingsPage } from './components/SettingsPage';
import { ErrorPage } from "~/browserui/views/browser/BrowserView/components/ErrorPage";
import { BrowserState } from "~/browserui/models/tab";
import { EmptyTab } from "./components/EmptyTab";
import { DangerPage} from "./components/DangerPage";
import { BottomBar } from "~/browserui/views/browser/BrowserView/components/BottomBar";
import { AddBookmarkPage } from "~/browserui/views/browser/BrowserView/components/AddBookmarkPage";
import { BookmarksPage } from "~/browserui/views/browser/BrowserView/components/BookmarksPage";

let currentSession:BrowserSession = undefined;

// browserSession.selectedTab.browserState = BrowserState.Bookmarks;

const browserPage = () => {
  switch(currentSession.selectedTab.browserState){
    case BrowserState.DangerPage:
      return(
        <DangerPage browserSession={currentSession} visible={ true } />
      )
    case BrowserState.NewTab:
      return (
        <EmptyTab browserSession={currentSession} visible={true} />
      )
    case BrowserState.Settings:
      return (
        <SettingsPage browserSession={currentSession} visible={true} />
      )
    case BrowserState.Error:
      return (
        <ErrorPage visible={true} />
      )
    case BrowserState.Bookmarks:
      return (
        <BookmarksPage browserSession={currentSession} visible={true} />
      )
    case BrowserState.AddBookmark:
      return (
        <AddBookmarkPage browserSession={currentSession} visible={true} />
      )
  }

  return (
    <span></span>
  )
}


export const BrowserView = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  currentSession = browserSession;

  return (
    <BrowserContainer visible={true}>
      <Toolbar browserSession={browserSession} />
      <SearchBox browserSession={browserSession} />
      { browserPage() }
      <BottomBar browserSession={browserSession} />
    </BrowserContainer>
  );
});