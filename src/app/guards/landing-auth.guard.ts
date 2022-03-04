import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LandingAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // If user already logged in, redirect to /catalogue page
    if (this.userService.user) {
      this.router.navigateByUrl('/catalogue');
      return false;
    }

    // Otherwise, display / page
    return true;
  }
}
