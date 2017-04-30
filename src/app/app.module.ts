import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EtiService } from './eti.service';
import { AuthService } from './auth.service';
import { FormularioInscripcionComponent } from './formulario-inscripcion/formulario-inscripcion.component';
import { EtiListComponent } from './eti-list/eti-list.component';
import { EtiComponent } from './eti/eti.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormularioInscripcionComponent,
    EtiListComponent,
    EtiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path: 'inscripcion',
        component: FormularioInscripcionComponent
      },
      {
        path: 'etis',
        component: EtiListComponent
      },
      {
        path: 'eti/:id',
        component: EtiComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
  ])],
  providers: [EtiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
