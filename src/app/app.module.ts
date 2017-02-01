import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { DetailPage } from '../pages/detail/detail';
import { DialogPage } from '../pages/dialog/dialog';
import {DatePipe } from '../pipes/DatePipe'
import {Book} from '../components/book/book'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    DetailPage,
    DatePipe,
    Book,
    DialogPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookPage,
    DetailPage,
    DialogPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
