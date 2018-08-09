import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";

@Injectable()
export class SettingsService {

  settings = {
    isLogin: false
  };

  constructor(storage: Storage, private platform: Platform) {
    console.log('Hello SettingsProvider Provider');
  }

  loadStorage() {
    if( this.platform.is("cordova")) {
      // Smarthphone
    } else {
      // Desktop
      if(localStorage.getItem("settings")) {
        this.settings = JSON.parse(localStorage.getItem("settings"));
      }
    }

  }

  saveStorage() {
    if( this.platform.is("cordova")) {
      // Smarthphone
    } else {
      // Desktop
      localStorage.setItem("settings", JSON.stringify(this.settings));

    }

  }



}
