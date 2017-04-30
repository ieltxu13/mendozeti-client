import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiListComponent } from './eti-list.component';

describe('EtiListComponent', () => {
  let component: EtiListComponent;
  let fixture: ComponentFixture<EtiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
