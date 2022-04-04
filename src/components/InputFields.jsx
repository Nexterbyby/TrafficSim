import React from 'react'
import { useState } from 'react';
import { useBetween } from "use-between";
import { useShareableState } from "../App.jsx"


const InputFields = () => {
    const {speed, speedInput, length, lengthInput, cars, carsInput, retarded, retardedInput, interval, intervalInput } = useBetween(useShareableState);
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