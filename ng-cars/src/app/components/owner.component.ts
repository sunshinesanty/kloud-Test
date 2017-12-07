import { Component, Input, OnInit } from '@angular/core';

import { IOwnerColor, IError } from '../../model/interfaces';
import { CarOwnersService } from '../../services/cars.service';

@Component({
    selector: 'app-cars-ownercolor',
    templateUrl: './owner.component.html'
})

export class OwnerColorComponent implements OnInit {
    @Input() brandName: string;
    owners: IOwnerColor[] = [];
    showError: IError;
    isLoading: Boolean = true;
    constructor(private _carService: CarOwnersService) { }

    ngOnInit() {
        this.showError = {
            show: false,
            message: '',
            onClose: this.hideError
        };
        this.loadOwners();
    }

    public hideError = () => {
        this.showError.message = '';
        this.showError.show = false;
    }

    loadOwners = async () => {
        this.isLoading = true;
        try {
            this.owners = await this._carService.getOwnersByCarBrand(this.brandName);
            this.owners = this.owners.filter((ownerColor) => ownerColor.name );
        } catch (error) {
            this.showError.message = 'Unable to get owner details. Please contact your administrator';
            this.showError.show = true;
        }
        this.isLoading = false;
    }
}
