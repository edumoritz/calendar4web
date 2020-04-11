import { InfoModalComponent } from './info-modal/info-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../service';
import { Paciente } from '../models/paciente';

import {Router} from "@angular/router"

import {
  MatPaginator,
  MatTableDataSource,
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatDialog
} from '@angular/material';

import { NotificationService } from '../messages/notification.service';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 5,
  hideDelay: 2000,
  touchendHideDelay: 5,
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class ListComponent implements OnInit {
  public patients: Paciente[];
  public patientsFilter: Paciente[];
  public list: String[] = [];
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'data_nasc', 'comentario', 'acoes'];

  constructor(
    private service: Service,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.service.get("http://localhost:3333/pacientes").subscribe((data) => {
      this.patients = data.json();
      this.dataSource = new MatTableDataSource(this.patients);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onModal(body) {
    this.dialog.open(InfoModalComponent, { width: '800px', height: '60vh', data: body });
  }

  onEdit(body) {
    this.router.navigate([`/register`, body])
  }

  onRemove(body){
    var id = body.id;
    this.service.delete(id, 'http://localhost:3333/paciente/'+id).subscribe(() => {
      this.notificationService.notify(`Paciente: "${body.nome}" Removido!!`)
      this.loadAll();
    });
  }

  birthdayMoth() {
    this.loadList(1);    
    this.dataSource = new MatTableDataSource(this.patientsFilter);
  }
  birthdayDay() {
    this.loadList(0);    
    this.dataSource = new MatTableDataSource(this.patientsFilter);
  }

  /**
   * Método que recebe um array e um teste para filtrar os aniversariantes.
   * @param array todos os pacientes 
   * @param test teste de data_nasc
   */
  birthdayFilter(array, test) {
    const passed = []
    for (var i = 0; i < array.length; i++) {
      if(test(array[i]))
        passed.push(array[i])
    }
    return passed
  }

  /**
   * Método que carrega lista de aniversariantes do dia ou do mês.
   * @param parts dia ou mês
   */
  loadList(parts) {
    let today = new Date().toLocaleString()      
    let parts_today = today.split('/') 

    this.patientsFilter = this.birthdayFilter(this.patients, p => 
      new Date(p.data_nasc).toLocaleString().split('/')[parts] == parts_today[parts]);
  }

}
