import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(sturepeats: any, term: any): any {
    //check if search term is undefined
    if(term === undefined) return sturepeats;
    //return updated array
    return sturepeats.filter(function(sturepeat){
      return sturepeat.sturepsub_code.toLowerCase().includes(term.toLowerCase());
    });
  }

}
