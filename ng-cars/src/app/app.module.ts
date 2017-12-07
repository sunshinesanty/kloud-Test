import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ErrorComponent } from './directives/errors.component';
import { LoadingComponent } from './directives/loading.component';
import { OwnerColorComponent } from './components/owner.component';
import { CarOwnersService } from '../services/cars.service';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingComponent,
    OwnerColorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: CarOwnersService, useClass: CarOwnersService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
