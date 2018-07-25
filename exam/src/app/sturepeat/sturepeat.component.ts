import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SturepeatService } from '../sturepeat.service';
import { Sturepeat } from '../sturepeat';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RepeatacceptService } from '../repeataccept.service';
import { Repeataccept } from '../repeataccept';

@Component({
  selector: 'app-sturepeat',
  templateUrl: './sturepeat.component.html',
  styleUrls: ['./sturepeat.component.css']
})
export class SturepeatComponent implements OnInit {
  form;
  sturepeats: Sturepeat[];
  sturepeat: Sturepeat;
  sturepreg: string;
  sturepindex: string;
  sturepsub_code: string;
  sturepsub_name: string;
  sturepsub_year: string;
  sturepsub_sem: string;
  repeataccepts: Repeataccept[] = [];
  repeataccept: Repeataccept;
  sreg: string;
  scode: string;

  @ViewChild('content') content: ElementRef;

  constructor(private sturepeatService: SturepeatService, private flash: FlashMessagesService, private repeatacceptservice: RepeatacceptService) { }

  addsturepeat(){
    const newsturepeat={
      sturepreg: this.sturepreg,
      sturepindex: this.sturepindex,
      sturepsub_code: this.sturepsub_code,
      sturepsub_name: this.sturepsub_name,
      sturepsub_year: this.sturepsub_year,
      sturepsub_sem: this.sturepsub_sem
    }
    this.sturepeatService.addsturepeat(newsturepeat)
    .subscribe(sturepeat => {
      this.sturepeats.push(sturepeat);
      this.flash.show('Repeat Request Send Successfully', {cssClass: 'alert-success', timeout: 3000});

      this.sturepeatService.getsturepeat()
    .subscribe( sturepeats => 
      this.sturepeats = sturepeats
    )
    })
  }

  deletesturepeat(id:any){
    var sturepets = this.sturepeats;
    this.sturepeatService.deletesturepeat(id)
    .subscribe(data =>{
      if(data.n==1){
        for(var i = 0; i< sturepets.length; i++){
          if(sturepets[i]._id == id){
            sturepets.splice(i,1);
          }
        }
      }
    })
    this.flash.show('Deleted Repeat Request', {cssClass: 'alert-warning', timeout: 3000});
  }

  ngOnInit() {

    this.form = new FormGroup({
      sturepreg: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sturepindex: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]*')
      ])),
      sturepsub_code: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      sturepsub_name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+')
      ])),
      sturepsub_year: new FormControl("", Validators.compose([
        Validators.required
      ])),
      sturepsub_sem: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })

    this.sturepeatService.getsturepeat()
    .subscribe( sturepeats => 
      this.sturepeats = sturepeats
    )

    this.repeatacceptservice.repeataccepts()
    .subscribe( repeataccepts => 
      this.repeataccepts = repeataccepts
    )
  }


  filterBy(filter: string){
    switch(filter){
      case 'y1s1':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 1')&&sturepeat.sturepsub_sem.includes('Semester 1'));
        });
        console.log('show y1s1 ');
        break;
      case 'y1s2':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 1')&&sturepeat.sturepsub_sem.includes('Semester 2'));
        });
        console.log('show y1s2 ');
        break;
      case 'y2s1':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 2')&&sturepeat.sturepsub_sem.includes('Semester 1'));
        });
        console.log('show y2s1 ');
        break;
      case 'y2s2':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 2')&&sturepeat.sturepsub_sem.includes('Semester 2'));
        });
        console.log('show y2s2 ');
        break;
      case 'y3s1':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 3')&&sturepeat.sturepsub_sem.includes('Semester 1'));
        });
        console.log('show y3s1 ');
        break;
      case 'y3s2':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 3')&&sturepeat.sturepsub_sem.includes('Semester 2'));
        });
        console.log('show y3s2 ');
        break;
      case 'y4s1':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 4')&&sturepeat.sturepsub_sem.includes('Semester 1'));
        });
        console.log('show y4s1 ');
        break;
      case 'y4s2':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return (sturepeat.sturepsub_year.includes('Year 4')&&sturepeat.sturepsub_sem.includes('Semester 2'));
        });
        console.log('show y4s2 ');
        break;
  }

  }

}
