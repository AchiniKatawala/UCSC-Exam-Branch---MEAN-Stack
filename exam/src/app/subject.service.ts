import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Student } from './student';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: Http) { }

    //retreving subject Service

    getSubject(){
      var headers = new Headers();
      headers.append('Contnt-Type', 'applocation/json');
      return this.http.get('http://localhost:3000/api/subjects',{headers:headers}).pipe(map(res => res.json()));
    }
  
    //add student
  
    addSubject(newSubject){
      var headers = new Headers();
      headers.append('Contnt-Type', 'applocation/json');
      return this.http.post('http://localhost:3000/api/subject', newSubject,{headers:headers}).pipe(map(res => res.json()));
  
    }
  
    //delete method
    
    deleteSubject(id){
      return this.http.delete('http://localhost:3000/api/subject/'+id).pipe(map(res => res.json())); 
    }
}
