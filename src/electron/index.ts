import { app, BrowserWindow } from 'electron';
import Main from './main';

app.setName("Unstoppable Demo Browser");

Main.main(app, BrowserWindow);