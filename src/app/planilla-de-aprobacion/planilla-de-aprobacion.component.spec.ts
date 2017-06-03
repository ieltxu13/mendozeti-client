import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaDeAprobacionComponent } from './planilla-de-aprobacion.component';

describe('PlanillaDeAprobacionComponent', () => {
  let component: PlanillaDeAprobacionComponent;
  let fixture: ComponentFixture<PlanillaDeAprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanillaDeAprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaDeAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
