import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  user: Credentials = {};
  constructor() {}

  loadUser(name: string,
           email: string,
           img: string,
           uid: string,
           provider: string) {
    this.user.name = name;
    this.user.email = email;
    this.user.img = img;
    this.user.uid = uid;
    this.user.provider = provider;
  }

}

export interface Credentials {
  name?: string;
  email?: string;
  img?: string;
  uid?: string;
  provider?: string;
}
