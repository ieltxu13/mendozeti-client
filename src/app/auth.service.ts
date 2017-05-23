import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  public user: any;
  constructor(private _http: Http, private _router: Router) {
    var token = localStorage.getItem('id_token');
    if(token) {
      this.user = this.jwtHelper.decodeToken(token);
    }
  }

  login(usuario) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let authSubscription = this._http.post(`${environment.baseUrl}/auth/authenticate`, usuario,options)
    .map(res => res.json())
    authSubscription.subscribe(
    token => {
      localStorage.setItem('id_token', token);
      this.user = this.jwtHelper.decodeToken(token);
    },
    error => console.log(error));

    return authSubscription;
  }

  authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  getUser(){
    var token = localStorage.getItem('id_token');

    return this.authenticated() ? this.jwtHelper.decodeToken(token) : false;
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this._router.navigate(['/login']);

  }
}
