import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import useImage from "../hooks/useImage";
import useRoad from "../hooks/useRoad";
import Road from "../model/Objects";
import useHistory from "../hooks/useHistory";
import { useBetween } from "use-between";
import { useShareableState } from "../App.jsx"


const History = (props) => {

    /*
    Todo:
        - Picture base array cleanup. Limit size only to 1'500'000 elements, ...array takes about less than 100ms, maybe remove previous lines?
        - Show THROUGHPUT.
        - Make interval, retarded, maxSpeed on the fly adjustable.
        - OPTIMIZE (╯°□°）╯︵ ┻━┻
    */

    let { length, interval, speed, retarded, cars, newCarChance } = useBetween(useShareableState);

    const [iterationCounter, setIterationCounter] = useState(() => { return 0; }); // canvas is also zero
    const [road, setRoad, update, consoleLog, newCar] = useRoad(() => { return {}; });
    const [image, setImage, setHeightI, setWidthI] = useImage(() => { return {}; })
    const [history, setHistory, addCarsOnRoad] = useHistory(() => { return []; });
    const [pictureArrayBase, setPictureArrayBase] = useState(() => { return []; });
    const [isActive, setActive] = useState(false);
    const [insertNewCarCance, setInsertNewCarCance] = useState(() => { return 0; });
    
    const canvasRef = useRef(() => { return null; });
    const ctxRef = useRef(() => { return null; });

    let tempImage;
    let tempRoad; 


    useEffect(() => {
        if (!isActive) {
            return;
        }
        // reset states
        setIterationCounter(0);

        // generate obects
        setRoad(new Road(cars, speed, retarded, length));
        setImage(new Image(length, iterationCounter));

        // get the canvas object
        const canvas = canvasRef.current;
        canvas.width = length;
        canvas.height = iterationCounter;

        // get context and functions
        ctxRef.current = canvas.getContext("2d");

        // do settings
        setInsertNewCarCance(newCarChance)
    }, [isActive]);

    useEffect(() => {
        console.log("useEffect");
        if(length !== "" && interval !== "" && speed !== "" && retarded !== "" && cars !== ""){
            setActive(true);
        }else{
            setActive(false);
        }
    }, [length, interval, speed, retarded, cars])

    useInterval(() => {
        // update object
        update();
        addCarsOnRoad(road.cars_on_road);
        let temp = pictureArrayBase.concat(convertCarsOnRoadToPixels());
        setPictureArrayBase(temp); // existing base array must be capped as to negate performance penalties.
        // increase height
        setIterationCounter(num => num + 1);
        let canvas = canvasRef.current;
        canvas.height = iterationCounter;
        setHeightI(iterationCounter);
        // draw the image
        drawImage();
        newCar(insertNewCarCance); // inserts sometimes a new car after a round
        props.avgFunc(road.carsOutAvg10ItNum)
    }, isActive ? interval : null);


    const convertCarsOnRoadToPixels = () => {
        let temp = Array.from({length: length * 4}, () => 0); // ceate array with lots of 0s
        history[iterationCounter].forEach(car => {
            let tempIndex = car.index * 4;
            if(car.velocity === 0){
                temp[tempIndex] = 255; // red
                temp[tempIndex + 3] = 255; // opacity
            }else{
                temp[tempIndex + 1] = 255; // green
                temp[tempIndex + 3] = 255; // opacity
            }
        })
        temp.splice(length * 4);
        return temp;
    }
    // Get Element for Autoscroll
    let elem = document.getElementById('historyScroll');
    const drawImage = () => {
        let clampedArray = Uint8ClampedArray.from(pictureArrayBase); // turns simple mutable array into an array which can be used.
        try{
            let imageData = new ImageData(clampedArray, length, iterationCounter);
            ctxRef.current.putImageData(imageData, 0, 0);
            elem.scrollTop = elem.scrollHeight;
        }catch (Error){
            console.log("failed");
        }
    }
    
    return(
        <div className="history">
            <canvas id="pain" ref={canvasRef}></canvas>
        </div>
    );
}

export const useRoad1 = () => {
    const road = useRoad(() => { return {}; });
    return road;
}


export default History;
