import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import {
  Storage
} from '@ionic/storage';

/*
  Generated class for the HWstrorage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-h-wstrorage',
  templateUrl: 'h-wstrorage.html',
  providers: [Storage]
})
export class HWstroragePage {

  Book = {
    name: '',
    desc: '',
    price: ''
  };
  Books: any;
  txt_search:any;
  Books_search:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,private alertCtrl:AlertController) {
    this.storage.get('Book')
      .then((data) => {
        this.Books = data;
        this.Books_search= data;
      })
      .catch((error) => {
        this.Books =[];
      });
      this.txt_search ="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HWstroragePage');
  }

  onAdd() {
    let dataBook = {
      id: new Date().getTime(),
      name: this.Book.name,
      desc: this.Book.desc,
      PRICE: this.Book.price
    };

    
    this.storage.get('Book')
      .then((data) => {
        let BookStorage = data;
        console.log(JSON.stringify(data));
        BookStorage.push(dataBook);
        this.Books=BookStorage;
        this.Books_search=BookStorage;
        this.txt_search ="";
        this.storage.set('Book', BookStorage);
        this.Book = {
          name: '',
          desc: '',
          price: ''
        };
        console.log('TEST1')
      })
      .catch((error) => {
        this.storage.set('Book', [dataBook]);
        this.Books=[dataBook];
        this.Books_search=[dataBook];
        this.txt_search ="";
        this.Book = {
          name: '',
          desc: '',
          price: ''
        };
        console.log('TEST2')
      });
  }

  onDelete(key){
    this.storage.remove(key).then((data)=>{
      console.log('remove' + key + 'Success')
    });
    this.Books=[];
    this.Books_search=[];
    this.txt_search ="";
    console.log('TEST')
  }

  removeItem(index,item){
    this.Books.splice(index,1);
    this.Books_search=this.Books;
    this.txt_search ="";
    this.storage.set('Book', this.Books);
  }

  alertEditItem(index){
    let prompt = this.alertCtrl.create({
      title: 'แก้ไขข้อมูลหนังสือ',
      message: "คุณกำลังแก้ไขข้อมูลหนังสือ " + this.Books[index].name,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value:this.Books[index].name
        },
        {
          name: 'desc',
          placeholder: 'Desc',
          value:this.Books[index].desc
        },
        {
          name: 'price',
          placeholder: 'Price',
          value:this.Books[index].PRICE
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.Books[index].name = data.name
            this.Books[index].desc = data.desc
            this.Books[index].PRICE = data.PRICE
            this.storage.set('Book', this.Books);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  searchbook() {
    this.Books_search = this.transform(this.txt_search);
    let prompt = this.alertCtrl.create({
      title: 'ค้นหาหนังสือ',
      message: "ค้นพบหนังสือ " + this.Books_search.length + " รายการ",
      buttons: [
        {
          text: 'ตกลง',
          handler: data => {
            
          }
        }
      ]
    });
    
    if(this.Books_search.length > 0){
      prompt.present();
    }

  }

  transform(keyword) {
    if(keyword == undefined || keyword == "") return this.Books;
    return this.Books.filter((book) => {
     return book.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

}
