import { Component } from '@angular/core';

import { NavController } from 'ionic-angular'
import { BookPage } from '../book/book';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hello = {
    name:'veerapat',
    lname:'preechapant'
  };
  constructor(public navCtrl: NavController) {
    
  }

  gotoBook(){
    let data ={
      title :"goto Book",
      name: 'book Pages'
    }
    this.navCtrl.push(BookPage,data);
  }
}
