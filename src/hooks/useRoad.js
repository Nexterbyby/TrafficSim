import { useState } from "react";

const useRoad = initialValue => {
    const [road, setRoad] = useState(initialValue);

    const update = () => {
        road.applyRules();
        road.drive();
    }

    const consoleLog = () => {
        road.print_cars();
    }

    const newCar = (chance) => {
        road.newCar(chance)
    }

    return [road, setRoad, update, consoleLog, newCar];
}

export default useRoad;
