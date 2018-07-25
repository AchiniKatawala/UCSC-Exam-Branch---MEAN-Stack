import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Sturepeat } from './sturepeat';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SturepeatService {

  _accept: Sturepeat[] = [];

  constructor(private http: Http) { }

  //accept

  acceptRepeat(accept: Sturepeat){
    console.log(Sturepeat);
    this._accept.push(accept);
  }

  //retreving repeat Service

  getsturepeat(){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.get('http://localhost:3000/api/sturepeats',{headers:headers}).pipe(map(res => res.json()));
  }

  //add repeat detail

  addsturepeat(newsturepeat){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.post('http://localhost:3000/api/sturepeat', newsturepeat,{headers:headers}).pipe(map(res => res.json()));

  }

  //delete method
  
  deletesturepeat(id){
    return this.http.delete('http://localhost:3000/api/sturepeat/'+id).pipe(map(res => res.json())); 
  }
}
