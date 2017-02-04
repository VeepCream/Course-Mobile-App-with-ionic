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
<<<<<<< HEAD
  txt_search: any;
=======
  Books: any;
>>>>>>> b453eabbac7bf38f6cb0573847c9426718e2d643

  constructor(
    public navCtrl: NavController,
    private book: Book,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private model: ModalController,
    private alertCtrl:AlertController) {
    //this.loading();
    this.book.CallBookTwoHttp().subscribe((data) => {
<<<<<<< HEAD
      this.Personal = data;
      
=======
      //this.Personal = data;
      this.Books =data;
>>>>>>> b453eabbac7bf38f6cb0573847c9426718e2d643
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
  createModelDeteil(index){
    let params ={
      id:this.Books[index].id,
      name: this.Books[index].name,
      detail:this.Books[index].detail,
      created:this.Books[index].created,
      photo:this.Books[index].photo
    }
    let myModel = this.model.create(DetailPage,params);
    myModel.present();
  }

  confirmRemoveItemAlert(index,item){
    let alert = this.alertCtrl.create({
      title:'Alert Delete Item',
      subTitle: 'Are you sure you want to delete this item?',
      buttons:[{
        text:'Cancel',
        role:'cancel',
        handler :() =>{

        }
      },
      {
        text:'Confirm',
        handler :() =>{
          this.removeItem(index,item)
        }
      }]
    });
    alert.present();
  }
  removeItem(index,item){
    this.Books.splice(index,1);
  }
}
