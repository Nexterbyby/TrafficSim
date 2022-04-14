import './App.css';
import InputFields from './components/InputFields';
import Test from './components/Test'
import History from './components/History';
import { useState } from 'react';

export const useShareableState = () => {
  const [speed, speedInput] = useInput({ type: "number", name: "speed" });
  const [length, lengthInput] = useInput({ type: "number", name: "length" });
  const [cars, carsInput] = useInput({ type: "number", name: "cars" });
  const [retarded, retardedInput] = useInput({ type: "number", name: "retarded" });
  const [interval, intervalInput] = useInput({ type: "number", name: "interval" });
  return {
    speed, speedInput, length, lengthInput, cars, carsInput, retarded, retardedInput, interval, intervalInput
  }
}

function useInput({ type, name }) {
  const [value, setValue] = useState("");
  const input = <input className="inputfield" id={name} placeholder={name.charAt(0).toUpperCase() + name.slice(1)} value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}


function App() {
  return (
    <div className="App">
      <div className='header'>
        <h1 className='title'>Traffic Simulator</h1>
        <h2 className='subtitle'>Nagel-Schreckenberg-Model</h2>
        {/* <Test /> */}
      </div>
      <div className="history2">
        <History />
      </div>
      <div className="footer">
        <InputFields />
      </div>
    </div>
  );
}

export default App;
