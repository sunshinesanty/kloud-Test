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
  title = 'Cars & Owners';
  isLoading: Boolean = true;
  showError: IError;
  constructor(private _carService: CarOwnersService) { }

  ngOnInit() {
    this.showError = {
      message: '',
      show: false,
      onClose: this.hideError
    };
  }

  public setError = (error: { message: string, show: boolean }) => {
    this.showError.message = error.message;
    this.showError.show = error.show;
  }

  public setLoading = (loadStatus: boolean) => {
    this.isLoading = loadStatus;
  }

  public hideError = () => {
    this.showError.message = '';
    this.showError.show = false;
  }
}
