import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserView } from "~/browserui/views/browser/BrowserView";
import browserSession, { BrowserSession } from "~/browserui/models/browser-session";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { ipcRenderer } from 'electron';

const { dialog } = require('electron').remote;
var fs = require('fs');

browserSession.visible = true;

const TopBar = styled('div') `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  -webkit-app-region: drag;
`

ReactDOM.render(
  <div>
    <TopBar />
    <BrowserView browserSession={browserSession} />
  </div>,
  document.getElementById("app")
);


