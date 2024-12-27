import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    console.log(`ExpectedRoles : ${expectedRoles}`);
    const userRole = this.authService.getUserRole();
    console.log(`userRole : ${userRole}`);
    if (expectedRoles.includes(<string>userRole)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
