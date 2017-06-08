import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeContactosComponent } from './listado-de-contactos.component';

describe('ListadoDeContactosComponent', () => {
  let component: ListadoDeContactosComponent;
  let fixture: ComponentFixture<ListadoDeContactosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDeContactosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
