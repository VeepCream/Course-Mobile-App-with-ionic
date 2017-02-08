import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Platform,
  Nav,
  MenuController
} from 'ionic-angular';
import {
  StatusBar,
  Splashscreen
} from 'ionic-native';
import {
  Storage
} from '@ionic/storage';

import {
  HomePage
} from '../pages/home/home';
import {
  BookPage
} from '../pages/book/book';
import {
  LocalStoragePage
} from '../pages/local-storage/local-storage';
import {
  HWstroragePage
} from '../pages/h-wstrorage/h-wstrorage';
import {
  HWfirebasePage
} from '../pages/h-wfirebase/h-wfirebase';
import {
  HWloginPage
} from '../pages/h-wlogin/h-wlogin';
import {
  DetailPage
} from '../pages/detail/detail';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HWloginPage;
  page: Array < {
    title: string,
    component: any
  } > ;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, private menu: MenuController, public storage: Storage, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.get('user')
        .then((data) => {
          if(data==null){
            this.nav.setRoot(HWloginPage);
          }
          else{
            this.nav.setRoot(HWstroragePage);
          }
        })
        .catch((error) => {
          this.nav.setRoot(HWloginPage);
          console.log("testerror");
        });

    });

    this.page = [{
        title: 'Home',
        component: HomePage
      },
      {
        title: 'Book',
        component: BookPage
      },
      {
        title: 'Detail',
        component: DetailPage
      },
      {
        title: 'LocalStorage',
        component: LocalStoragePage
      },
      {
        title: 'HWstrorage',
        component: HWstroragePage
      },
      {
        title: 'HWfirebase',
        component: HWfirebasePage
      },
      {
        title: 'HWlogin',
        component: HWloginPage
      },

    ];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.menu.toggle();
  }
}
