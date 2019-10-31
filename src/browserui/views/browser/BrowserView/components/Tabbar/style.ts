import styled from 'styled-components';
import { ToolbarButton } from '../ToolbarButton';
import { platform } from 'os';

export const TOOLBAR_HEIGHT = 38;

export const StyledTabbar = styled('div')`
  height: 38px;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: 0.3s opacity, 0.3s transform;
  margin-left: 8px;
  align-items: center;
  display: flex;
  margin-left: ${platform() === 'darwin' ? 90 : 0}px;
`;

export const TabsContainer = styled('div')`
  height: 100%;
  position: relative;
  padding-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const AddTab = styled(ToolbarButton)`
  position: inline;
  margin-top: 1px;
  left: 0;
  top: 0;
`;