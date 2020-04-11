import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyCalendarModule } from './calendar/calendar.module';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register/register.module';
import { ListModule } from './list/list.module';
import { HttpModule } from '@angular/http';
import { Service } from './service';
import { NotificationService } from './messages/notification.service';
import { SnackbarModule } from './messages/snackbar/snackbar.module';
import { EventsModule } from './events/events.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    RegisterModule,
    EventsModule,
    HomeModule,
    ListModule,
    SnackbarModule,
    MyCalendarModule
  ],
  providers: [Service, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
