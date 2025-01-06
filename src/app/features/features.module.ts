import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from './destinationDetails/review-form/review-form.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ReviewFormComponent
  ],
  exports: [
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FeaturesModule { }
