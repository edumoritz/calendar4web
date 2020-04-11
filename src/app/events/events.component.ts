import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscriber, Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay
} from 'date-fns';

import { Eventos } from '../models/eventos';
import { Service } from './../service';
import { NotificationService } from '../messages/notification.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  public observer: Subscriber<void>;
  public formulario: FormGroup;
  public eventos: Eventos[] = [];
  refresh: Subject<any> = new Subject();

  constructor(
    private service: Service,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.observer = this.service.getObserver();
    this.loadEvents();
    this.formulario = this.formBuilder.group({
      titulo: [this.eventos[0].titulo],
      cor_primaria: [this.eventos[0].cor_primaria],
      cor_secundaria: [this.eventos[0].cor_secundaria],
      data_inicio: [this.eventos[0].data_inicio],
      data_fim: [this.eventos[0].data_fim]
    })
  }

  onSubmit(){    
    this.eventos.forEach(e => {
      this.formulario = this.formBuilder.group({
        titulo: e.titulo,
        cor_primaria: e.cor_primaria,
        cor_secundaria: e.cor_secundaria,
        data_inicio: e.data_inicio,
        data_fim: e.data_fim
      })
    });
    console.log(this.formulario.value)
    const body = this.formulario.value
    this.service.post(body, 'http://localhost:3333/evento').subscribe();
    this.notificationService.notify(`Evento: "${body.titulo}" Adicionado!!`)

    /** =========================================================== **/
    this.formulario.reset(); // Reseta Formulario
    this.loadEvents(); // Limpa lista evento e seta valores padrão novamente
    this.ngOnInit() // Recarrega Formulario
    /** =========================================================== **/

  }

  loadEvents() {
    this.eventos.splice(0, 1);
    this.eventos = [{
      titulo: 'Novo Evento',
      cor_primaria: '#ad2121',
      cor_secundaria: '#FAE3E3',
      data_inicio: startOfDay(new Date()).toLocaleString(),
      data_fim: endOfDay(new Date()).toLocaleString()
    }];
  }

  changeStart(event){
    console.log(event.toLocaleString())
    this.eventos[0].data_inicio = event.toLocaleString();
  }
  changeEnd(event) {
    this.eventos[0].data_fim = event.toLocaleString();
  }
  changeTitle(title) {
    this.eventos[0].titulo = title;
  }
  changeColorP(color) {
    this.eventos[0].cor_primaria = color
  }
  changeColorS(color) {
    this.eventos[0].cor_secundaria = color
  }

}
