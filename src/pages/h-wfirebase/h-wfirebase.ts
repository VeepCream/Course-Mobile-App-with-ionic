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
  listbook: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public af: AngularFire,

  ) {

    this.Books = af.database.list('/books');
    this.Books_search = af.database.list('/books');
    this.txt_search = "";
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HWfirebasePage');
    this.listbook = [];
    this.Books_search = this.af.database.list('/books');
    this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
      this.listbook.push(profile);
      console.log(profile);

    })
  }

  onAdd() {
    let dataBook = {
      id: new Date().getTime(),
      name: this.Book.name.toUpperCase(),
      desc: this.Book.desc,
      PRICE: this.Book.price
    };

    this.Books.push(dataBook);
    this.listbook = [];

    this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
      this.listbook.push(profile);

    }).unsubscribe();
    console.log('add Book');
    this.Book = {
      name: '',
      desc: '',
      price: ''
    };
  }

  onDelete() {
    this.af.database.list('/books').remove();
    this.listbook = [];

    this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
				this.listbook.push(profile);

			}).unsubscribe();
  }

  removeItem(item) {
    this.af.database.list('/books').remove(item);
    this.listbook = [];

    this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
				this.listbook.push(profile);

			}).unsubscribe();
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
            this.Books.update(item.id, setBook);
            this.listbook = [];

            this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
              this.listbook.push(profile);

            }).unsubscribe();
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
    let Books_search = this.af.database.list('/books');
    this.listbook = [];
    this.onArrayValue(Books_search.$ref).subscribe((profile) => {
      console.log("click");
      this.listbook.push(profile);
      
    }).unsubscribe();
    this.alertsearchbook(this.listbook.length);
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

    if (num > 0 && this.txt_search !== undefined && this.txt_search !== "") {
      prompt.present();
    }

  }

  onArrayValue(ref) {
    return Observable.create((o) => {
      const fn = ref.on('value', (snapshots) => {
        const result = []
        snapshots.forEach((snapshot) => {
          const x = snapshot.val()
          x.id = snapshot.key
          result.push(x)
          o.next(x);
        })

      })
      return () => {
        ref.off('value', fn)
      }
    }).filter((x, index) => {
      console.log(index);
      console.log(x);
      if (this.txt_search == undefined || this.txt_search == "") return true;
      return x.name.toString().toUpperCase().includes(this.txt_search.toUpperCase());
    });
  }


}
