/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, { useState } from 'react';

const inputBox =css`
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 0px 10px;
    height: 100%;
    width: 100%;
`


function BookRegisterInput({ value, onChange, onkeyDown, bookref }) {
    

    return (
        <input 
            css={inputBox}
            type='text' 
            value={value}
            onChange={onChange}
            onKeyDown={onkeyDown}
            ref={bookref}
        />
    );
}

export default BookRegisterInput;