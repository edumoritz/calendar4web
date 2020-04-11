import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { MyCalendarModule } from './../calendar/calendar.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeResourcesComponent } from './home-resourses/home-resourses.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyCalendarModule,
    RouterModule,
    SharedModule
  ],
  declarations: [HomeComponent, HomeHeaderComponent, HomeResourcesComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
