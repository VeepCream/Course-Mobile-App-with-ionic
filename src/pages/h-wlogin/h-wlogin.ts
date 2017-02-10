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
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';
import {
  HWstroragePage
} from '../h-wstrorage/h-wstrorage'

/*
  Generated class for the HWlogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-h-wlogin',
  templateUrl: 'h-wlogin.html'
})
export class HWloginPage {

  userFB: FirebaseListObservable < any > ;
  user = {
    name: '',
    pass: ''
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    private alertCtrl: AlertController,
    public storage: Storage, ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HWloginPage');
  }
  login() {
    console.log('ionViewDidLoad HWloginPage');
    this.userFB = this.af.database.list('/user', {
      query: {
        orderByChild: "user",
        equalTo: this.user.name
      }
    });
    this.userFB.subscribe(snapshots => {
      const result = [];
      snapshots.forEach(snapshot => {
        const x = snapshot.val()
        x.id = snapshot.key
        result.push(x)
      });
      if (result[0].user == this.user.name && result[0].pass == this.user.pass) {
        let user ={
          name: this.user.name,
          pass: this.user.pass
        }
        this.storage.set('user',user);
        this.navCtrl.push(HWstroragePage);
      }
    });
  }

  createAccount() {
    let prompt = this.alertCtrl.create({
      title: 'สร้างAccount',
      message: "กรุงณากรอก Name และ Password",
      inputs: [{
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'pass',
          placeholder: 'Password'
        }
      ],
      buttons: [{
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Create',
          handler: data => {
            let setuser = {
              name: data.name,
              pass: data.pass
            };
            this.af.database.list('/user').push(setuser);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
