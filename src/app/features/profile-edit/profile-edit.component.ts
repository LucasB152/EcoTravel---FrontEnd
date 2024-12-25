import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Users} from '../../core/models/Users';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {CloudinaryService} from '../../core/services/cloudinary.service';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  basicInfoForm!: FormGroup;
  passwordForm!: FormGroup;
  user!: Users;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  constructor(private authService : AuthService, private fb: FormBuilder, private userService: UserService, private router: Router, private cloudinaryService: CloudinaryService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    let id: string = this.authService.getUserId();
    this.authService.getUserById(id).subscribe(
      response => {
        this.user = new Users({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          password: ""
        });
        this.user.id = id;
        this.user.profilePicturePath = response.profilePicturePath;
        this.basicInfoForm = this.fb.group({
          profilePicturePath: [this.user.profilePicturePath],
          lastName: [this.user.lastname, Validators.required],
          firstName: [this.user.firstname, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
        });
      }
    );
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onUpdateBasicInfo(): void {
    if (this.basicInfoForm.valid) {
      if(this.selectedFile){
        this.cloudinaryService.uploadImage(this.selectedFile, this.user.id).subscribe({
          next: (imageUrl) => {
            this.basicInfoForm.patchValue({profilePicturePath: imageUrl});

            this.saveForm();
          }, error: (error) => {
            console.error(error);
          }
        })
      } else {
        this.saveForm();
      }
    }
  }

  onUpdatePassword(): void {
    if (this.passwordForm.valid) {
      const {currentPassword, newPassword, confirmPassword} = this.passwordForm.value;

      if (newPassword === confirmPassword) {
        this.userService.modifyUserPassword(currentPassword, newPassword, this.user.id).subscribe({
          next: (message) => {
            this.router.navigateByUrl('/profile');
            this.notificationService.showNotificationSuccess(message.Message);
          },
          error: (error) => {
            this.notificationService.showNotificationError(error.error.message);
          }
        })
      }
    }
  }

  onPhotoChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private saveForm() {
    this.userService.modifyUserDetails(this.basicInfoForm.value, this.user.id).subscribe({
      next: (response) => {
        this.userService.notifyUserUpdated();
        this.router.navigateByUrl("/profile");
        this.notificationService.showNotificationSuccess(response.Message);
      },
      error: (error) => {
        this.notificationService.showNotificationError(error)
      }
    })
  }
}
