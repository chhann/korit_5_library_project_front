import {css} from "@emotion/react";

export const searchBar = css`
    box-sizing: border-box;
    display: flex;
    margin: 5px 0px ;
    border: 1px solid #dbdbdb;
`;

export const searchInput = css`
    flex-grow: 1;
    border: none;
    border-left: 1px solid #dbdbdb;
    outline: none;
    padding: 10px;
    background-color: #fdfdfd;
    box-shadow: inset 0px 0px 3px #00000011;
`;

export const searchButton = css`
    box-sizing: border-box;
    border: none;
    border-left: 1px solid #dbdbdb;
    background-color: white;
    width: 60px;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eeeeee;
    }

`;

export const tableLayout = css`
    position: relative;
    border: 1px solid #dbdbdb;
    height: 160px;
    background-color: white;
    overflow: auto;

    &::-webkit-scrollbar{
        box-sizing: border-box;
        border: 1px solid #ffffff;
        width: 10px;
        height: 10px;
        background-color: #fdfdfd;
    }
    &::-webkit-scrollbar-thumb {
        box-sizing: border-box;
        border: 1px solid #fdfdfd;
        background-color: #dbdbdb;
    }
`;

export const table = css`
    border-collapse: collapse;
    width: max-content;
    & td, th {
        border: 1px solid #dbdbdb;
    }    
    & th {
        border-top: none;
    }
    & tr > td:nth-of-type(1),
    & tr > th:nth-of-type(1) {
        border-left: none;
    }
    & tr > td:nth-last-of-type(1),
    & tr > th:nth-last-of-type(1) {
        border-right: none;
    }
    & tr > th:nth-of-type(1),
    & tr > td:nth-of-type(1) {
        text-align: center;
        width: 30px;
    }
    & tr > th:nth-of-type(2),
    & tr > td:nth-of-type(2) {
        width: 80px;
    }
    & tr > th:nth-of-type(3),
    & tr > td:nth-of-type(3) {
        width: 250px;
    }
    & tr > th:nth-of-type(4),
    & tr > td:nth-of-type(4) {
        width: 150px;
    }
    & tr > th:nth-of-type(5),
    & tr > td:nth-of-type(5) {
        width: 150px;
    }
    & tr > th:nth-of-type(6),
    & tr > td:nth-of-type(6) {
        width: 150px;
    }
    & tr > th:nth-of-type(7),
    & tr > td:nth-of-type(7) {
        width: 100px;
    }
    & tr > th:nth-of-type(8),
    & tr > td:nth-of-type(8) {
        width: 80px;
    }



`
export const theadTr =css`
    position: sticky;
    top: 0;
    background-color: #fafafa;
`