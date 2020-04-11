import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <link href="https://unpkg.com/bootstrap-css-only@4.1.1/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://unpkg.com/font-awesome@4.7.0/css/font-awesome.css" rel="stylesheet">
  <link href="https://unpkg.com/angular-calendar@0.26.4/css/angular-calendar.css" rel="stylesheet">
  <link href="https://unpkg.com/flatpickr@4.5.2/dist/flatpickr.css" rel="stylesheet">
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
