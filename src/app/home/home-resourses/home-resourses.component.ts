import {
  EventEmitter,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'home-resources',
  template: `
  <mat-nav-list>
    <a style="text-decoration:none;"
      mat-list-item
      [routerLink]="link.url"
      *ngFor="let link of resources"
      (click)="onClose()">

      <mat-icon matListIcon *ngIf="isMenu">{{ link.icon }}</mat-icon>
      <h3 matLine *ngIf="isMenu">{{ link.title }}</h3>
    </a>

    <ng-content></ng-content>
  </mat-nav-list>
  `
})
export class HomeResourcesComponent implements OnInit {

  @Input() isMenu = false;
  @Output() close = new EventEmitter<void>();

  resources: any[] = [
    {
      url: '/events',
      icon: 'date_range',
      title: 'Cadastrar Eventos'
    },
    {
      url: '/register',
      icon: 'person_add',
      title: 'Cadastrar Pacientes'
    },
    {
      url: '/list',
      icon: 'filter_list',
      title: 'Listar Pacientes'
    }
  ];

  ngOnInit(): void {
    if(this.isMenu) {
      this.resources.unshift({
        url: '/',
        icon: 'home',
        title: 'Home'
      })
    }
  }

  onClose(): void {
    this.close.emit();
  }

}
