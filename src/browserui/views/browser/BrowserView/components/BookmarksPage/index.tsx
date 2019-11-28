import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserSession } from '~/browserui/models/browser-session';

let currentSession: BrowserSession = null;

export const BookmarksPage = observer(({ visible }: { visible: boolean }) => {

    var pageStyle: any = {
        display: visible ? "block" : "none"
    }

    return (
      <div style={pageStyle}>Bookmarks</div>
    );
});