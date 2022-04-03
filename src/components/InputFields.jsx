import React from 'react'
import { useState } from 'react';


function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

const InputFields = () => {
    const [speed, speedInput] = useInput({ type: "number" });
    const [length, lengthInput] = useInput({ type: "number" });
    const [cars, carsInput] = useInput({ type: "number" });
    const [retarded, retardedInput] = useInput({ type: "number" });
    const [interval, intervalInput] = useInput({ type: "number" });
    return (
        <div className='inputs'>
            <div>speedInput:    {speedInput} = {speed}</div>
            <div>lengthInput:   {lengthInput} = {length}</div>
            <div>carsInput:     {carsInput} = {cars}</div>
            <div>retardedInput: {retardedInput} = {retarded}</div>
            <div>intervalInput: {intervalInput} = {interval}</div>
        </div>
    )
}

export default InputFields