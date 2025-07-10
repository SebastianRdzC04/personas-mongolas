import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeStats } from './age-stats';

describe('AgeStats', () => {
  let component: AgeStats;
  let fixture: ComponentFixture<AgeStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
