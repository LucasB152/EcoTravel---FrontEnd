import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Users} from '../../core/models/Users';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {CloudinaryService} from '../../core/services/cloudinary.service';

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
  errorMessage: string = '';

  constructor(private authService : AuthService, private fb: FormBuilder, private userService: UserService, private router: Router, private cloudinaryService: CloudinaryService) {}

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
        this.user.id = id;
        this.user.profilePicturePath = response.profilePicturePath;
        this.basicInfoForm = this.fb.group({
          profilePicturePath: [this.user.profilePicturePath],
          lastname: [this.user.lastname, Validators.required],
          firstname: [this.user.firstname, Validators.required],
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

            console.log(imageUrl);

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
      const { newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
        return;
      }

      console.log('Mot de passe mis à jour avec succès :', this.passwordForm.value);
      alert('Mot de passe mis à jour avec succès !');
    } else {
      alert('Veuillez remplir correctement le formulaire de mot de passe.');
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
        this.router.navigateByUrl("/profile");
      },
      error: (error) => {
        this.errorMessage = error.error;
      }
    })
  }
}
