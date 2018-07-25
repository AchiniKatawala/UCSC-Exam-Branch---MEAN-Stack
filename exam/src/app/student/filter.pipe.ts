import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: any, term: any): any {
    //check if search term is undefined
    if(term === undefined) return students;
    //return updated array
    return students.filter(function(student){
      return student.reg_number.toLowerCase().includes(term.toLowerCase());
    });
  }

}
