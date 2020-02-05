import styled, {css} from "styled-components";

import {icons, transparency} from "~/browserui/resources/constants";
import {centerIcon} from "~/browserui/mixins";

export const StyledSearchBar = styled("div")`
  position: relative;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  flex-flow: row;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 46px;
  min-height: 46px;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
  // border-top: 1px solid #dddddd;
  padding-left: 8px;
  padding-right: 8px;
`;

export const StyledSearchBox = styled("div")`
  margin-top: 5px;
  z-index: 2;
  border-radius: 50px;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  flex-flow: column;
  flex: 1;
  height: 30px;
  transition: 0.2s height;
  position: relative;
  background-color: #eeeeee;
  margin-left: 8px;
  margin-right: 8px;
`;

export const SearchIcon = styled("div")`
  ${centerIcon()};
  background-image: url(${icons.search});
  height: 16px;
  min-width: 16px;
  margin-left: 10px;
`;

export const Form = styled("form")`
  width: 100%;
  flex: 1;
`;

export const Input = styled("input")`
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
  height: 30px;
`;
