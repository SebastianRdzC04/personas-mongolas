import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLogs } from './people-logs';

describe('PeopleLogs', () => {
  let component: PeopleLogs;
  let fixture: ComponentFixture<PeopleLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
