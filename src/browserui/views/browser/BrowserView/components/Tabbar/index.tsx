import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ipcRenderer } from 'electron';
import { remote } from 'electron';

import { icons } from '~/browserui/resources/constants';

import { AddTab, StyledTabbar, TabsContainer, TOOLBAR_HEIGHT } from './style';

import Tab from '../Tab';
import { BrowserSession } from '~/browserui/models/browser-session';

import { platform } from 'os';
import { WindowsControls } from 'react-windows-controls';
import { isAbsolute } from 'path';

const onCloseClick = () => ipcRenderer.send(`window-close`);

const onMaximizeClick = () => {
  ipcRenderer.send(`window-toggle-maximize`);
}

const onMinimizeClick = () =>
  ipcRenderer.send(`window-minimize`);

export const Tabbar = observer(({ browserSession }: { browserSession: BrowserSession }) => {
  return (
    <StyledTabbar>
      <TabsContainer>
        {browserSession.tabs.map(item => (
          <Tab key={item.viewId} tab={item} browserSession={browserSession} />
        ))}
      </TabsContainer>
      <AddTab icon={icons.add} onClick={() => browserSession.addTab("https://google.com")} />

      {platform() !== 'darwin' && (
        <WindowsControls
          style={{
            position: 'absolute',
            right: '0px',
            height: TOOLBAR_HEIGHT,
            WebkitAppRegion: 'no-drag',
          }}
          isMaximized={remote.getCurrentWindow().isMaximized()}
          onClose={onCloseClick}
          onMinimize={onMinimizeClick}
          onMaximize={onMaximizeClick}
        />
      )}
    </StyledTabbar>
  );
});