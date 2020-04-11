import { CalendarUtilsComponent } from './calendar-utils.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  declarations: [CalendarUtilsComponent],
  exports: [CalendarUtilsComponent]
})
export class CalendarUtilsModule {}
