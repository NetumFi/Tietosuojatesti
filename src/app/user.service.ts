import { Injectable } from '@angular/core';
import { User } from './user/user.model';

@Injectable()
export class UserService {

  private user: User = { name: '', title: '', organization: '' };


  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }



}
