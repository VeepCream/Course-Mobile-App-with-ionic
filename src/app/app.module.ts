import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { LocalStoragePage } from '../pages/local-storage/local-storage';
import { DetailPage } from '../pages/detail/detail';
import { DialogPage } from '../pages/dialog/dialog';
import {DatePipe } from '../pipes/DatePipe'
import {Book} from '../components/book/book'
import { Searchbook} from '../pipes/searchbook'
import {AngularFireModule } from 'angularfire2'
import * as firebase from 'firebase';

export const firebaseConfig ={
  apiKey: "AIzaSyByer6YK9C_A28lMVbb7sjwv6bV5-q49_0",
    authDomain: "ion2-firebase-10b4c.firebaseapp.com",
    databaseURL: "https://ion2-firebase-10b4c.firebaseio.com",
    storageBucket: "ion2-firebase-10b4c.appspot.com",
    messagingSenderId: "995998683685"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    DetailPage,
    DatePipe,
    Book,
    DialogPage,
    Searchbook,
    LocalStoragePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookPage,
    DetailPage,
    DialogPage,
    LocalStoragePage
  ],
  providers: [
    Storage,
    {
    provide: ErrorHandler, 
    useClass: IonicErrorHandler,

  }]
})
export class AppModule {}
