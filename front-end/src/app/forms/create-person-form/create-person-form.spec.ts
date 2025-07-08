import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonForm } from './create-person-form';

describe('CreatePersonForm', () => {
  let component: CreatePersonForm;
  let fixture: ComponentFixture<CreatePersonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePersonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePersonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
