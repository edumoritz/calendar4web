import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { Eventos } from './../models/eventos';
import { Service } from '../service';
import { NotificationService } from '../messages/notification.service';


@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.css'],
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent')

  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Exclusão de Evento', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  eventos: Eventos[] = [];
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = captureEvents.length > 0;

  constructor(
    private service: Service,
    private modal: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.ngOnInit();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  loadEvents() {
    this.eventos = [];
    this.events = [];
    if (this.service.get("http://localhost:3333/eventos").subscribe() != null) {
      this.service.get("http://localhost:3333/eventos").subscribe((data) => {
        this.eventos = data.json();
        

        this.eventos.forEach(i => {

          let colors = {
            primary: i.cor_primaria,
            secondary: i.cor_secundaria
          };
          this.events.push({
            id: i.id,
            title: i.titulo,
            start: new Date(this.toISOFormat(i.data_inicio)),
            end: new Date(this.toISOFormat(i.data_fim)),
            color: colors,
            actions: this.actions,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
          });
        });
        this.refresh.next();
      });
    }
  }

  closeModal() {
    this.modal.dismissAll();
  }
  delete(event) {
    let id = event.id;
    this.service.delete(event, 'http://localhost:3333/evento/'+id).subscribe()
    this.notificationService.notify(`Evento: "${event.title}" Removido!!`)
    this.events = this.events.filter(iEvent => iEvent !== event);
    this.modal.dismissAll();
  }

  toISOFormat(dateTimeString) {
    // console.log(dateTimeString)
    const [date, time] = dateTimeString.split(' ');  
    const [DD, MM, YYYY] = date.split('/');  
    const [HH, mm] = time.split(':');  
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

}
