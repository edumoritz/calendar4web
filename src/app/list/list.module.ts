import { NotificationService } from './../messages/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { SharedModule } from '../shared/shared.module';
import { SnackbarModule } from '../messages/snackbar/snackbar.module';
import { InfoModalComponent } from './info-modal/info-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SnackbarModule
  ],
  declarations: [ListComponent, InfoModalComponent],
  exports: [ListComponent],
  providers: [NotificationService],
  entryComponents: [InfoModalComponent]
})
export class ListModule { }
