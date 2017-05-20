import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoComprobanteComponent } from './nuevo-comprobante.component';

describe('NuevoComprobanteComponent', () => {
  let component: NuevoComprobanteComponent;
  let fixture: ComponentFixture<NuevoComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
