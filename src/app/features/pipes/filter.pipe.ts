import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../../classes/book'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<Book>, searchText: string): Array<Book> {
    if(!items){
      return [];
    }
    if(!searchText){
      return items
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it=>{
      //return items.filter(it => it.indexOf(searchText) !== -1)
      return it._titleBook.toLocaleLowerCase().includes(searchText)
    });
  }

}
