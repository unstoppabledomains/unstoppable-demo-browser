import styled, { css } from 'styled-components';

import { icons, transparency } from '~/browserui/resources/constants';
import { centerIcon } from '~/browserui/mixins';
import { platform } from 'os';

export const StyledSearchBar = styled('div')`
  position: relative;
  z-index: 100;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  
`;

export const StyledSearchBox = styled('div')`
  margin-top: 5px;
  z-index: 2;
  border-radius: 23px;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  flex-flow: column;
  flex: 1;
  min-height: 28px;
  transition: 0.2s height;
  position: relative;
  background-color: #eeeeee;
`;

export const SearchIcon = styled('div')`
  ${centerIcon()};
  background-image: url(${icons.search});
  height: 16px;
  min-width: 16px;
  margin-left: 10px;
`;

export const Form = styled('form')`
  width: 100%;
  flex: 1
`

export const Input = styled('input')`
  height: 100%;
  flex: 1;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 16px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 28px;
  height: 28px;
`;
