import { SnackbarComponent } from './snackbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent]
})
export class SnackbarModule { }
