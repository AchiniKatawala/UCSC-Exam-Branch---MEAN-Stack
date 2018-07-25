import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Student } from './student';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  user: any;
  authtoken: any;

  constructor(private http: Http, private jwtHelper:JwtHelperService) { }

  //retreving student Service

  getStudent(){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.get('http://localhost:3000/api/students',{headers:headers}).pipe(map(res => res.json()));
  }

  //add student

  addStudent(newStudent){
    var headers = new Headers();
    headers.append('Contnt-Type', 'applocation/json');
    return this.http.post('http://localhost:3000/api/student', newStudent,{headers:headers}).pipe(map(res => res.json()));

  }

  //delete method
  
  deleteStudent(id){
    return this.http.delete('http://localhost:3000/api/student/'+id).pipe(map(res => res.json())); 
  }

  // login(body){
  //   var headers = new Headers();
  //   headers.append('Contnt-Type', 'applocation/json');
  //   return this.http.post('http://localhost:3000/api/login',body,{headers:headers}).pipe(map(res => res.json()));
  // }

  // studentUser(user){
  //   var headers = new Headers();
  //   headers.append('Contnt-Type', 'applocation/json');
  //   return this.http.post('http://localhost:3000/api/login', user,{headers:headers}).pipe(map(res => res.json()));
  // }  

  loginuser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/login', user,{headers:headers}).pipe(map(res => res.json()));
  }

  fetchToken() {
    const token = localStorage.getItem("tokenId");
    this.authtoken = token;
  }

  storeData(token, userdata) {
    localStorage.setItem("tokenId", token);
    localStorage.setItem("user", JSON.stringify(userdata));
    this.authtoken = token;
    this.user = userdata;

  }

  logout() {
    this.authtoken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  isLoggedIn() {
    this.fetchToken();
    return helper.isTokenExpired(this.authtoken);
  }

  loadUserType(){
    if(!this.jwtHelper.isTokenExpired()){
      const user=localStorage.getItem('user');
      this.user=JSON.parse(user);
      if(this.user.usertype=="admin"){
        return 11;
      }
      else{
        return 22;
      }
    }
    else{
      return 33;
    }
  }

  loadUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

}
