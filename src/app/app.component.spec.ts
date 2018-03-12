import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SliderService } from './slider/slider.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SliderComponent
      ],
      providers: [SliderService, HttpClient, HttpHandler]
    }).compileComponents();
  }));
});
