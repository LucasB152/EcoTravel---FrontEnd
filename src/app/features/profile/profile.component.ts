import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {Users} from '../../core/models/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: Users;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
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

  editProfile() {

  }
}