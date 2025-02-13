import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environments';
import { RegisterUser } from '../models/register-user';
import { LoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  register(user:RegisterUser):Observable<any>{
    return this.httpClient.post(env.BASE_URL +'auth/signup',user)
  }
  login(user:LoginUser):Observable<any>{
    return this.httpClient.post(env.BASE_URL+'auth/signin',user)
  }



}
