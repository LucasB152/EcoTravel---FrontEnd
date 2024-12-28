import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './host-account-request.component.html',
  styleUrls: ['./host-account-request.component.scss']
})
export class HostAccountRequestComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s-]?)?(\(?\d{1,5}\)?[\s-]?)?[\d\s-]{5,10}$/)]],
      status: ['', Validators.required],
      company: [''],
      identifier: [''],
      website: ['', Validators.pattern(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)],
      services: this.fb.array([]),
      description: ['', Validators.required],
      certifications: [''],
      motivation: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
