import { inject } from "@angular/core";
import { AuthService } from "../../features/Authentication/services/auth.service";
import { ActivatedRoute } from "@angular/router";

export const redirectToHome = (auth: AuthService):any => {

  // return auth.isLoggedIn.subscribe({
  //   next: (isLoggedIn) => {
  //     if (isLoggedIn) {
  //       auth.navigateToHome()
  //     }
  //   }
  // })
  if(auth.isLoggedIn()){
    auth.navigateToHome()
  }
}
export const redirectToLogin = (auth: AuthService,current:string,id?:string):any => {
  return auth.verifyToken().subscribe({
    next: (res) => {
      if (id) {
        auth.redirectToCurrentRoute(current,id)
      } else {
        auth.redirectToCurrentRoute(current)
      }
    },
    error: (error) => {
      auth.navigateToLogin()
    }
  })
}
