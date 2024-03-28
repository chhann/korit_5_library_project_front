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
    &:disabled {
        background-color: white;
    }
`


function BookRegisterInput({ value, onChange, onkeyDown, bookref, isDisabled}) {
    

    return (
        <input 
            css={inputBox}
            type='text' 
            value={value}
            onChange={onChange}
            onKeyDown={onkeyDown}
            ref={bookref}
            disabled={isDisabled}
        />
    );
}

export default BookRegisterInput;