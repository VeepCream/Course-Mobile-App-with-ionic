import {
  Injectable
} from '@angular/core';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';
import {
  AngularFire,
  AngularFireAuth,
  AuthMethods,
  AuthProviders
} from 'angularfire2'
import firebase from 'firebase';

/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Firebase {

  fireAuth :any;
  constructor(public http: Http,af:AngularFire) {
    console.log('Hello Firebase Provider');
    this.fireAuth = firebase.auth();
  }

  AuthEmailAndPassword(email,password){
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

}
