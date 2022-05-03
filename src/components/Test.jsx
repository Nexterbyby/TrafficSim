import React from 'react'
import { useBetween } from "use-between";
import { useShareableState } from "../App.jsx"
import '../App.css';

const Test = () => {
    const {speed} = useBetween(useShareableState);
  return (
    <h1 className="testSharable">{speed}</h1>
  )
}

export default Test