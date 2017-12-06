import { Component, OnInit } from '@angular/core';

import { CarOwnerData } from '../model/carOwnerData';
import { CarOwnersService } from '../services/cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Car Owners';
  carOwners: CarOwnerData[] = [];
  constructor(private _carService: CarOwnersService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars = async () => {
    this.carOwners = await this._carService.getCars();
  }
}
