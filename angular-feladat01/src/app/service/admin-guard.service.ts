import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const expectedRole = route.data.expectedRole;

    if (
      !this.auth.currentUserValue ||
      this.auth.currentUserValue.role < 3
    ) {
      this.router.navigate(['forbidden']);
      return false;
    }

    return true;
  }
}
