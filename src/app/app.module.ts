import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgUploaderModule } from 'ngx-uploader';

import 'hammerjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EtiService } from './eti.service';
import { ComprobanteService } from './comprobante.service';
import { AuthService } from './auth.service';
import { AdminGuard } from './app.admin-guard.service';
import { FormularioInscripcionComponent } from './formulario-inscripcion/formulario-inscripcion.component';
import { EtiListComponent } from './eti-list/eti-list.component';
import { EtiComponent } from './eti/eti.component';
import { LoginComponent } from './login/login.component';
import { DetalleInscriptoComponent } from './detalle-inscripto/detalle-inscripto.component';
import { EtiListPipe } from './eti-list.pipe';
import { FiltroEstadoPipe } from './filtro-estado.pipe';
import { ComprobantesComponent } from './comprobantes/comprobantes.component';
import { NuevoComprobanteComponent } from './nuevo-comprobante/nuevo-comprobante.component';
import { FiltroComprobantePipe } from './filtro-comprobante.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormularioInscripcionComponent,
    EtiListComponent,
    EtiComponent,
    LoginComponent,
    DetalleInscriptoComponent,
    EtiListPipe,
    FiltroEstadoPipe,
    ComprobantesComponent,
    NuevoComprobanteComponent,
    FiltroComprobantePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgUploaderModule,
    RouterModule.forRoot([
      {
        path: 'inscripcion',
        component: FormularioInscripcionComponent
      },
      {
        path: 'etis',
        canActivate: [AdminGuard],
        component: EtiListComponent
      },
      {
        path: 'eti/:id',
        component: EtiComponent,
      },
      {
        path: 'eti/:etiId/inscripcion/:inscripcionId',
        component: DetalleInscriptoComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'comprobantes/:etiId',
        component: ComprobantesComponent
      },
      {
        path: 'comprobantes/:etiId/nuevo-comprobante',
        component: NuevoComprobanteComponent
      }
  ])],
  providers: [EtiService, ComprobanteService, AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
