import { useState } from "react";

const useHistory = (initialState) => {
    const [history, setHistory] = useState(initialState);


    const addCarsOnRoad = (carsOnRoadArray) => {
        history.push([...carsOnRoadArray]); // does statechange happen? Does it render?
    }

    return [history, setHistory, addCarsOnRoad];
}

export default useHistory;