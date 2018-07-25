import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-stuexam',
  templateUrl: './stuexam.component.html',
  styleUrls: ['./stuexam.component.css']
})
export class StuexamComponent implements OnInit {
  subjects: Subject[];
  subject: Subject;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
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

}
