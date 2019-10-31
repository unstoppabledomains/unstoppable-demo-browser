
import styled, { css } from 'styled-components';
import { icons } from '~/browserui/resources/constants';
import { centerIcon } from '~/browserui/mixins';

export const BrowserContainer = styled('div')`
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${({ visible }: {visible: boolean}) => visible ? 'flex' : 'none'}
  flex-direction:column;
`;

export const StyledApp = styled.div`
  margin: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  background: white;
`;

export const StyledFind = styled.div`
  border-radius: 30px;
  height: 40px;
  -webkit-app-region: no-drag;
  align-items: center;
  overflow: hidden;
  display: flex;
`;

export const SearchIcon = styled.div`
  min-width: 16px;
  height: 16px;
  ${centerIcon()};
  margin-left: 12px;
  opacity: 0.54;
  background-image: url(${icons.search});
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 13px;
  margin-right: 8px;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 8px;
`;

export const Button = styled.div`
  ${({ size, icon }: { size: number; icon: string }) => css`
    ${centerIcon(size)};
    background-image: url(${icon});
  `}
  width: 24px;
  height: 24px;
  opacity: 0.54;
  position: relative;
  &:after {
    background-color: rgba(0, 0, 0, 0.08);
    content: '';
    position: absolute;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: 0.2s opacity;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  margin-right: 8px;
`;

export const Occurrences = styled.div`
  opacity: 0.54;
  margin-right: 4px;
`;