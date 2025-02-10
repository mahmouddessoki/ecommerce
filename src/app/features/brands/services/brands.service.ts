import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<any>{
    return this.httpClient.get(env.BASE_URL +'brands')
  }
}
