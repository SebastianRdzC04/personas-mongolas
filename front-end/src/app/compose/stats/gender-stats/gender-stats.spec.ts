import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderStats } from './gender-stats';

describe('GenderStats', () => {
  let component: GenderStats;
  let fixture: ComponentFixture<GenderStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
