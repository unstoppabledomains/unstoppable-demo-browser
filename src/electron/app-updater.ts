import { autoUpdater } from 'electron-updater';
import { BrowserWindow, ipcMain } from 'electron';

export class AppUpdater {
    private _windowRef: BrowserWindow;

    constructor(browser: BrowserWindow) {
        this._windowRef = browser;

        ipcMain.on('update-reaquested', () => {
            console.log("Do the update");
            autoUpdater.quitAndInstall();
        });

        autoUpdater.on('error', (error) => {
            console.log('error: ' + error);
        });

        autoUpdater.on('checking-for-update', () => {
            console.log('checking-for-update...');
        });

        autoUpdater.on('update-available', () => {
            console.log('[update-available]');
        });

        autoUpdater.on('update-not-available', (info) => {
            console.log('[update-not-available]');
        });

        autoUpdater.on('download-progress', (progress, bytesPerSecond, percent, total, transferred) => {
            console.log('download-progress: ' + progress.transferred + "/" + progress.total);
        });

        autoUpdater.on('update-downloaded', (info) => {
            console.log('[update-downloaded][version][' + info.version + ']');
            //Inform the UI to display an update button.
            console.log("Sending update available message");
            this._windowRef.webContents.send('update-available');
            
            // autoUpdater.quitAndInstall();
        });
    }

    public checkForUpdates(autoDownload: boolean) {
        console.log('checkForUpdates() called');
        autoUpdater.autoDownload = autoDownload;
        autoUpdater.autoInstallOnAppQuit = false;
        autoUpdater.checkForUpdates();
    }

}