import { ICarOwner } from '../model/interfaces';
import { CarData } from './carData';

export class CarOwnerData implements ICarOwner {
    name: string;
    cars: CarData[];

    constructor(_carOwnerJsonData?: ICarOwner) {
        if (_carOwnerJsonData) {
            this.updateFromJson(_carOwnerJsonData);
        }
    }

    get asJson(): ICarOwner {
        const carOwnerAsJson: ICarOwner = {
            cars: this.cars,
            name: this.name
        };
        return carOwnerAsJson;
    }

    updateFromJson = (carOwnerJson: ICarOwner) => {
        this.name = carOwnerJson.name;
        if (carOwnerJson.cars) {
            this.cars = carOwnerJson.cars.map((carJsonData) => new CarData(carJsonData));
        }
    }
}
