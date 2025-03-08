import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassChange } from '../models/pass-change';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environments';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  changePw(newPw : PassChange):Observable<any> {
    return this.http.put(`${env.BASE_URL}users//changeMyPassword`,{
      currentPassword: newPw.currentPassword,
      password: newPw.password,
      rePassword: newPw.rePassword
    })
  }

  updateInfo(userData:UserData):Observable<any> {
    return this.http.put(`${env.BASE_URL}users/updateMe/`,{
      name:userData.name,
      email:userData.email,
      phone:userData.phone
    })
  }
}
