import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonForm } from './update-person-form';

describe('UpdatePersonForm', () => {
  let component: UpdatePersonForm;
  let fixture: ComponentFixture<UpdatePersonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePersonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePersonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
