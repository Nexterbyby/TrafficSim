import { useState } from "react";

const useRoad = initialValue => {
    const [road, setRoad] = useState(initialValue);

    const update = () => {
        road.iterate_rules();
        road.drive();
    }

    const consoleLog = () => {
        road.print_cars();
    }

    return [road, setRoad, update, consoleLog];
}

export default useRoad;
