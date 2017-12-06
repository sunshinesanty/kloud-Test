import { Injectable } from '@angular/core';

import { ICarOwner } from '../model/interfaces';
import { CarOwnerData } from '../model/carOwnerData';
import config from '../common/config';
import CarsIO from '../api/fetchData';

@Injectable()

export class CarOwnersService  {
    public getCars = async (): Promise<CarOwnerData[]> => {
        const carOwners: ICarOwner[] = await CarsIO.getData<ICarOwner[]>(config.apiEndpoints.cars);
        return new Promise<CarOwnerData[]>((resolve, reject) => {
            const carOwnersCollection = carOwners.map((owner) => new CarOwnerData(owner));
            resolve(carOwnersCollection);
        });
    }
}
