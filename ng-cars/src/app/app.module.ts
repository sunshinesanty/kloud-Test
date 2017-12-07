import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {
  ErrorComponent, LoadingComponent,
  OwnerColorComponent, BrandComponent
} from './components';
import { CarOwnersService } from '../services/cars.service';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    OwnerColorComponent,
    BrandComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: CarOwnersService, useClass: CarOwnersService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
