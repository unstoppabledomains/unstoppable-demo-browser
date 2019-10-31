import styled, { css } from 'styled-components';
import { centerIcon } from '~/browserui/mixins';

// Toolbar
export const TOOLBAR_HEIGHT = 38;
export const TOOLBAR_BUTTON_WIDTH = 36;

// Widths
export const WINDOWS_BUTTON_WIDTH = 45;
export const MENU_WIDTH = 300;
export const MENU_SPACE = 96;
export const MENU_CONTENT_MAX_WIDTH = 640;

// Workspaces
export const WORKSPACE_FOLDER_SIZE = 96;
export const WORKSPACE_ICON_SIZE = 16;
export const WORKSPACE_MAX_ICONS_COUNT = 9;

// Address bar
export const ADDRESS_BAR_HEIGHT = 30;



export const Icon = styled('div')`
  width: 100%;
  height: 100%;
  will-change: background-image;
  transition: 0.15s background-image;
  backface-visibility: hidden;
  ${({
    size,
    disabled,
    opacity,
    autoInvert,
  }: {
    size: number;
    disabled: boolean;
    opacity: number;
    autoInvert?: boolean;
  }) => css`
    ${centerIcon(size)};
    opacity: ${disabled ? 0.25 : opacity};
  `};
`;

export const Tooltip = styled('div')`
  display: inline;
  position: absolute;
  right: 108%;
  border-radius: 8px;
  padding: 8px;
  width: 110px;
  text-align: center;
  vertical-align: middle;
  top: 8px;
  background-color: rgba(0, 0, 0, 0.65);
  color: rgba(255, 255, 255, 1);
  font-size: 13px;
  pointer-events: none;
  visibility: hidden;
  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'visible' : 'none'};
  `};
  z-index: 3;
  ::after {
    content: " ";
    position: absolute;
    top: 40%;
    left: 100%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(0, 0, 0, 0.65);
  };
`

export const Button = styled('div')`
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  transition: 0.2s background-color;
  width: ${TOOLBAR_BUTTON_WIDTH}px;
  backface-visibility: hidden;
  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'inherit'};
    -webkit-app-region: ${disabled ? 'drag' : 'no-drag'};
  `};
  &:hover ${Tooltip} {
    visibility: visible;
  };
`;

export const Circle = styled('div')`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s background-color;
  :hover {
    background-color: rgba(125, 125, 125, 0.4);
  }
`;