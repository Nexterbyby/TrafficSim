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
            <label className='labels' for='speed'>Speed             {/*  = {speed}    */}</label>
            </div>
            <div className='inputs'>
            {lengthInput}
            <label className='labels' for='length'>Length   {/*  = {length}   */}</label>
            </div>
            <div className='inputs'>
            {carsInput}
            <label className='labels' for='cars'>Cars        {/*  = {cars}     */}</label>
            </div>
            <div className='inputs'>
            {retardedInput}
            <label className='labels' for='retarded'>Distracted{/*  = {retarded} */}</label>
            </div>
            <div className='inputs'>
                {newCarChanceInput}
                <label className='labels' htmlFor='retarded'>Chance of new Car{/*  = {newCarChance} */}</label>
            </div>
            <div className='inputs'>
            {intervalInput}
            <label className='labels' for='interval'>Interval{/*  = {interval} */}</label>
            </div>
        </div>
    )
}

export default InputFields