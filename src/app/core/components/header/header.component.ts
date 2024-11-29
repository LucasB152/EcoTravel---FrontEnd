import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Users} from '../../models/Users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: Users;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if(this.authService.isAuthenticated()) {
        let id: string = this.authService.getUserId();
        this.authService.getUserById(id).subscribe(
          response => {
            this.user = new Users({
              firstname: response.firstname,
              lastname: response.lastname,
              email: response.email,
              password: ""
            });
            this.user.profilePicturePath = response.profilePicturePath;
          }
        );
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
