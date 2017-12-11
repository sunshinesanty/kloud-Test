import { ICarOwner, IOwnerColor } from '../model/interfaces';
import { CarOwnerData } from '../model/carOwnerData';
import config from '../common/config';
import CarsIO from '../api/fetchData';

export class CarOwnersService {
    _carOwners: CarOwnerData[] = [];

    public getCarOwners = async (): Promise<CarOwnerData[]> => {
        if (this._carOwners.length <= 0) {
            this._carOwners = await this._getDataFromServer();
        }
        return new Promise<CarOwnerData[]>((resolve, reject) => { resolve(this._carOwners); });
    }

    public getOwnersByCarBrand = async (carBrand: string, sortBy: string = 'colour'): Promise<IOwnerColor[]> => {
        if (this._carOwners.length <= 0) {
            this._carOwners = await this._getDataFromServer();
        }
        const ownersForThisBrand = this._carOwners.filter((carOwner) => {
            return carOwner.cars.findIndex((car) => {
                return car.brand === carBrand;
            }) > -1;
        });

        const brndOwnersWithCarColor = ownersForThisBrand.map<IOwnerColor>((cOwner) => {
            const colorForCar = cOwner.cars.filter((c) => c.brand === carBrand);
            return {
                name: cOwner.name,
                colour: colorForCar.length > 0 ? colorForCar[0].colour : ''
            };
        });
        return new Promise<IOwnerColor[]>((resolve, reject) => {
            resolve(brndOwnersWithCarColor.sort((ownerColorA, ownerColorB) => {
                if (ownerColorA.colour < ownerColorB.colour) {
                    return -1;
                }
                if (ownerColorA.colour > ownerColorB.colour) {
                    return 1;
                }
                return 0;
            }));
        });
    }

    public getCarBrands = async (sortDir: string = 'asc'): Promise<string[]> => {
        const cars: string[] = [];
        if (this._carOwners.length <= 0) {
            this._carOwners = await this._getDataFromServer();
        }
        this._carOwners.forEach((carOwner, idx) => {
            carOwner.cars.forEach((car) => {
                cars.push(car.brand);
            });
        });
        const uniqueValues = cars
            .filter((car, idx, _array) => _array.indexOf(car) === idx)
            .sort((carA, carB) => {
                if (carA < carB) {
                    return -1;
                }
                if (carA > carB) {
                    return 1;
                }
                return 0;
            });
        return new Promise<string[]>((resolve, reject) => { resolve(uniqueValues); });
    }

    private _getDataFromServer = async (): Promise<CarOwnerData[]> => {
        try {
            if (this._carOwners.length <= 0) {
                const carOwners: ICarOwner[] = await CarsIO.getData<ICarOwner[]>(config.apiEndpoints.cars);
                return new Promise<CarOwnerData[]>((resolve, reject) => {
                    this._carOwners = carOwners.map((owner) => new CarOwnerData(owner));
                    resolve(this._carOwners);
                });
            } else {
                return new Promise<CarOwnerData[]>((resolve, reject) => { resolve([]); });
            }
        } catch (error) {
            return new Promise<any>((resovle, reject) => { reject(error); });
        }
    }
}

export default new CarOwnersService();