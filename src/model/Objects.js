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
        this.populate();
        console.log("new Road();")
    }

    populate(){ // legit values
        let count = 0;
        let takenIndexes = [];
        for(let i = 0; i < this.car_count; i++){
            while(count < 10000000){
                let new_index = Math.floor(Math.random() * this.road_size); // does not return greater than 400.
                if(Math.ceil(Math.random() * 5) === 1 && !takenIndexes.includes(new_index)){
                    this.cars_on_road.push(new Car(new_index, this.v_road_max));
                    takenIndexes.push(new_index);
                    break;
                }
                count++;
            }
        }
        // sort for indexes on the road
        let tempRoad = [];
        for(let i = 0; i < this.cars_on_road.length; i++){
            let roadIndex = this.cars_on_road[0].index;
            let arrayIndex = 0;
            for(let j = 0; j < this.cars_on_road.length; j++){
                if(roadIndex > this.cars_on_road[j].index){
                    roadIndex = this.cars_on_road[j].index;
                    arrayIndex = j;
                }
            }
            tempRoad.push(this.cars_on_road[arrayIndex]);
            this.cars_on_road.splice(arrayIndex, 1);
        }
        this.cars_on_road = JSON.parse(JSON.stringify(tempRoad));
        // return this.cars_on_road;
    }

    iterate_rules(){
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
        for(let i = 0; i < this.cars_on_road.length; i++){
            let car = this.cars_on_road[i];
            car.index = car.index + car.velocity;
            if(car.index > this.road_size){
                this.cars_on_road.splice(i, 1);
            }
        }
    }

    print_cars(){
        for(let i = 0; i < this.cars_on_road.length; i++){
            console.log(i + ": ", this.cars_on_road[i].index, this.cars_on_road[i].velocity);
        }
        console.log("");
    }
}

export default Road;