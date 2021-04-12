import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFormComponent } from './modal-edit-form.component';

describe('ModalEditFormComponent', () => {
  let component: ModalEditFormComponent;
  let fixture: ComponentFixture<ModalEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
