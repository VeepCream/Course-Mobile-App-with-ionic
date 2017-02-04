import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Searchbook pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'searchbook'
})
@Injectable()
export class Searchbook {
  /*
    Takes a value and makes it lowercase.
   */
  transform(books, keyword) {
    if(keyword == undefined || keyword == "") return books;
    return books.filter((book) => {
     return book.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }
}
