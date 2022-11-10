import './App.css';
import InputFields from './components/InputFields';
import History from './components/History';
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import Road from './model/Objects';



export const useShareableState = () => {
  const [speed, speedInput] = useInput({ type: "number", name: "speed" });
  const [length, lengthInput] = useInput({ type: "number", name: "length" });
  const [cars, carsInput] = useInput({ type: "number", name: "cars" });
  const [retarded, retardedInput] = useInput({ type: "number", name: "retarded" });
  const [interval, intervalInput] = useInput({ type: "number", name: "interval" });
  const [newCarChance, newCarChanceInput] = useInput({ type: "number", name: "newCarChance" });
  return {
    speed, speedInput, length, lengthInput, cars, carsInput, retarded, retardedInput, interval, intervalInput, newCarChance, newCarChanceInput
  }
}

const queryStr = window.location.search;
const usp = new URLSearchParams(queryStr);


function useInput({ type, name }) {
  const [value, setValue] = useState("");
  function setQuery(e) {
    setValue(e.target.value)
    usp.set(e.target.id, e.target.value);
	  window.history.pushState("", "", "?"+ usp.toString());
  }
  const input = <input className="inputfield" id={name} placeholder={name.charAt(0).toUpperCase() + name.slice(1)} value={value} onChange={setQuery} type={type} />;
  return [value, input];
}
  


function App() {
  const [avg, setAvg] = useState(0); 
  
  return (
    <div className="App">
      <div className='header'>
        <h1 className='title'>Traffic Simulator</h1>
        <h2 className='subtitle'>Nagel-Schreckenberg-Model</h2>
        <h3 className='throughput'>Throughput per 10 Interval: {avg}</h3>


      </div>
      <div id='historyScroll' className="history2">
        <History avgFunc={setAvg} />
      </div>
      <div className="footer">
        <InputFields />
      </div>
    </div>
  );
}

export default App;
