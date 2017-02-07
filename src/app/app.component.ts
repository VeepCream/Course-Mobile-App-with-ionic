import { Component ,ViewChild } from '@angular/core';
import { Platform, Nav,MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { BookPage } from '../pages/book/book';
import { LocalStoragePage } from '../pages/local-storage/local-storage';
import { DetailPage } from '../pages/detail/detail';
import {  LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  page: Array<{ title:string, component: any}>;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, private menu:MenuController){
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.page = [
      {title:'Home' , component: HomePage},
      {title:'Book' , component: BookPage},
      {title:'Detail' , component: DetailPage},
      {title:'LocalStorage' , component: LocalStoragePage},
      {title:'Login' , component: LoginPage},
    ];

  }

  openPage(page){
    this.nav.setRoot(page.component);
    this.menu.toggle();
  }
}
