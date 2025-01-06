import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {RequestService} from '../../core/services/request.service';
import {NotificationService} from '../../core/services/notification.service';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './host-account-request.component.html',
  styleUrls: ['./host-account-request.component.scss']
})
export class HostAccountRequestComponent implements OnInit {
  registerForm!: FormGroup;
  certificationFiles: File[] = [];
  availableServices = ['Hébergement', 'Activités'];

  constructor(private fb: FormBuilder, private userService: UserService, private requestService: RequestService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(response => {
      if(response){
        this.registerForm = this.fb.group({
          fullName: [{value: `${response.firstName} ${response.lastName}`, disabled: true}, [Validators.required]],
          email: [{value: `${response.email}`, disabled: true}, [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^((\+33|0)[1-9](\d{2}(\s|-)?){4}|(\+32|0)4(\d{2}(\s|-)?){4})$/)]],
          status: ['', Validators.required],
          company: [''],
          identifier: [''],
          website: ['', Validators.pattern(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)],
          services: this.fb.array([], Validators.required),
          description: [''],
          certifications: [null],
          motivation: ['', Validators.required],
          terms: [false, Validators.requiredTrue]
        });
        this.addServices();
      }
    });
  }

  get services(): FormArray {
    return this.registerForm.get('services') as FormArray;
  }

  private addServices(): void {
    this.availableServices.forEach(() => {
      this.services.push(this.fb.control(false));
    });
  }

  private atLeastOneServiceSelected(): boolean {
    return this.services.controls.some(control => control.value === true);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        if (file.type === 'application/pdf') {
          this.certificationFiles.push(file);
        } else {
          this.notificationService.showNotificationError('Le fichier doit être un PDF');
        }
      });
    }
  }


  onSubmit(): void {
    if (!this.atLeastOneServiceSelected()) {
      this.services.setErrors({noServiceSelected: true});
    } else {
      this.services.setErrors(null);
    }

    if (this.registerForm.valid) {
      const formData = new FormData();

      Object.keys(this.registerForm.value).forEach(key => {
        if (key === 'certifications') {
          this.certificationFiles.forEach(file => {
            formData.append('certifications', file, file.name);
          });
        } else {
          formData.append(key, this.registerForm.get(key)?.value);
        }
      });

      this.requestService.postRequest(formData).subscribe({
        next: (response) => {
          this.notificationService.showNotificationSuccess(response.Message);
        },
        error: (error) => {
          this.notificationService.showNotificationError(error)
        }
      });
    } else {
      console.error('Formulaire invalide');
    }
  }
}
