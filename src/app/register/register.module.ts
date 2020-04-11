import { NotificationService } from './../messages/notification.service';
import { RegisterComponent } from './register.component';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Service } from '../service';
import { SnackbarModule } from '../messages/snackbar/snackbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SnackbarModule,
    SharedModule
  ],
  providers: [Service, NotificationService],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]
})
export class RegisterModule {}
