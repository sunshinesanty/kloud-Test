import { ICar } from '../model/interfaces';

export class CarData implements ICar {
    brand: string;
    colour: string;

    constructor(_carJsonData?: ICar) {
        if (_carJsonData) {
            this.updateFromJson(_carJsonData);
        }
    }

    get asJson(): ICar {
        const carAsJson: ICar = {
            brand: this.brand,
            colour: this.colour
        };
        return carAsJson;
    }

    updateFromJson = (carJson: ICar) => {
        this.brand = carJson.brand;
        this.colour = carJson.colour;   
    }
}
