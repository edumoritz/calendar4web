import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SnackbarModule } from './../messages/snackbar/snackbar.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt')

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    SnackbarModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pt' } ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class MyCalendarModule {}
