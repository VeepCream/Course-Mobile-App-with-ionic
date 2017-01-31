import {Component} from '@angular/core';
import {NavController,LoadingController,ToastController} from 'ionic-angular'
import {BookPage} from '../book/book';
import {Book} from '../../providers/book';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Book],
})
export class HomePage {
  hello = {
    name: 'veerapat',
    lname: 'preechapant'
  };

  Personal: Object;

  constructor(
    public navCtrl: NavController, 
    private book: Book, 
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController) {
    //this.loading();
    this.toastloading();
    this.book.CallBookTwoHttp().subscribe((data) => {
      this.Personal = data;
    });
  }

  loading(){
    let loading = this.loadingCtrl.create({
      content: 'loading...',
      duration: 3000,
    });
    loading.present();
  }

  toastloading(){
    let loading = this.toastCtrl.create({
      message: 'loading...',
      duration: 3000,
      position:'top'
    });
    loading.present();
  }

  gotoBook() {
    // let data = {
    //   title: "goto Book",
    //   name: 'book Pages'
    // }
    // this.navCtrl.push(BookPage, data);
    // console.log(this.book.CallBook());
    // this.book.CallBookPromise().then((data) => {
    //   console.log(data);
    // });
    this.book.CallBookHttp().subscribe((data) => {
      this.Personal = data;
    });
  }
}
