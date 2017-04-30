import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiComponent } from './eti.component';

describe('EtiComponent', () => {
  let component: EtiComponent;
  let fixture: ComponentFixture<EtiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
