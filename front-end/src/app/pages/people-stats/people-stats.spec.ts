import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleStats } from './people-stats';

describe('PeopleStats', () => {
  let component: PeopleStats;
  let fixture: ComponentFixture<PeopleStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
