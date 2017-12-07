import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrandComponent, ErrorComponent, LoadingComponent, OwnerColorComponent } from './components';
import { CarOwnersService } from '../services/cars.service';
import { By } from 'selenium-webdriver';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, BrandComponent, ErrorComponent,
        LoadingComponent, OwnerColorComponent
      ],
      providers: [{ provide: CarOwnersService, useClass: CarOwnersService }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Cars & Owners'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Cars & Owners');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Cars & Owners');
  }));
});
