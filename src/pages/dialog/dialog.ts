import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

/*
  Generated class for the Dialog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dialog',
  templateUrl: 'dialog.html'
})
export class DialogPage {

  dialogParams: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DialogPage');
    console.log(this.navParams);
    this.dialogParams={
      id : this.navParams.get('id'),
      title : this.navParams.get('title'),
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  

}
