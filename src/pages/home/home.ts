import {
  Component
} from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController,
  ModalController,
  AlertController
} from 'ionic-angular'
import {
  BookPage
} from '../book/book';
import {
  DetailPage
} from '../detail/detail';
import {
  Book
} from '../../providers/book';
import {
  DialogPage
} from '../dialog/dialog'


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
  loadingObj: any;
  txt_search: any;

  constructor(
    public navCtrl: NavController,
    private book: Book,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private model: ModalController,
    private alertCtrl:AlertController) {
    //this.loading();
    this.book.CallBookTwoHttp().subscribe((data) => {
      this.Personal = data;
      
      //this.loadingObj.dismiss();
      //this.toastloading();
    });
  }

  loading() {
    this.loadingObj = this.loadingCtrl.create({
      content: 'loading...',
    });
    this.loadingObj.present();

  }

  toastloading() {
    let loading = this.toastCtrl.create({
      message: 'Load Success',
      duration: 6000,
      position: 'top'
    });
    loading.present();
  }

  gotoDetil(p) {
    let data = {
      id: p.id,
      name: p.name,
      detail: p.detail,
      created: p.created,
      photo: p.photo
    }
    this.navCtrl.push(DetailPage, data);

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

  createModel(){
    let params ={
      id:'123465',
      title: 'Dialog Params'
    }
    let myModel = this.model.create(DialogPage,params);
    myModel.present();
  }
  openAlert(){
    let alert = this.alertCtrl.create({
      title:'Alert Loading Book',
      subTitle: 'alert book load success',
      buttons:[{
        text:'Cancel',
        role:'cancel',
        handler :() =>{

        }
      },
      {
        text:'Confirm',
        handler :() =>{

        }
      }]
    });
    alert.present();
  }
}
