import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInscriptoComponent } from './detalle-inscripto.component';

describe('DetalleInscriptoComponent', () => {
  let component: DetalleInscriptoComponent;
  let fixture: ComponentFixture<DetalleInscriptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInscriptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInscriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
