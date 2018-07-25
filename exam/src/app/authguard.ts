import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StudentService } from './student.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public studentservice: StudentService, private router: Router) {}
  canActivate(): boolean {
    if (this.studentservice.loggedIn()) {
      
      return true;
    }else{
        this.router.navigate(['/login']);
        return false;
    }
  }
}