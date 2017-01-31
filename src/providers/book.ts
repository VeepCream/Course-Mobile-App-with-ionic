import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Book provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Book {

  constructor(public http: Http) {
    console.log('Hello Book Provider');
  }

  CallBook(){
    return "hello CallBook Loaded!"
  }

  CallBookPromise(){
    return Promise.resolve('hello book promise');
  }
  
  CallBookHttp(){
    return this.http.get('http://localhost/angular2-service/angular2-Server.php').map((res) => res.json());
  }
  CallBookTwoHttp(){
    return this.http.get('http://thinnydev.com/Angular2-Service/Book.php').map((res) => res.json());
  }

}
