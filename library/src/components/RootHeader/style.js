import {css} from "@emotion/react";

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 10px;
    width: 100%;
    height: 50px;
`;

export const menuButton = css`
    box-sizing: border-box;
    border: none;
    padding: 10px;

    /* 뒷배경색 따라감 */
    background-color: transparent; 

    cursor: pointer;

    & > * {
        font-size: 16px;
    }
`;

export const acount = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 8px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    overflow: hidden;
    text-decoration: none;
    color: #222222;
    cursor: pointer;

`;