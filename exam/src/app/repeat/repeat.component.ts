import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SturepeatService } from '../sturepeat.service';
import { RepeatacceptService } from '../repeataccept.service';
import { Sturepeat } from '../sturepeat';
import { Repeataccept } from '../repeataccept';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../filter.pipe';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// var jsPDF = require('jspdf');
// require('jspdf-autotable');
// import * as jsPDF from 'jspdf';
declare var jsPDF: any; 

@Component({
  selector: 'app-repeat',
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.css'],
  
})
export class RepeatComponent implements OnInit {
  form;
  isPopupopend = true;
  sturepeats: Sturepeat[];
  sturepeat: Sturepeat;
  sturepreg: string;
  sturepindex: string;
  sturepsub_code: string;
  sturepsub_name: string;
  sturepsub_year: string;
  sturepsub_sem: string;
  searchrepeat: Sturepeat[];
  repeataccepts: Repeataccept[] = [];
  repeataccept: Repeataccept;
  sreg: string;
  scode: string;
  // repeataccepts: Repeataccept[]=[];
  // repeataccept: Repeataccept;
  // asturepreg: string;
  // asturepindex: string;
  // asturepsub_code: string;
  // asturepsub_name: string;
  // asturepsub_year: string;
  // asturepsub_sem: string;

  @ViewChild('content') content: ElementRef;

  constructor(private sturepeatService: SturepeatService, private flash: FlashMessagesService, private repeatacceptservice: RepeatacceptService) { }

  // addsturepeat(){
  //   const newsturepeat={
  //     sturepreg: this.sturepreg,
  //     sturepindex: this.sturepindex,
  //     sturepsub_code: this.sturepsub_code,
  //     sturepsub_name: this.sturepsub_name,
  //     sturepsub_year: this.sturepsub_year,
  //     sturepsub_sem: this.sturepsub_sem
  //   }
  //   this.sturepeatService.addsturepeat(newsturepeat)
  //   .subscribe(sturepeat => {
  //     this.sturepeats.push(sturepeat);
  //     this.flash.show('Repeat Request Send Successfully', {cssClass: 'alert-success', timeout: 3000});
      

  //     this.sturepeatService.getsturepeat()
  //   .subscribe( sturepeats => 
  //     this.sturepeats = sturepeats
  //   )
  //   })
    
  // }

  accept(){
    const newsturepeataccept={
      sreg: this.sreg,
      scode: this.scode
    }
    this.repeatacceptservice.acceptRepeat(newsturepeataccept)
    .subscribe(repeataccept => {
      this.repeataccepts.push(repeataccept);
      this.flash.show('Request Accepted Successfully', {cssClass: 'alert-success', timeout: 3000});
  })
}

  ngOnInit() {

    this.form = new FormGroup({
      sreg: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      scode: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ]))
    })

    this.sturepeatService.getsturepeat()
    .subscribe( sturepeats => {
      this.sturepeats = sturepeats
      
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

  // acceptRepeat(id:any){
  //   this.isPopupopend = true;
  //   const dialogRef = this.dialog.open(RepeatComponent, {
  //     data: {}
  //   })

  // }

  // search(query: string){
  //   this.searchrepeat = (query) ? this.sturepeats.filter(sturepeat =>sturepeat.sturepsub_code.includes(query)) : this.sturepeats;
  // }

  filterBy(filter: string){
    switch(filter){
      case 'ug':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return sturepeat.sturepreg.includes('UG');
        });
        console.log('show ug ');
        break;
      case 'pg':
        this.sturepeats = this.sturepeats.filter(sturepeat => {
          return sturepeat.sturepreg.includes('PG');
        });
        console.log('show pg ');
        break;
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

  downloadPDF(){
    
    var columns = ["Registartion Number", "Index Number", "Code", "Name", "Year", "Semester"];

    let content = this.content.nativeElement;
    var rows = [];

    for (let i=0; i<this.sturepeats.length; i++) {
      const repeat = [
        this.sturepeats[i].sturepreg,
        this.sturepeats[i].sturepindex,
        this.sturepeats[i].sturepsub_code,
        this.sturepeats[i].sturepsub_name,
        this.sturepeats[i].sturepsub_year,
        this.sturepeats[i].sturepsub_sem
      ]
      rows.push(repeat);
    }

    // console.log(this.students);
    var doc = new jsPDF();
    
    
    doc.autoTable(columns, rows,{ 
       
      margin: {top: 35},
      addPageContent: function(data) {
        doc.text('Repeat Students Details', 14, 28,{
          fontSize: 7,
          
        })
      }
    });
      doc.save('Repeat.pdf');

  }

}
