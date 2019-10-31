import styled, { css } from 'styled-components';

import { icons } from '~/browserui/resources/constants';
import { centerIcon } from '~/browserui/mixins';

interface CloseProps {
  visible: boolean;
}

export const StyledClose = styled('div')`
  position: absolute;
  right: 6px;
  height: 24px;
  width: 24px;
  background-image: url('${icons.close}');
  transition: 0.1s opacity;
  z-index: 10;
  ${centerIcon(16)}
  &:hover {
    &:after {
      opacity: 1;
    }
  }
  &:after {
    content: '';
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.08);
    transition: 0.2s opacity;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
`;

interface TabProps {
  selected: boolean;
  visible?: boolean;
}

export const StyledTab = styled('div')`
  position: inline;
  height: 100%;
  width: 150px;
  margin-top: 0px;
  left: 0;
  align-items: center;
  will-change: width;
  margin-right: 3px;
  -webkit-app-region: no-drag;
  ${({ selected, visible }: TabProps) => css`
    z-index: ${selected ? 2 : 1};
    display: 'flex';
  `};
`;

export const StyledOverlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.1s opacity;
  background-color: rgba(0, 0, 0, 0.04);
  ${({ hovered }: { hovered: boolean }) => css`
    opacity: ${hovered ? 1 : 0};
  `};
`;

interface TitleProps {
  isIcon: boolean;
}

export const StyledTitle = styled('div')`
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.2s margin-left;
  margin-left: 8px;
  ${({ isIcon }: TitleProps) => css`
    margin-left: ${!isIcon ? 0 : 12}px;
  `};
`;

export const StyledIcon = styled('div')`
  height: 16px;
  min-width: 16px;
  transition: 0.2s opacity, 0.2s min-width;
  ${({ isIconSet }: { isIconSet: boolean }) => css`
    min-width: ${isIconSet ? 0 : 16},
    opacity: ${isIconSet ? 0 : 1};
  `};
`;

interface ContentProps {
  collapsed: boolean;
  pinned: boolean;
}

export const StyledContent = styled('div')`
  position: absolute;
  overflow: hidden;
  z-index: 2;
  align-items: center;
  display: flex;
  margin-left: 12px;
  ${({ collapsed, pinned }: ContentProps) => css`
    max-width: calc(100% - ${pinned ? 0 : collapsed ? 48 : 24}px);
  `};
`;

export const StyledBorder = styled('div')`
  position: absolute;
  width: 1px;
  height: 16px;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
  ${({ visible }: { visible: boolean }) => css`
    visibility: ${visible ? 'visible' : 'hidden'};
    background-color: green;
  `};
`;

interface TabContainerProps {
  pinned: boolean;
}

export const TabContainer = styled('div')`
  position: relative;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  backface-visibility: hidden;
`;