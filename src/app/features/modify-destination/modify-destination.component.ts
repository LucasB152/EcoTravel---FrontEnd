import {Component, OnInit} from '@angular/core';
import {DestinationService} from '../../core/services/destination.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TagService} from '../../core/services/tag.service';
import {Destination} from '../../core/models/Destination';
import {Tag} from '../../core/models/Tag';
import {DestinationCreationDto} from '../../core/models/DestinationCreationDto';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {CloudinaryService} from '../../core/services/cloudinary.service';
import {NotificationService} from '../../core/services/notification.service';
import {LoadingService} from '../../core/services/loading.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-modify-destination',
  templateUrl: './modify-destination.component.html',
  styleUrl: './modify-destination.component.scss'
})
export class ModifyDestinationComponent implements OnInit {
  destinationForm: FormGroup;
  destination: Destination | null = null;
  tags: Tag[] = [];
  selectedTags: Set<string> = new Set();
  images: string[] = [];
  newPhotos: File[] = [];

  constructor(private fb: FormBuilder,
              private destinationService: DestinationService,
              private tagService: TagService,
              private userService: UserService,
              private router: Router,
              private cloudinaryService: CloudinaryService,
              private notificationService: NotificationService,
              private loadingService: LoadingService) {
    this.destinationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      destinationType: ['', Validators.required],
      country: [''],
      location: [''],
      street: [''],
      number: [''],
      zipcode: [''],
      tagsId: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.destinationService.getDestinationDetails(history.state.destinationId).pipe(finalize(() => {
      this.loadingService.hide();
    })).subscribe((data) => {
      this.destination = data;

      this.destinationForm.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        capacity: data.capacity,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        destinationType: this.getDestinationTypeValue(data.destinationType),
          country: '',
          location: '',
          street: '',
          number: '',
          zipcode: '',
      });

      this.decomposeAddress(data.address);

      this.images = data.images;
      const tagsSelected = data.tags;
      this.tagService.getTags().subscribe((tags) => {
        this.tags = tags;
        this.initializeTags(tagsSelected);
      });
    });
  }

  private initializeTags(selectedTagIds: string[]): void {
    const tagIdsArray: FormArray = this.destinationForm.get('tagsId') as FormArray;
    this.tags.forEach((tag) => {
      const isSelected = selectedTagIds.includes(tag.name);
      if(isSelected) {
        this.selectedTags.add(tag.id!);
        tagIdsArray.push(new FormControl(tag.id!));
      }
    });
  }

  private decomposeAddress(address: string): void {
    const addressRegex = /^(.*?)\s(\d+),\s(\d+)\s([^,]+),\s(.+)$/;
    const match = address.match(addressRegex);

    if (match) {
      const [, street, number, zipcode, location, country] = match;

      this.destinationForm.patchValue({
        street: street || '',
        number: number || '',
        zipcode: zipcode || '',
        location: location || '',
        country: country || '',
      });
    } else {
      console.error('Adresse invalide ou non reconnue :', address);
    }
  }


  onCheckboxChange(event: any, tagId: string): void {
    const tagIdsArray: FormArray = this.destinationForm.get('tagsId') as FormArray;

    if (event.target.checked) {
      tagIdsArray.push(new FormControl(tagId));
    } else {
      const index = tagIdsArray.controls.findIndex(x => x.value === tagId);
      tagIdsArray.removeAt(index);
    }
  }

  onPhotoChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles: File[] = Array.from(input.files);
      this.newPhotos.push(...newFiles);
    }
  }

  onDeletePhoto(url: string): void {
    this.loadingService.show();
    this.cloudinaryService.deletePicture(url, history.state.destinationId).pipe(finalize(() => {
      this.loadingService.hide();
    })).subscribe((data) => {
      this.destination = data;
    });
  }

  getDestinationTypeValue(type: string): string {
    switch (type) {
      case "Hébergement":
        return "LODGING";
      case "Activité":
        return "ACTIVITY";
      default:
        return "";
    }
  }

  onSubmit(): void {
    if (this.destinationForm.valid) {
      this.selectedTags.forEach((tag) => {
        console.log(tag);
      })
      const destinationUpdated: DestinationCreationDto = this.destinationForm.value;
      this.loadingService.show();
      this.destinationService.updateDestination(destinationUpdated, this.userService.getUserId(), history.state.destinationId)
        .pipe(finalize(() => {
          this.loadingService.hide();
        })).subscribe({
        next: (response) => {
          this.router.navigateByUrl("/")
        }
      });
      if(this.newPhotos.length > 0){
        this.loadingService.show();
        this.cloudinaryService.uploadFiles(this.newPhotos, `/host/destinations/pictures/${history.state.destinationId}`)
          .pipe(finalize(() => {
            this.loadingService.hide();
          })).subscribe({
            next: (response) => {
              this.router.navigateByUrl('/myDestination');
              this.notificationService.showNotificationSuccess(response.Message);
            },
            error: (error) => {
              this.notificationService.showNotificationError(error.Message);
            }
          });
      }
    }
  }
}
