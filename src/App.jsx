import './App.css';
import InputFields from './components/InputFields';
import { useState } from 'react';

export const useShareableState = () => {
  const [speed, speedInput] = useInput({ type: "number" });
  const [length, lengthInput] = useInput({ type: "number" });
  const [cars, carsInput] = useInput({ type: "number" });
  const [retarded, retardedInput] = useInput({ type: "number" });
  const [interval, intervalInput] = useInput({ type: "number" });
  return {
      speed, speedInput, length, lengthInput, cars, carsInput, retarded, retardedInput, interval, intervalInput
  }
}

function useInput({ type }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}


function App() {
  return (
    <div className="App">
        <div className='header'></div>
        <InputFields/>
    </div>
  );
}

export default App;
