import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../core/models/Users';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: Users;
  isModalOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserById().subscribe(
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

  openConfirmationModal() {
    this.isModalOpen = true;
  }

  deleteAccount() {
    this.userService.deleteUser().subscribe(
      response => {
        this.notificationService.showNotificationSuccess(response.Message);
      }
    )
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
