import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewFormComponent } from './modal-view-form.component';

describe('ModalViewFormComponent', () => {
  let component: ModalViewFormComponent;
  let fixture: ComponentFixture<ModalViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
