import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import useImage from "../hooks/useImage";
import useRoad from "../hooks/useRoad";
import Road from "../model/Objects";
import { cloneDeep } from "lodash";
import useHistory from "../hooks/useHistory";
import { useBetween } from "use-between";
import { useShareableState } from "../App.jsx"

const History = (props) => {

    /*
    Todo:
        - Picture base array cleanup. Limit size only to 1'500'000 elements, ...array takes about less than 100ms, maybe remove previous lines?
        - Check reason for cars wrapping back to start.
        - Check road.populate(); cars seem to appear only in the first half.
        - Why does the first line fail ImageData() throws error.
        - Show THROUGHPUT.
        - Make Button for continuously adding cars.
        - Make interval, retarded, maxSpeed on the fly adjustable.
        - OPTIMIZE (╯°□°）╯︵ ┻━┻
    */

    let { length, interval, speed, retarded, cars } = useBetween(useShareableState);

    const [iterationCounter, setIterationCounter] = useState(() => { return 0; }); // canvas is also zero
    const [road, setRoad, update, consoleLog] = useRoad(() => { return {}; });
    const [image, setImage, setHeightI, setWidthI] = useImage(() => { return {}; })
    const [history, setHistory, addCarsOnRoad] = useHistory(() => { return []; });
    const [pictureArrayBase, setPictureArrayBase] = useState(() => { return []; });
    const [isActive, setActive] = useState(false);
    
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
        // console.log(tempRoad, tempImage);
    }, [isActive]);

    useEffect(() => {
        console.log("useEffect");
        if(length !== "" && interval !== "" && speed !== "" && retarded !== "" && cars !== ""){
            setActive(true);
            console.log("Sim start.");
        }else{
            console.log("Sim halt.");
            setActive(false);
        }
    }, [length, interval, speed, retarded, cars])

    // useEffect(() => { 
    //     // const newObj = tempImage;  // make full copy, to ignore useEffect trigger. Do it here because async hell. // note to self: JSON doesn't copy functions.
    //     setImage(tempImage); // maybe point of failure?
    //     console.log("useEffect: tempImage");
    // }, [tempImage]);

    // useEffect(() => {
    //     const newObj = cloneDeep(tempRoad);
    //     setRoad(newObj);
    //     console.log("useEffect: tempRoad");
    // }, [tempRoad]);

    useInterval(() => {
        // update object
        update();
        addCarsOnRoad(road.cars_on_road);
        const a = Date.now();
        let temp = pictureArrayBase.concat(convertCarsOnRoadToPixels());
        setPictureArrayBase(temp); // existing base array must be capped as to negate performance penalties.
        const b = Date.now();
        console.log("Performance: ", (b - a), "ms", pictureArrayBase.length, " length");
        // increase height
        setIterationCounter(num => num + 1);
        let canvas = canvasRef.current;
        canvas.height = iterationCounter;
        setHeightI(iterationCounter);
        // draw the image
        drawImage();
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
        return temp;
    }
    //Get Element for Autoscroll
    var elem = document.getElementById('historyScroll');
    const drawImage = () => {
        pictureArrayBase.splice(length * iterationCounter * 4);
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

export default History;