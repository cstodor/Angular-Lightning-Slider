import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SliderService } from './slider.service';

describe('SliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliderService, HttpClient, HttpHandler]
    });
  });

  // it('should be created', inject([SliderService], (service: SliderService) => {
  //   expect(service).toBeTruthy();
  // }));
});
