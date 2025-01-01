import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    console.log(`ExpectedRoles : ${expectedRoles}`);
    const userRole = this.userService.getUserRole();
    console.log(`userRole : ${userRole}`);
    if (expectedRoles.includes(<string>userRole)) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
