import { useState } from "react";

export const useReactSelect = (defalutValue) => {
    const [ option, setOption ] = useState(defalutValue);

    const handleOnChange = (option) => {
        setOption(() => option);
    }

    return { option, setOption, handleOnChange, defalutValue };


}