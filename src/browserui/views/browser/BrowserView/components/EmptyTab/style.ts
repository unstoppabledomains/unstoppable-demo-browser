import styled from 'styled-components';
import { icons, transparency } from '~/browserui/resources/constants';
import { centerIcon } from '~/browserui/mixins';

export const EmptyTabContainer = styled('div')`
    background-color: red;
`;

export const Container = styled('div')`
    display: inline-block;
    position: relative;
    padding: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const Input = styled('input')`
    border: none;
    width: 80%;
    outline: none;
    font-size: 14px;
    line-height: 20px;
`;

export const SearchBar = styled('div')`
    border: 1px solid rgba(33,33,33,.2);
    border-radius: 30px;
    padding: 15px;
    height: 20px;
    width: 650px;
    :hover{
        box-shadow: 0 0 5px rgba(33,33,33,.2); 
    }
    :focus-within{
        box-shadow: 0 0 5px rgba(33,33,33,.2);
    }
`;

export const SearchIcon = styled('div')`
    ${centerIcon()};
    background-image: url(${icons.search});
    height: 24px;
    min-width: 22px;
    margin: auto;
    float: left;
    margin-left: 10px;
    margin-right: 10px;
    line-height: 20px;
`;

export const BookMarkArea = styled('div')`
    box-sizing: border-box;
    width: 550px;
    height: 250px;
    margin: 0 auto;
    margin-top: 70px;
    margin-bottom: 70px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

export const BookMarkButtonBox1 = styled('div')`
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    :hover{
        box-shadow: 0 0 5px rgba(33,33,33,.2); 
        background-color: #eeeeee;
        cursor: pointer;
    };
;
`;

export const BookMarkButton1 = styled('div')`
    border-radius: 1px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
    margin: auto;
    margin-bottom: 10px;

`;

export const TextLabel1 = styled('div')`
    font-size: 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    user-select: none;

`;
