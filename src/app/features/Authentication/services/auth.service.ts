import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environments';
import { RegisterUser } from '../models/register-user';
import { LoginUser } from '../models/login-user';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platform_id = inject(PLATFORM_ID)
  private readonly router = inject(Router)
  constructor(private httpClient: HttpClient) { }

  register(user: RegisterUser): Observable<any> {
    return this.httpClient.post(env.BASE_URL + 'auth/signup', user)
  }
  login(user: LoginUser): Observable<any> {
    return this.httpClient.post(env.BASE_URL + 'auth/signin', user)
  }

  checkPlatform(): boolean {
    if (isPlatformBrowser(this.platform_id)) {
      return true
    }
    return false

  }

  saveToken(token: string) {
    if (this.checkPlatform()) {
      localStorage.setItem('token', token)
    }
  }

  getToken(): string | null {
    if (this.checkPlatform()) {
      return localStorage.getItem('token')
    }
    return null
  }


  verifyToken(): Observable<any> {
    console.log(this.getToken());
    return this.httpClient.get(env.BASE_URL+'auth/verifyToken', {
      headers: {
        token: this.getToken()?.toString() || ''
      }
    })
  }


  isAuthenticated(): boolean {

    return !!this.getToken()

  }

  navigateToLogin(): void {
    this.router.navigate(['/login'])
  }
  navigateToHome(): void {
    this.router.navigate(['/home'])
  }


  logout(){
    if(this.checkPlatform()) {
      localStorage.removeItem('token')
      // this.navigateToHome()
    }
  }

  verifyLogin() {
    this.verifyToken().subscribe({
      next: (res) => {
        // this.authService.navigateToHome()
        if (res.message === 'verified') {

          this.navigateToHome()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
