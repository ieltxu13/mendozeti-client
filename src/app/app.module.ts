import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule, MdDatepickerModule } from '@angular/material';
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
import { ComprobantesComponent } from './comprobantes/comprobantes.component';
import { NuevoComprobanteComponent } from './nuevo-comprobante/nuevo-comprobante.component';
import { FiltroComprobantePipe } from './filtro-comprobante.pipe';
import { PlanillaDeAprobacionComponent } from './planilla-de-aprobacion/planilla-de-aprobacion.component';
import { ListadoDeContactosComponent } from './listado-de-contactos/listado-de-contactos.component';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormularioInscripcionComponent,
    EtiListComponent,
    EtiComponent,
    LoginComponent,
    DetalleInscriptoComponent,
    ComprobantesComponent,
    NuevoComprobanteComponent,
    FiltroComprobantePipe,
    PlanillaDeAprobacionComponent,
    ListadoDeContactosComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgUploaderModule,
    MdNativeDateModule,
    MdDatepickerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: EtiListComponent
      },
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
        path: 'reportes/:id',
        canActivate: [AdminGuard],
        component: ReportesComponent,
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
        canActivate: [AdminGuard],
        component: ComprobantesComponent
      },
      {
        path: 'comprobantes/:etiId/nuevo-comprobante',
        canActivate: [AdminGuard],
        component: NuevoComprobanteComponent
      },
      {
        path: 'planilla-de-aprobacion/:etiId',
        canActivate: [AdminGuard],
        component: PlanillaDeAprobacionComponent
      },
      {
        path: 'listado-de-contactos/:etiId',
        canActivate: [AdminGuard],
        component: ListadoDeContactosComponent
      }
  ])],
  providers: [EtiService, ComprobanteService, AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
