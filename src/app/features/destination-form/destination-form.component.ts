import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tag} from '../../core/models/Tag';
import {DestinationCreationDto} from '../../core/models/DestinationCreationDto';
import {DestinationService} from '../../core/services/destination.service';
import {UserService} from '../../core/services/user.service';
import {TagsService} from '../../core/services/tags.service';
import {CloudinaryService} from '../../core/services/cloudinary.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.scss'
})
export class DestinationFormComponent implements OnInit {
  destinationForm!: FormGroup;
  tags: Tag[] = [];
  pictures: File[] = [];

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private tagService: TagsService,
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(
      result => {
        console.log(result)
        this.tags = result
      }
    );
    this.destinationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      capacity: ['', Validators.required],
      contactPhone: ['', [Validators.required, Validators.pattern(/^((\+33|0)[1-9](\d{2}(\s|-)?){4}|(\+32|0)4(\d{2}(\s|-)?){4})$/)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      destinationType: ['', Validators.required],
      country: ['', Validators.required],
      location: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required],
      tagsId: this.fb.array([])
    });
  }

  onCheckboxChange(event: any, tagId: string): void {
    const tagIdsArray: FormArray = this.destinationForm.get('tagIds') as FormArray;

    if (event.target.checked) {
      tagIdsArray.push(new FormControl(tagId));
    } else {
      const index = tagIdsArray.controls.findIndex(x => x.value === tagId);
      tagIdsArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.destinationForm.valid) {
      const destination: DestinationCreationDto = this.destinationForm.value;
      this.destinationService.createDestination(destination, this.userService.getUserId())
        .subscribe({
          next: (response) => {
            const destinationId = response.destinationId;
            if (this.pictures.length > 0) {
              this.cloudinaryService.uploadFiles(this.pictures, `/host/destinations/pictures/${destinationId}`)
                .subscribe({
                  next: (response) => {
                    this.router.navigateByUrl('/myDestination');
                    this.notificationService.showNotificationSuccess(response.Message);
                  },
                  error: (error) => {
                    this.notificationService.showNotificationError(error.Message);
                  }
                });
            } else {
              this.router.navigateByUrl('/myDestination');
              this.notificationService.showNotificationSuccess(response.Message);
            }
          },
          error: (error) => {
            this.notificationService.showNotificationError(error.error.message);
          }
        });
    }
  }

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles: File[] = Array.from(input.files);
      this.pictures.push(...newFiles);
    }
  }
}
