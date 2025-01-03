import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Users} from '../../models/Users';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: Users;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if(this.authService.isAuthenticated()) {
        this.userService.loadCurrentUser().subscribe();
      }
      this.isAdmin = this.authService.isAdmin();
    })
    this.userService.user$.subscribe(user => {
      if(user){
        this.user = user;
        this.user.profilePicturePath = null ? user.profilePicturePath : "basic-profile-picture.webp";
      }
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
