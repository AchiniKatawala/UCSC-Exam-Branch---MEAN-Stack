import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject'; 
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
// var jsPDF = require('jspdf');
// require('jspdf-autotable');
// import * as jsPDF from 'jspdf';
declare var jsPDF: any; 


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  form;
  subjects: Subject[];
  subject: Subject;
  sub_code: string;
  sub_name: string;
  sub_year: string;
  sub_sem: string;
  sub_examDate: string;
  sub_time: string;
  sub_etime: string;
  sub_venue: string;
  sub_type: string;
  sub_other: string;

  @ViewChild('content') content: ElementRef;

  constructor(private subjectService: SubjectService, private flash: FlashMessagesService) { }

  addSubject(){
    const newSubject={
      sub_code: this.sub_code,
      sub_name: this.sub_name,
      sub_year: this.sub_year,
      sub_sem: this.sub_sem,
      sub_examDate: this.sub_examDate,
      sub_time: this.sub_time,
      sub_etime: this.sub_etime,
      sub_venue: this.sub_venue,
      sub_type: this.sub_type,
      sub_other: this.sub_other
    }
    this.subjectService.addSubject(newSubject)
    .subscribe(subject => {
      this.subjects.push(subject);
      this.flash.show('Exam Details Added Successfully', {cssClass: 'alert-success', timeout: 3000});

      this.subjectService.getSubject()
    .subscribe( subjects => 
      this.subjects = subjects
    )
    })
  }

  deleteSubject(id:any){
    var subjects = this.subjects;
    this.subjectService.deleteSubject(id)
    .subscribe(data =>{
      if(data.n==1){
        for(var i = 0; i< subjects.length; i++){
          if(subjects[i]._id == id){
            subjects.splice(i,1);
          }
        }
      }
    })
    this.flash.show('Deleted Exam Details', {cssClass: 'alert-warning', timeout: 3000});
  }

  ngOnInit() {
    this.form = new FormGroup({
      sub_code: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sub_name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])),
      sub_examDate: new FormControl("",Validators.required),
      sub_venue: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sub_year: new FormControl("",Validators.required),
      sub_sem: new FormControl("",Validators.required),
      sub_time: new FormControl("",Validators.required),
      sub_etime: new FormControl("",Validators.required),
      sub_type: new FormControl("",Validators.required),
      sub_other: new FormControl()
    })

    this.subjectService.getSubject()
    .subscribe( subjects => {
      this.subjects = subjects
    })
  }

  filterBy(filter: string){
    switch(filter){
      case 'ug':
        this.subjects = this.subjects.filter(subject => {
          return subject.sub_code.includes('SUG');
        });
        console.log('show ug ');
        break;
      case 'pg':
        this.subjects = this.subjects.filter(subject => {
          return subject.sub_code.includes('SPG');
        });
        console.log('show pg ');
        break;
      case 'y1s1':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 1')&&(subject.sub_sem.includes('Semester 1')));
        });
        console.log('show y1s1 ');
        break;
      case 'y1s2':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 1')&&(subject.sub_sem.includes('Semester 2')));
        });
        console.log('show y1s2 ');
        break;
      case 'y2s1':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 2')&&(subject.sub_sem.includes('Semester 1')));
        });
        console.log('show y2s1 ');
        break;
      case 'y2s2':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 2')&&(subject.sub_sem.includes('Semester 2')));
        });
        console.log('show y2s2 ');
        break;
      case 'y3s1':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 3')&&(subject.sub_sem.includes('Semester 1')));
        });
        console.log('show y3s1 ');
        break;
      case 'y3s2':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 3')&&(subject.sub_sem.includes('Semester 2')));
        });
        console.log('show y3s2 ');
        break;
      case 'y4s1':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 4')&&(subject.sub_sem.includes('Semester 1')));
        });
        console.log('show y4s1 ');
        break;
      case 'y4s2':
        this.subjects = this.subjects.filter(subject => {
          return (subject.sub_year.includes('Year 4')&&(subject.sub_sem.includes('Semester 2')));
        });
        console.log('show y4s2 ');
        break;
  }

  }

  downloadPDF(){
    
    var columns = ["Code", "Name", "Year", "Semester", "Type", "Date", "Start Time", "End Time", "Venue", "Special Notice"];

    let content = this.content.nativeElement;
    var rows = [];

    for (let i=0; i<this.subjects.length; i++) {
      const subject = [
        this.subjects[i].sub_code,
        this.subjects[i].sub_name,
        this.subjects[i].sub_year,
        this.subjects[i].sub_sem,
        this.subjects[i].sub_type,
        this.subjects[i].sub_examDate,
        this.subjects[i].sub_time,
        this.subjects[i].sub_etime,
        this.subjects[i].sub_venue,
        this.subjects[i].sub_other
      ]
      rows.push(subject);
    }

    // console.log(this.students);
    var doc = new jsPDF();
    
    
    doc.autoTable(columns, rows,{ 
       
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text('Exam Time Table', 14, 28,{
          fontSize: 7,
          
        })
      }
    });
      doc.save('ExamTimeTable.pdf');

  }

  

}
