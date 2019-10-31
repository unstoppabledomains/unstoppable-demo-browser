import styled, { css } from 'styled-components';
import { platform } from 'os';

export const StyledToolbar = styled('div')`
  position: relative;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 34px;
  background-color: #eeeeee;
`;

export const Buttons = styled('div')`
  display: flex;
  align-items: center;
`;

export const Separator = styled('div')`
  height: 16px;
  width: 1px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const Handle = styled('div')`
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 0px;
`;