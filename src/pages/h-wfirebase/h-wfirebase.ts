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
  items: FirebaseListObservable < any > ;
  txt_search: any;
  go_search: any;
  _currentUser: any;
  listbook: any;
  listbookfilter: any;

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
    this.go_search = ""
    this.Books_search = this.af.database.list('/books');
    this.listbook =[];
    this.listbookfilter = [];
    this.go_search = "";
    this.onArrayValue();
    console.log("result");
  }

  onAdd() {
    let dataBook = {
      id: new Date().getTime(),
      name: this.Book.name.toUpperCase(),
      desc: this.Book.desc,
      PRICE: this.Book.price
    };

    this.go_search = this.txt_search;
    //this.onArrayValue();
    this.af.database.list('/books').push(dataBook);
    console.log('add Book');
    this.Book = {
      name: '',
      desc: '',
      price: ''
    };
  }

  onDelete() {
    this.go_search = this.txt_search;
    this.af.database.list('/books').remove();
    //this.onArrayValue();
  }

  removeItem(item) {
    this.go_search = this.txt_search;
    this.af.database.list('/books').remove(item);
    //this.onArrayValue();
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
            this.go_search = "";
            //this.onArrayValue();
            // this.onArrayValue(this.Books_search.$ref).subscribe((profile) => {
            //   this.listbook.push(profile);

            // }).unsubscribe();
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
    
    let go_search = this.txt_search;
    console.log(this.listbookfilter);
    this.listbook = _.filter(this.listbookfilter, function(o) { 
            if (go_search == undefined || go_search == "") return true;
            return o.name.toString().toUpperCase().includes(go_search.toUpperCase()); 
          });

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

  onArrayValue() {
    
    this.items = this.af.database.list('/books', {
      preserveSnapshot: true
    })
    this.items.subscribe(snapshots => {
      const result = []
        snapshots.forEach(snapshot => {
            const x = snapshot.val()
            x.id = snapshot.key
            result.push(x)
        });
        this.listbookfilter = result;
        this.listbook = result;
        this.txt_search  = "";
        console.log("================test===================")
        console.log(this.listbook);
          //this.alertsearchbook(this.listbook.length);
      })
    // .filter((x, index) => {
    //   console.log(index);
    //   console.log(x);
    //   if (this.go_search == undefined || this.go_search == "") return true;
    //   return x.name.toString().toUpperCase().includes(this.txt_search.toUpperCase());
    // });
  }


}
