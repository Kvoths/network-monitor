import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (private _userService: UserService, private router: Router) {

  }

  canActivate() {
    if (!this._userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    
    return true;
  }
}
