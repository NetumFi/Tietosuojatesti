import { Injectable } from '@angular/core';
import { User } from './user/user.model';

@Injectable()
export class UserService {

  private points = 0;
  private user: User = { name: '', title: '', organization: '' };


  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  addPoints(points) {
    this.points += points;
  }

  resetPoints() {
    this.points = 0;
  }

  getPoints() {
    return this.points;
  }

}
