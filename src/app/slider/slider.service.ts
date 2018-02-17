import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SliderService {

  images: any[];

  constructor(
    private http: HttpClient
  ) { }

  callAPI(endpoint: string, pageIndex?: number): Observable<any> {
    return this.http.get(endpoint + pageIndex)
      .map((res: Response) => res);
  }

  // General API Calls
  getImages(pageIndex?: number): Observable<any[]> {
    return this.callAPI('/get-images/', pageIndex);
  }

}
