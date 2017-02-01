import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Book  } from '../../providers/book';

/*
  Generated class for the Book page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
  providers: [Book],
})
export class BookPage {
  title:string;
  name:string;
  Books: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private book: Book) {}

  ionViewDidLoad() {
    // this.title = this.navParams.get("title");
    // this.name = this.navParams.get("name");
    // console.log('ionViewDidLoad BookPage');
    this.book.CallBookTwoHttp().subscribe((data) => this.Books = data);
  }

  removeItem(index,item){
    this.Books.splice(index,1);
  }

}
