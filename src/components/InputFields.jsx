import React from 'react'
import { useState } from 'react';
import { useBetween } from "use-between";
import { useShareableState } from "../App.jsx"


const InputFields = () => {
    const { speedInput,  lengthInput,  carsInput,  retardedInput,  intervalInput, newCarChanceInput } = useBetween(useShareableState);
    return (
        <div className='input-container'>
            <div className='inputs'>
            {speedInput}
            <label className='labels' for='speed'>Max speed of cars in pixel per interval</label>
            </div>
            <div className='inputs'>
            {lengthInput}
            <label className='labels' for='length'>Road length in pixel</label>
            </div>
            <div className='inputs'>
            {carsInput}
            <label className='labels' for='cars'>Amount of cars on road</label>
            </div>
            <div className='inputs'>
            {retardedInput}
            <label className='labels' for='retarded'>Chance of distracted drivers (1 = 100%)</label>
            </div>
            <div className='inputs'>
                {newCarChanceInput}
                <label className='labels' htmlFor='newCarChance'>Chance of new Car (1 = 100%)</label>
            </div>
            <div className='inputs'>
            {intervalInput}
            <label className='labels' for='interval'>Output interval</label>
            </div>
        </div>
    )
}

export default InputFields