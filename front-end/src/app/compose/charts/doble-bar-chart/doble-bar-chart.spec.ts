import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobleBarChart } from './doble-bar-chart';

describe('DobleBarChart', () => {
  let component: DobleBarChart;
  let fixture: ComponentFixture<DobleBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DobleBarChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobleBarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
