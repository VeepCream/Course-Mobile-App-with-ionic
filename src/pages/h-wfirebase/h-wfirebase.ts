import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import _ from "lodash";
import {
  Observable,
  BehaviorSubject
} from 'rxjs'

/*
  Generated class for the HWfirebase page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-h-wfirebase',
  templateUrl: 'h-wfirebase.html'
})
export class HWfirebasePage {
  Book = {
    name: '',
    desc: '',
    price: ''
  };
  Books: FirebaseListObservable < any > ;
  Books_search: FirebaseListObservable < any > ;
  txt_search: any;
  _currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public af: AngularFire,
  ) {
    
    this.Books = af.database.list('/books');
    this.Books_search = af.database.list('/books');
    this.txt_search = "";
    console.log(this.Books);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HWfirebasePage');
  }

  onAdd() {
    let dataBook = {
      id: new Date().getTime(),
      name: this.Book.name.toUpperCase(),
      desc: this.Book.desc,
      PRICE: this.Book.price
    };

    this.Books.push(dataBook);
    console.log('add Book');
    this.Book = {
      name: '',
      desc: '',
      price: ''
    };
  }

  onDelete() {
    this.af.database.list('/books').remove();
  }

  removeItem(item) {
    this.af.database.list('/books').remove(item);
  }

  alertEditItem(item) {
    let prompt = this.alertCtrl.create({
      title: 'แก้ไขข้อมูลหนังสือ',
      message: "คุณกำลังแก้ไขข้อมูลหนังสือ " + item.name,
      inputs: [{
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'desc',
          placeholder: 'Desc',
          value: item.desc
        },
        {
          name: 'price',
          placeholder: 'Price',
          value: item.PRICE
        }
      ],
      buttons: [{
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Save',
          handler: data => {
            let setBook = {
              name: data.name.toUpperCase(),
              desc: data.desc,
              PRICE: data.price
            };
            this.Books.update(item, setBook);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  searchbook() {
    // this.Books_search = this.af.database.list('/books', {
    //   query: {
    //     orderByChild: 'name',
    //     startAt: this.txt_search.toUpperCase(),
    //     endAt: (this.txt_search + "-").toUpperCase()
    //   }
    // });
    let Books_search = this.af.database.list('/books').filter( (x, idx) => {
    return x[idx].name.toUpperCase().includes(this.txt_search.toUpperCase());
  });
    
    console.log(Books_search);
    //this.Books_search.map(list=>list.length).subscribe(length=>this.alertsearchbook(length))

  }

  alertsearchbook(num) {

    let prompt = this.alertCtrl.create({
      title: 'ค้นหาหนังสือ',
      message: "ค้นพบหนังสือ " + num + " รายการ",
      buttons: [{
        text: 'ตกลง',
        handler: data => {

        }
      }]
    });

    if (num > 0) {
      prompt.present();
    }

  }


}
