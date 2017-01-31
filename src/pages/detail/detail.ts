import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';

/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  id: string;
  name: string;
  detail: string;
  created: string;
  photo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.detail = this.navParams.get("detail");
    this.created = this.navParams.get("created");
    this.photo = this.navParams.get("photo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
