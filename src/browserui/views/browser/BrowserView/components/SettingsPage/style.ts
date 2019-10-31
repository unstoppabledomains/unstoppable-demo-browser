import styled, { css } from 'styled-components';

export const SettingsHeader = styled('div')`
  box-sizing: border-box;
  background-color: #3367d6;
  color: white;
  width: 100%;
  height: 60px;
  font-size: 1.5em;
  line-height: 60px;
  padding-left: 10%;
  padding-right: 10%;
`;

export const Box1 = styled('div')`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10%;
  margin-right: 10%;
`;

export const Header1 = styled('div')`
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 1.3em;
  font-weight: bold;
  border-bottom: 1px solid #b5a5a5;
  background-color: none;
`;

export const Box2 = styled('div')`
  box-sizing: border-box;
  padding-left: 30px;
  width: 100%;
  font-size: 1em;
  background-color: none;
`;


export const LearnMoreButton = styled('div')`
    display: inline-block;
    user-select: none;
    border: 3px solid #0000004a;
    border-radius: 9px;
    width: 88px;
    position: relative;
    cursor: pointer;
    float: right;
    font-size: 14px;
    font-weight: normal;
    padding-left: 12px;
    :hover{
      border: 3px solid #888888;
      background-color: #DDDDDD;
    }
  `;

export const RadioButton = styled('input')`
    margin-right: 10px;  
`;

export const CheckBox = styled('input')`
    margin-right: 10px;
`;

export const OptionLabel = styled('span')`
  font-weight: bold;
  font-size: 15px;
`;

export const OptionLabel2 = styled('span')`
  font-size: 15px;
  font-weight: normal;
`; 
export const Topic1 = styled('div')`
  margin-left: 26px;
  
`;

export const OptionRow = styled('div')`
    padding-top: 6px;
    padding-bottom: 6px;
`