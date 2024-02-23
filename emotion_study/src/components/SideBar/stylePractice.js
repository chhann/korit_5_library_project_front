import { css } from "@emotion/react";

export const layout = (isShow) => css`
    box-sizing: border-box;
    position: fixed;
    right: 0;
    top: ${isShow ? "0px" : "-80px"};

    border-bottom: 1px solid #dbdbdb;
    width: 50%;
    height: 80px;

    z-index: 99;

    transition: top 0.5s ease-in-out;

    background-color: white;

    box-shadow: -1px 0px 3px #00000022;
`

export const toggleButton = css`
    box-sizing: border-box;

    position: absolute;
    transform: translateX(-50%);

    right: 30%;
    bottom: -15px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;
    border: 1px solid #dbdbdb;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;


    width: 50px;
    height: 15px;

    background-color: white;
    cursor: pointer;

    transition: 0.5s;

    &:hover {
        background-color: #eee;
        transition: 0.5;
    }
    &:active {
        background-color: #ccc;
    }
`;

export const menuList = css`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    
    
`;

export const menuItem = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;

    width: 200px;
    height: 50px;

    margin: 10px;
    color: black;
    font-weight: 600;

    text-decoration: none;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: #dbdbdb;
    }
`;