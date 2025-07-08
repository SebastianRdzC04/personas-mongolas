import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTitle } from './base-title';

describe('BaseTitle', () => {
  let component: BaseTitle;
  let fixture: ComponentFixture<BaseTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
