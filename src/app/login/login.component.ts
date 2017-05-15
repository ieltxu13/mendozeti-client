import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._auth.login(this.usuario)
    .subscribe(() => {
      let user = this._auth.getUser();
      if(user.admin) {
        this._router.navigate(['/eti', user.eti])
      } else {
        this._router.navigate(['/eti', user.eti, 'inscripcion', user.inscripcionId])
      }
    },
    error => {

    });
  }

}
