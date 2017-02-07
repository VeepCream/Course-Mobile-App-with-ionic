import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2';

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

  user = {
      name: '',
      pass: ''
    };

  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HWloginPage');
  }
  login() {
    console.log('ionViewDidLoad HWloginPage');
  }

}
