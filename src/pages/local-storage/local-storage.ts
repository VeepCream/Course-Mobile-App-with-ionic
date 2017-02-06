import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AngularFire,FirebaseListObservable} from 'angularfire2'

/*
  Generated class for the LocalStorage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-local-storage',
  templateUrl: 'local-storage.html',
  providers:[Storage]
})
export class LocalStoragePage {
  BookStorage:any;
  Book = {name: '',desc:'',price:''};
  Books : FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public af:AngularFire
    ) {
      this.Books = af.database.list('/books',{
        query:{
          orderByChild : 'price',
          equalTo:"600"
        }
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalStoragePage');
  }
  onAdd(){
    let dataBook ={
      id: new Date().getTime(),
      name: 'tYPESCRIPT ES5/ES6',
      PRICE:550
    }
    this.storage.set('Book',dataBook);
    console.log('TEST')
  }

  onViewData(){
    this.storage.get('Book').then((data)=>{
      this.BookStorage = data;
    });
  }
  onDelete(key){
    this.storage.remove(key).then((data)=>{
      console.log('remove' + key + 'Success')
    });
    console.log('TEST')
  }
  addBook(Book){
    this.Books.push(Book);
    console.log('add Book');
    this.Book = {name: '',desc:'',price:''};
  }

  

}
