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
  line-height: 3;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 1.3em;
  font-weight: bold;
`;

export const Header1 = styled('div')`
  margin-bottom: 10px;
  border-bottom: 1px solid #b5a5a5;
  line-height: 3;
  background-color: none;
`;

export const Box2 = styled('div')`
  box-sizing: border-box;
  line-height: 2;
  padding-left: 30px;
  width: 100%;
  font-size: 1em;
  padding-bottom:12px;
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
    line-height: 2;
    :hover{
      border: 3px solid #888888;
      background-color: #DDDDDD;
    }
  `;

export const RadioButton = styled('input')`
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
