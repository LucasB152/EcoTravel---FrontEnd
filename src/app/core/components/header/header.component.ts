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

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if(this.authService.isAuthenticated()) {
        this.updateUserDetails();
      }
    })
    this.userService.userUpdated$.subscribe(
      updatedUser => {
        if(updatedUser){
          this.updateUserDetails()
        }
      }
    )
  }

  updateUserDetails(){
    let userId: string = this.authService.getUserId();
    this.authService.getUserById(userId).subscribe(
      response => {
        this.user = new Users({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          password: ""
        });
        this.user.profilePicturePath = response.profilePicturePath || "basic-profile-picture.webp";
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
