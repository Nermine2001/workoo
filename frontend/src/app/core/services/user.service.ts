import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://127.0.0.1:3000/users/';

  constructor( private http: HttpClient ) { }

  getUserCount(){
    return this.http.get<{ count: number }>(this.url + 'count');
  }

  register( user: any ){
    return this.http.post(this.url + 'register', user);
  }

  login( user: any ){
    return this.http.post(this.url + 'login',user);
  }

  getUserById( id: any ){
    return this.http.get(this.url + id);
  }

  editUser( id: any, userData: any ){
    return this.http.put(this.url + 'edit/' + id,userData);
  }

  isLoggedIn(){

    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }else{
      return false;
    }

    //return !!localStorage.getItem('token');
  }

  getUserIdFromToken(){
    let token = localStorage.getItem('token');
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      let payloadJson = JSON.parse(payload);
      return payloadJson.id;

      //return JSON.parse(window.atob(token.split('.')[1])).id;
    }
  }
}

