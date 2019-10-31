import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Buttons, StyledToolbar, Handle, Separator } from './style';
import { Tabbar } from '../Tabbar';
import { NavigationButtons } from '../NavigationButtons';
import { BrowserSession } from '~/browserui/models/browser-session';

export const Toolbar = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  return (
    <StyledToolbar>
      <Tabbar browserSession={browserSession} />
    </StyledToolbar>
  );
});

