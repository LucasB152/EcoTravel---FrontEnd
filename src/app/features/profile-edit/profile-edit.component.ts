import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  basicInfoForm!: FormGroup; // Formulaire pour les informations de base
  passwordForm!: FormGroup; // Formulaire pour le mot de passe
  user: any; // Simule les données utilisateur

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Simuler la récupération des données utilisateur
    this.user = {
      photo: 'https://via.placeholder.com/150',
      lastName: 'Dupont',
      firstName: 'Jean',
      email: 'jean.dupont@example.com',
    };

    // Formulaire pour les informations de base
    this.basicInfoForm = this.fb.group({
      photo: [this.user.photo],
      lastName: [this.user.lastName, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

    // Formulaire pour le mot de passe
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  // Méthode pour gérer la mise à jour des informations de base
  onUpdateBasicInfo(): void {
    if (this.basicInfoForm.valid) {
      const updatedData = this.basicInfoForm.value;
      console.log('Informations de base mises à jour :', updatedData);
      alert('Informations de base mises à jour avec succès !');
    } else {
      alert('Veuillez remplir correctement les informations de base.');
    }
  }

  // Méthode pour gérer la mise à jour du mot de passe
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

  // Méthode pour gérer la mise à jour de la photo
  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.basicInfoForm.patchValue({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
