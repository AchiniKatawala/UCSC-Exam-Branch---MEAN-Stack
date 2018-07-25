import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  students: Student[];
  student: Student;
  reg_number: string;
  full_name: string;
  index_number: string;
  year: string;
  age: string;
  gender: string;
  email: string;
  tel: string;
  stype: string;
  sid: string;
  pass: string;
  cpass: string;

  constructor(private studentService: StudentService, private router: Router, private flash: FlashMessagesService) { }

  addStudent(){
    const newStudent={
      reg_number: this.reg_number,
      full_name: this.full_name,
      index_number: this.index_number,
      year: this.year,
      age: this.age,
      gender: this.gender,
      email: this.email,
      tel: this.tel,
      stype: this.stype,
      sid: this.sid,
      pass: this.pass,
      cpass: this.cpass
    }

    this.studentService.addStudent(newStudent)
    .subscribe(student => {
     this.students.push(student);
     this.flash.show('Student Registered Successfully', {cssClass: 'alert-success', timeout: 3000});
      console.log(student);
      this.router.navigate(['']);
      
      //   this.router.navigate(['/home']);
      // }

      this.studentService.getStudent()
    .subscribe( students => 
      this.students = students );
    })
  }

  ngOnInit() {

    this.form = new FormGroup({
      reg_number: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      index_number: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]{8}')
      ])),
      sid: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[0-9V]{10}')
      ])),
      full_name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])),
      age: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern('[0-9]*')
      ])),
      year: new FormControl("", Validators.compose([
        Validators.required
      ])),
      stype: new FormControl("", Validators.compose([
        Validators.required
      ])),
      gender: new FormControl("", Validators.compose([
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])),
      tel: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])),
      pass: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cpass: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })

    this.studentService.getStudent()
    .subscribe( students => 
      this.students = students );
  }

}
