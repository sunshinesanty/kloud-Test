import { Component, OnInit } from '@angular/core';

import { CarOwnerData } from '../model/carOwnerData';
import { IError } from '../model/interfaces';
import { CarOwnersService } from '../services/cars.service';
import { fail } from 'assert';

@Component({
  selector: 'app-cars',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Car & Owners';
  carBrands: string[] = [];
  isLoading: Boolean = true;
  showError: IError;
  constructor(private _carService: CarOwnersService) { }

  ngOnInit() {
    this.showError = {
      message: '',
      show: false,
      onClose: this.hideError
    };
    this.loadCars();
  }

  loadCars = async () => {
    this.isLoading = true;
    try {
      this.carBrands = await this._carService.getCarBrands();
    } catch (error) {
      this.showError.message = `Unable to read cars data. Please contact your Aadministrator`;
      this.showError.show = true;
    }
    this.isLoading = false;
  }

  public getOwnersForBrand = async (brandName: string) => {
    return await this._carService.getOwnersByCarBrand(brandName);
  }

  public hideError = () => {
    this.showError.message = '';
    this.showError.show = false;
  }
}
