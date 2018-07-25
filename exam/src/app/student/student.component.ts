import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student'; 
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { RouterLink, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// var jsPDF = require('jspdf');
// require('jspdf-autotable');
// import * as jsPDF from 'jspdf';
// // // declare var jsPDF: any; 
// import 'jspdf-autotable';
declare var jsPDF: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  // providers: [StudentService]
})
export class StudentComponent implements OnInit {
  form;
  students: Student[];
  cstudents: Student[]=[];
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
  cpass: string
  tuples = [];

  @ViewChild('content') content: ElementRef;

  constructor(private studentService: StudentService, public router: Router, private flash: FlashMessagesService) {  
   }

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
      pass: this.pass,
      cpass: this.cpass,
      sid: this.sid,
    }
    this.studentService.addStudent(newStudent)
    .subscribe(student => {
      this.students.push(student);
      this.flash.show('Student Registered Successfully', {cssClass: 'alert-success', timeout: 3000});
      
      // if(student.state){
      //   this.flashmessagesservice.show('My component has initialized!', {
      //     classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      //     timeout: 1000, // Default is 3000
      //   });
      // }


      this.studentService.getStudent()
    .subscribe( 
      students => this.students = students,
    () => this.cstudents = this.students, 
      );

      // this.router.navigate(['/student']);
    })
  }

  deleteStudent(id:any){
    var students = this.students;
    this.studentService.deleteStudent(id)
    .subscribe(data =>{
      if(data.n==1){
        for(var i = 0; i< students.length; i++){
          if(students[i]._id == id){
            students.splice(i,1);
          }
        }
      }
    })
    this.flash.show('Deleted Student Details', {cssClass: 'alert-warning', timeout: 3000});
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
    .subscribe( 
      students => this.students = students,
    () => this.cstudents = this.students, 
    this.router.navigate['/student']
      );
  }

  filterBy(filter: string){
    switch(filter){
      case 'all':
        this.students = this.cstudents;
        console.log('show all');
        break;
      case 'ug':
        this.students = this.students.filter(student => {
          return student.stype.includes('Under Graduate');
        });
        console.log('show ug');
        break;
      case 'pg':
        this.students = this.students.filter(student => {
          return student.stype.includes('Post Graduate');
        });
        console.log('show pg ');
        break;
      case 'year1':
        this.students = this.students.filter(student => {
          return student.year.includes('Year 1');
        });
        console.log('show year 1 ');
        break;
      case 'year2':
        this.students = this.students.filter(student => {
          return student.year.includes('Year 2');
        });
        console.log('show year 2 ');
        break;
      case 'year3':
        this.students = this.students.filter(student => {
          return student.year.includes('Year 3');
        });
        console.log('show year 3 ');
        break;
      case 'year4':
        this.students = this.students.filter(student => {
          return student.year.includes('Year 4');
        });
        console.log('show year 4 ');
        break;
  }

  }

  downloadPDF(){
    
    var columns = ["Registration Number", "Index Number", "Full Name", "Year", "Age", "Gender", "Email", "Telephone Number"];

    let content = this.content.nativeElement;
    var rows = [];

    for (let i=0; i<this.students.length; i++) {
      const student = [
        this.students[i].reg_number,
        this.students[i].index_number,
        this.students[i].full_name,
        this.students[i].year,
        this.students[i].age,
        this.students[i].gender,
        this.students[i].email,
        this.students[i].tel
      ]
      rows.push(student);
    }

    // console.log(this.students);
    var doc = new jsPDF();
    
    
    doc.autoTable(columns, rows,{ 
       
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text('Registered Students Details', 14, 28,{
          fontSize: 7,
          
        })
      }
    });
      doc.save('student.pdf');

  }

}

