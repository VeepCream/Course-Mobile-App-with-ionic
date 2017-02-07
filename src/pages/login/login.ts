import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import firebase from 'firebase';
import {
  Firebase as FirebaseProvider
} from '../../providers/firebase'
import {
  AngularFire,
} from 'angularfire2'
import { BookPage } from '../book/book'
import { Facebook } from 'ionic-native'


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [FirebaseProvider]
})
export class LoginPage {
  FB_APP_ID:number=615543821977732;
  user={email:"",password:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbAuth: FirebaseProvider,public af:AngularFire,public viewCtrl:ViewController) {
    Facebook.browserInit(this.FB_APP_ID,"v2.8");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithEmailAndPass(email, pass) {
    this.fbAuth.AuthEmailAndPassword(email, pass)
      .then((data) => {
        console.log(data);
        this.navCtrl.push(BookPage);
        this.navCtrl.setRoot(BookPage);
        this.viewCtrl.showBackButton(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loginWithFacebook() {
     let Permission = ["public_profile"];
     Facebook.login(Permission).then((response) =>{
       console.log(response);
     });
  }

}
