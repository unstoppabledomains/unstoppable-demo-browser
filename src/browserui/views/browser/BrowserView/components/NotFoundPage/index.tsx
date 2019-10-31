import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { BrowserSession } from '~/browserui/models/browser-session';
import { NotFoundContainer } from '~/browserui/views/browser/BrowserView/components/NotFoundPage/style';

let currentSession: BrowserSession = null;

export const NotFoundPage = observer(({ visible }: { visible: boolean }) => {

  var pageStyle: any = {
    display: visible ? "block" : "none"
  }

  return (
    <NotFoundContainer style={pageStyle}>
      Page not found
    </NotFoundContainer>
  );
});