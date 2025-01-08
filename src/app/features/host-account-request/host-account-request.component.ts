import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {RequestService} from '../../core/services/request.service';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';
import {CloudinaryService} from '../../core/services/cloudinary.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './host-account-request.component.html',
  styleUrls: ['./host-account-request.component.scss']
})
export class HostAccountRequestComponent implements OnInit {
  registerForm!: FormGroup;
  certificationFiles: File[] = [];
  availableServices = ['Hébergement', 'Activités']; // Correspond aux deux services

  constructor(private fb: FormBuilder, private userService: UserService, private requestService: RequestService, private notificationService: NotificationService, private cloudinaryService: CloudinaryService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(response => {
      if (response) {
        this.registerForm = this.fb.group({
          fullName: [{value: `${response.firstName} ${response.lastName}`, disabled: true}, [Validators.required]],
          email: [{value: `${response.email}`, disabled: true}, [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^((\+33|0)[1-9](\d{2}(\s|-)?){4}|(\+32|0)4(\d{2}(\s|-)?){4})$/)]],
          status: ['', Validators.required],
          company: [''],
          identifier: [''],
          website: ['', Validators.pattern(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)],
          services: this.fb.array([], Validators.required), // Liste des services
          description: [''],
          certifications: [null],
          motivation: ['', Validators.required],
          terms: [false, Validators.requiredTrue]
        });
        this.addServices(); // Ajout des contrôles pour les services
      }
    });
  }

  get services(): FormArray {
    return this.registerForm.get('services') as FormArray;
  }

  private addServices(): void {
    this.availableServices.forEach(() => {
      this.services.push(this.fb.control(false)); // Chaque service commence décoché
    });
  }

  private atLeastOneServiceSelected(): boolean {
    return this.services.controls.some(control => control.value === true);
  }

  private getSelectedServices(): string[] {
    const selectedServices: string[] = [];
    this.services.controls.forEach((control, index) => {
      if (control.value) {
        if (this.availableServices[index] === 'Hébergement') {
          selectedServices.push('LODGING');
        } else if (this.availableServices[index] === 'Activités') {
          selectedServices.push('ACTIVITY');
        }
      }
    });
    return selectedServices;
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles: File[] = Array.from(input.files);
      let totalSize = this.certificationFiles.reduce((acc, file) => acc + file.size, 0);
      let valid = true;

      newFiles.forEach(file => {
        if (file.type !== 'application/pdf') {
          this.notificationService.showNotificationError('Le fichier doit être au format PDF');
          valid = false;
        } else if (file.size > 10 * 1024 * 1024) {
          this.notificationService.showNotificationError(`Le fichier ${file.name} dépasse la taille maximale de 10 Mo`);
          valid = false;
        } else {
          totalSize += file.size;
        }
      });

      if (valid && totalSize <= 10 * 1024 * 1024) {
        this.certificationFiles.push(...newFiles.filter(file => file.type === 'application/pdf'));
      } else if (totalSize > 10 * 1024 * 1024) {
        this.notificationService.showNotificationError('La taille totale des fichiers dépasse 10 Mo');
      }
    }
  }

  onSubmit(): void {
    if (!this.atLeastOneServiceSelected()) {
      this.services.setErrors({ noServiceSelected: true });
    } else {
      this.services.setErrors(null);
    }

    const totalFileSize = this.certificationFiles.reduce((acc, file) => acc + file.size, 0);

    if (totalFileSize > 10 * 1024 * 1024) {
      this.notificationService.showNotificationError('La taille totale des fichiers ne doit pas dépasser 10 Mo');
      return;
    }

    if (this.registerForm.valid) {
      const selectedServices = this.getSelectedServices();
      console.log('Selected Services:', selectedServices);

      this.requestService.postRequest({
        ...this.registerForm.value,
        services: selectedServices,
        userId: this.userService.getUserId()
      }).subscribe({
        next: (response) => {
          const requestId = response.requestId;
          if (this.certificationFiles.length > 0) {
            this.cloudinaryService.uploadFiles(this.certificationFiles, `/request/files/${requestId}`).subscribe({
              next: (response) => {
                this.router.navigateByUrl('/');
                this.notificationService.showNotificationSuccess(response.Message);
              },
              error: (uploadError) => {
                this.notificationService.showNotificationError(uploadError.Message);
              }
            });
          } else {
            this.router.navigateByUrl('/');
            this.notificationService.showNotificationSuccess(response.Message);
          }
        },
        error: (error) => {
          this.notificationService.showNotificationError(error.error.message);
        }
      });
    }
  }
}
