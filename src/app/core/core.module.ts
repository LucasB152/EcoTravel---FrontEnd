import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBarComponent} from '../features/search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule {
}
