import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StusubjectService } from '../stusubject.service';
import { StuSubject } from '../stusubject'; 
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-stusubject',
  templateUrl: './stusubject.component.html',
  styleUrls: ['./stusubject.component.css']
})
export class StusubjectComponent implements OnInit {
  user:Object;
  form;
  stusubjects: StuSubject[];
  cstusubjects: StuSubject[] = [];
  stusubject: StuSubject;
  stusub_code: string;
  stusub_name: string;
  stusub_year: string;
  stusub_sem: string;

  @ViewChild('content') content: ElementRef;

  constructor(private stusubjectService: StusubjectService, private flash: FlashMessagesService) { }

  addstuSubject(){
    const newstuSubject={
      stusub_code: this.stusub_code,
      stusub_name: this.stusub_name,
      stusub_year: this.stusub_year,
      stusub_sem: this.stusub_sem
    }
    this.stusubjectService.addstuSubject(newstuSubject)
    .subscribe(stusubject => {
      this.stusubjects.push(stusubject);
      this.flash.show('Subject Added Successfully', {cssClass: 'alert-success', timeout: 3000});

      this.stusubjectService.getstuSubject()
      .subscribe( 
        stusubjects => this.stusubjects = stusubjects,
        () => this.cstusubjects = this.stusubjects
      );
    })
  }

  deletestuSubject(id:any){
    var subjects = this.stusubjects;
    this.stusubjectService.deletestuSubject(id)
    .subscribe(data =>{
      if(data.n==1){
        for(var i = 0; i< subjects.length; i++){
          if(subjects[i]._id == id){
            subjects.splice(i,1);
          }
        }
      }
    })
    this.flash.show('Deleted Added Stubject', {cssClass: 'alert-warning', timeout: 3000});
  }

  ngOnInit() {

    this.form = new FormGroup({
      stusub_code: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      stusub_name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      stusub_year: new FormControl("",Validators.required),
      stusub_sem: new FormControl("",Validators.required)
    })

    this.stusubjectService.getstuSubject()
    .subscribe( 
      stusubjects => this.stusubjects = stusubjects,
      () => this.cstusubjects = this.stusubjects
    );
  }

  filterBy(filter: string){
    switch(filter){
      // case 'all':
      //   this.stusubjects = this.cstusubjects;
      //   console.log('show all ');
      //   break;
      case 'y1s1':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 1')&&stusubject.stusub_sem.includes('Semester 1'));
        });
        console.log('show y1s1 ');
        break;
      case 'y1s2':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 1')&&stusubject.stusub_sem.includes('Semester 2'));
        });
        console.log('show y1s2 ');
        break;
      case 'y2s1':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 2')&&stusubject.stusub_sem.includes('Semester 1'));
        });
        console.log('show y2s1 ');
        break;
      case 'y2s2':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 2')&&stusubject.stusub_sem.includes('Semester 2'));
        });
        console.log('show y2s2');
        break;
      case 'y3s1':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 3')&&stusubject.stusub_sem.includes('Semester 1'));
        });
        console.log('show y3s1 ');
        break;
      case 'y3s2':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 3')&&stusubject.stusub_sem.includes('Semester 2'));
        });
        console.log('show y3s2 ');
        break;
      case 'y4s1':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 4')&&stusubject.stusub_sem.includes('Semester 1'));
        });
        console.log('show y4s1 ');
        break;
      case 'y4s2':
        this.stusubjects = this.stusubjects.filter(stusubject => {
          return (stusubject.stusub_year.includes('Year 4')&&stusubject.stusub_sem.includes('Semester 2'));
        });
        console.log('show y4s2 ');
        break;
  }

  }

}
