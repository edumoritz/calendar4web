import { FlatpickrModule } from 'angularx-flatpickr';
import { NotificationService } from './../messages/notification.service';
import { Service } from './../service';
import { SnackbarModule } from './../messages/snackbar/snackbar.module';
import { EventsComponent } from './events.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    SnackbarModule
  ],
  providers: [Service, NotificationService],
  declarations: [EventsComponent],
  exports: [EventsComponent]
})
export class EventsModule {}
