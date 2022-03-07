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
export class ApplicationAuthGuard implements CanActivate {
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
    // If user is logged in, allow to access protected routes
    if (this.userService.user) {
      return true;
    }

    // Otherwise, redirect to / page
    this.router.navigateByUrl('/');
    return false;
  }
}
