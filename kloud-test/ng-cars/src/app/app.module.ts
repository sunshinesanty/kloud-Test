import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CarOwnersService } from '../services/cars.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: CarOwnersService, useClass: CarOwnersService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
