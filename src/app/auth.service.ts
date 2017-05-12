import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor(private _http: Http) {

  }

  login(usuario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this._http.post('http://localhost:3000/auth/authenticate', usuario,options)
    .map(res => res.json())
    .subscribe(
    token => {
      localStorage.setItem('id_token', token);
    },
    error => console.log(error));
  }

  authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }
}
