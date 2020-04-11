import { MatSidenav } from '@angular/material';
import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent {

  @Input() sidenav: MatSidenav;

  constructor(
    public title: Title
  ) {}

}
