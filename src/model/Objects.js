class Car {
    constructor(index, v_car_max){
        this.velocity = Math.ceil(Math.random() * v_car_max);
        this.index = index;
    }
}

class Road {
    constructor(car_count, v_road_max, p_road_dreaming, road_size){
        this.cars_on_road = [];
        this.car_count = car_count;
        this.v_road_max = v_road_max;
        this.p_road_dreaming = p_road_dreaming;
        this.road_size = road_size;
        this.carsInAvg10ItArr = Array.from({length: 10}, () => 0);
        this.carsOutAvg10ItArr = Array.from({length: 10}, () => 0);
        this.carsInAvg10ItNum = 0.0;
        this.carsOutAvg10ItNum = 0.0;
        this.populate();
    }

    populate(){

        // put cars on the road
        console.log(this.car_count, this.road_size)

        let availableIndexes = Array.from({length: this.road_size}, (v, i) => i) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, ..., n]

        for(let i = 0; i < this.car_count; i++){
            let newIndex = Math.floor(Math.random() * availableIndexes.length)
            this.cars_on_road.push(new Car(availableIndexes[newIndex], this.v_road_max))
            availableIndexes.splice(newIndex, 1)
        }

        console.log(this.cars_on_road)

        // sort for indexes on the road
        let tempRoad = []
        for (let i = 0; i < this.car_count; i++) {
            let minIndex = this.cars_on_road[0].index
            let minArrIndex = 0
            for (let j = 0; j < this.cars_on_road.length; j++){
                let currentIndex = this.cars_on_road[j].index
                if(currentIndex < minIndex){
                    minArrIndex = j
                    minIndex = currentIndex
                }
            }
            tempRoad.push(this.cars_on_road[minArrIndex])
            this.cars_on_road.splice(minArrIndex, 1)
        }
        this.cars_on_road = tempRoad
    }

    applyRules(){
        // Accelerate
        for(let i = 0; i < this.cars_on_road.length; i++){
            let car = this.cars_on_road[i];
            if(car.velocity < this.v_road_max){
                car.velocity++;
            }
        }
        // checks the breaking distance; last car has no one to break for.
        for(let i = 0; i < this.cars_on_road.length-1; i++){
            let currentCar = this.cars_on_road[i];
            let space = this.cars_on_road[i+1].index - currentCar.index - 1;
            if(currentCar.velocity > space){
                currentCar.velocity = space;
            }
        }
        // this debuffs drivers with sleep
        for(let i = 0; i < this.cars_on_road.length; i++){
            if (Math.random() < this.p_road_dreaming && this.cars_on_road[i].velocity !== 0){
                this.cars_on_road[i].velocity--;
            }
        }
    }

    drive(){
        this.#updateRunningAverage();
        for(let i = 0; i < this.cars_on_road.length; i++){
            let car = this.cars_on_road[i];
            car.index = car.index + car.velocity;
            if(car.index > this.road_size){
                this.cars_on_road.splice(i, 1);
                this.carsOutAvg10ItArr[0] = 1;
            }
        }
        this.#calculateRunningAverage()
    }

    print_cars(){
        for(let i = 0; i < this.cars_on_road.length; i++){
            console.log(i + ": ", this.cars_on_road[i].index, this.cars_on_road[i].velocity);
        }
        console.log("");
    }

    #updateRunningAverage = () => {
        let len = this.carsInAvg10ItArr.length
        for (let i = 0; i < len; i++) {
            if(i === 0) continue
            this.carsInAvg10ItArr[len - i] = this.carsInAvg10ItArr[len - i - 1]
        }
        len = this.carsOutAvg10ItArr.length
        for (let i = 0; i < len; i++) {
            if(i === 0) continue
            this.carsOutAvg10ItArr[len - i] = this.carsOutAvg10ItArr[len - i - 1]
        }
        this.carsInAvg10ItArr[0] = 0;
        this.carsOutAvg10ItArr[0] = 0;
    }

    #calculateRunningAverage = () => {
        let avgIn = 0;
        let avgOut = 0;
        for (let i = 0; i < this.carsInAvg10ItArr.length; i++) {
            avgIn += this.carsInAvg10ItArr[i];
        }
        for (let i = 0; i < this.carsOutAvg10ItArr.length; i++) {
            avgOut += this.carsOutAvg10ItArr[i];
        }
        console.log(this.carsOutAvg10ItArr)
        this.carsInAvg10ItNum = avgIn
        this.carsOutAvg10ItNum = avgOut
    }

    newCar = (chance) => {
        if (Math.random() < chance && this.cars_on_road[0].index !== 0){
            this.cars_on_road.unshift(new Car(0, this.v_road_max))
        }
    }
}

export default Road;