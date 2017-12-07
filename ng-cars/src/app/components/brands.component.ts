import { Component, Input, OnInit } from '@angular/core';

import { CarOwnerData } from '../../model/carOwnerData';
import { IError, IOwnerColor } from '../../model/interfaces';
import { CarOwnersService } from '../../services/cars.service';

@Component({
    selector: 'app-cars-brand',
    templateUrl: './brands.component.html'
})

export class BrandComponent implements OnInit {
    @Input() setError: (error: { message: string, show: boolean }) => void;
    @Input() setLoading: (isLoading: boolean) => void;
    carBrands: string[] = [];
    constructor(private _carService: CarOwnersService) { }

    ngOnInit() {
        this.loadCars();
    }

    loadCars = async () => {
        this.setLoading(true);
        try {
            this.carBrands = await this._carService.getCarBrands();
        } catch (error) {
            this.setError({
                message: `Unable to read cars data. Please contact your Aadministrator`,
                show: true
            });
        }
        this.setLoading(false);
    }

    public getOwnersForBrand = async (brandName: string): Promise<IOwnerColor[]> => {
        try {
            return await this._carService.getOwnersByCarBrand(brandName);
        } catch (error) {
            this.setError({
                message: `Unable to read cars data. Please contact your Aadministrator`,
                show: true
            });
        }
    }
}
