import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Repeataccept } from './repeataccept';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RepeatacceptService {

  constructor(private http: Http) { }

  repeataccepts(){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.get('http://localhost:3000/api/repeataccepts',{headers:headers}).pipe(map(res => res.json()));
  }

  acceptRepeat(newsturepeataccept){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.post('http://localhost:3000/api/repeataccept', newsturepeataccept,{headers:headers}).pipe(map(res => res.json()));

  }
}
