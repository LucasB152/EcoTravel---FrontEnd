import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private cloudinaryService: CloudinaryService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(
      response => {
        if(response){
        this.basicInfoForm = this.fb.group({
          profilePicturePath: [response.profilePicturePath],
          lastName: [response.lastName, Validators.required],
          firstName: [response.firstName, Validators.required],
          email: [response.email, [Validators.required, Validators.email]],
        });
      }
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
        const id = this.userService.getUserId();
        this.cloudinaryService.uploadFile(this.selectedFile, `/user/picture/${id}`).subscribe({
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
        this.userService.modifyUserPassword(currentPassword, newPassword).subscribe({
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
    this.userService.modifyUserDetails(this.basicInfoForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/profile");
        this.notificationService.showNotificationSuccess(response.Message);
      },
      error: (error) => {
        this.notificationService.showNotificationError(error.error.message)
      }
    })
  }
}
