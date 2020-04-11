import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Service } from '../service';
import { Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { NotificationService } from '../messages/notification.service';

@Component({
  selector: 'register-component',
  styleUrls: ['register.component.css'],
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public observer: Subscriber<void>;
  public formulario: FormGroup;
  pacienteParams$: Observable<Paciente[]>;

  public paciente: Paciente[] = [];
  public nome = '';
  public sobrenome = '';
  public email = '';
  public data_nasc = new Date();
  public telefone = 0;
  public celular = 0;
  public comentario = '';

  constructor(
    private service: Service,
    private formBuilder :FormBuilder,
    private router: ActivatedRoute,
    private notificationService: NotificationService
  ){}

  ngOnInit(){
    this.observer = this.service.getObserver();
    this.formulario = this.formBuilder.group({
      nome: [
        this.router.snapshot.paramMap.get('nome'),
        [Validators.required, Validators.minLength(3)]
      ],
      sobrenome: [
        this.router.snapshot.paramMap.get('sobrenome'),
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        this.router.snapshot.paramMap.get('email'),
        [Validators.email]
      ],
      data_nasc: [
        this.router.snapshot.paramMap.get('data_nasc'),
        [Validators.required]
      ],
      telefone: [this.router.snapshot.paramMap.get('telefone')],
      celular: [this.router.snapshot.paramMap.get('celular')],
      comentario: [this.router.snapshot.paramMap.get('comentario')],
    })

  }

  get name(): FormControl { return <FormControl>this.formulario.get('nome'); }
  get lastname(): FormControl { return <FormControl>this.formulario.get('sobrenome'); }
  get address(): FormControl { return <FormControl>this.formulario.get('email'); }

  onSubmit(){
    const id = this.router.snapshot.paramMap.get('id');
    const body = this.formulario.value;
    if(id == null) {
      this.service.post(body, 'http://localhost:3333/paciente').subscribe();         
      this.notificationService.notify(`Paciente: "${body.nome}" Adicionado!!`);
    } else {
      this.service.put(body, 'http://localhost:3333/paciente/'+id).subscribe();
      this.notificationService.notify(`Paciente: "${body.nome}" Alterado!!`);
    }
    this.reset();
  }

  reset(){
    this.formulario.reset();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.data_nasc = event.value;
  }

  onKeydown(event) {
    console.log(event);
  }

}
