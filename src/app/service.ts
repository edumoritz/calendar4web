import { Injectable } from '@angular/core';
import { Http, Response } from '@angular//http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class Service {

    private observer: Subscriber<void>;
    private observable: Observable<void>;

    constructor(private http: Http) {
        this.observable = new Observable((observer: Subscriber<void>) => this.observer = observer);
    }

    post(body, api): Observable<Response> {
        return this.http.post(api, body)
    }

    get(api): Observable<Response> {
        return this.http.get(api)
    }

    put(body, api): Observable<Response> {
        return this.http.put(api, body)
    }

    delete(body, api): Observable<Response> {
      return this.http.delete(api, body)
    }

    getObserver(): Subscriber<void> {
        return this.observer;
    }

    getObservable(): Observable<void> {
        return this.observable;
    }

}
