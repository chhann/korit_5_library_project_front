import { useState } from "react";

export const useBookRegisterInput = (enterFn, ref) => {
    const [ value,  setValue ] = useState("");

    const handleOnChange = (e) => {
        if(!!e.target) {
            setValue(() => e.target.value);
        } else {
            setValue(() => e.value);
        }

    }

    const handleonkeyDown = (e) => {
        if(e.keyCode === 13) {
            enterFn(ref);
        }
    }



    return { value, handleOnChange, handleonkeyDown, setValue }
}