import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ListComponent } from './list/list.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: CalendarComponent },
      { path: 'events', component: EventsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'list', component: ListComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];
