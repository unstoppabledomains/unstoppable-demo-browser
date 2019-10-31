import { Menu, webContents, ipcMain, BrowserView } from 'electron';
import { ViewManager } from '~/electron/view-manager';


export const getMainMenu = (viewManager: ViewManager) => {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+T',
          label: 'New tab',
          click() {
            viewManager.window.webContents.send('api-tabs-create');
          },
        },
        {
          accelerator: 'CmdOrCtrl+W',
          label: 'Close tab',
          click() {
            viewManager.window.webContents.send('api-remove-tab', viewManager.selectedId);
          },
        },
        {
          label: 'Reload',
          visible: false,
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            viewManager.selected.webContents.reload();
          },
        },
        {
          accelerator: 'CmdOrCtrl+,',
          label: 'Settings',
          visible: true,
          click() {
            viewManager.window.webContents.send('open-settings');
          },
        },
        // {
        //   accelerator: 'CmdOrCtrl+F',
        //   label: 'Find in page',
        //   visible: true,
        //   click() {
        //     viewManager.window.webContents.send('find');
        //   },
        // },
        {
          accelerator: 'CmdOrCtrl+F4',
          label: 'Close tab',
          visible: false,
          click() {
            viewManager.window.webContents.send(
              'remove-tab',
              viewManager.selectedId,
            );
          },
        },
        {
          accelerator: 'CmdOrCtrl+Left',
          label: 'Go back',
          visible: false,
          click() {
            const selected = viewManager.selected;
            if (selected) {
              selected.webContents.goBack();
            }
          },
        },
        {
          accelerator: 'CmdOrCtrl+Right',
          label: 'Go forward',
          visible: false,
          click() {
            const selected = viewManager.selected;
            if (selected) {
              selected.webContents.goForward();
            }
          },
        },
        {
          accelerator: 'CmdOrCtrl+Shift+F12',
          label: 'Toggle developer tools (window)',
          visible: false,
          click() {
            setTimeout(() => {
              webContents
                .getFocusedWebContents()
                .openDevTools({ mode: 'detach' });
            });
          },
        },
        {
          accelerator: 'F12',
          label: 'Toggle developer tools (contents)',
          visible: false,
          click() {
            setTimeout(() => {
              viewManager.selected.webContents.openDevTools();
            });
          },
        },
        {
          accelerator: 'Ctrl+Shift+I',
          label: 'Toggle developer tools (contents)',
          visible: false,
          click() {
            setTimeout(() => {
              viewManager.selected.webContents.openDevTools();
            });
          },
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
          accelerator: 'CmdOrCtrl+Shift+Q',
        }
      ],
    },
    { role: 'editMenu' },
  ]);
};