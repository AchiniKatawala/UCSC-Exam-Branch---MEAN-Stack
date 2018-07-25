import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reg_number: String;
  pass: String;
  // student: Student;

  // form: FormGroup  = new FormGroup({
  //   username: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required)
  // });
  
  constructor(
    private router:Router,
    private studentservice:StudentService,
    private flash:FlashMessagesService
    ) { }

  ngOnInit() {
    // if (this._user.userLoggedIn) {
    //   this.router.navigateByUrl('/admin');
    // }
  }

  loginuser1(){
    const user = {
      reg_number: this.reg_number,
      pass: this.pass
    }

    this.studentservice.loginuser(user).subscribe(res => {
      if(res.state){
        this.studentservice.storeData(res.token, res.user);
        this.flash.show('Successfully logged', { cssClass: 'alert-success', timeout: 3000 });
        if(this.studentservice.loadUserType()==11){
          this.router.navigate(['home']);
        }
        else if(this.studentservice.loadUserType()==22){
          this.router.navigate(['stuhome']);
        }
        else{
          this.router.navigate(['']);
        }
      }
      else{
        this.flash.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['']);
      }
    });
  }

  // loginUser(e){
  //   e.preventDefault();
  //   console.log(e);
  //   var username = e.target.elements[0].value;
  //   var password = e.target.elements[1].value;
    
    
  //   if(username == 'admin' && password == 'abc'){
  //     this.router.navigate(['home']);
  //   }else if(username == 'achini' && password == 'achz'){
  //     this.router.navigate(['stuhome']);
  //   }
  // }

}
