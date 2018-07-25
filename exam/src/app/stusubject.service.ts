import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Student } from './student';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StusubjectService {

  constructor(private http: Http) { }

  //retreving subject Service

  getstuSubject(){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.get('http://localhost:3000/api/stusubjects',{headers:headers}).pipe(map(res => res.json()));
  }

  //add subject

  addstuSubject(newSubject){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.post('http://localhost:3000/api/stusubject', newSubject,{headers:headers}).pipe(map(res => res.json()));

  }

  //delete method
  
  deletestuSubject(id){
    return this.http.delete('http://localhost:3000/api/stusubject/'+id).pipe(map(res => res.json())); 
  }
}
