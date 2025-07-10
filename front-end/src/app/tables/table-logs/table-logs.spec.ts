import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLogs } from './table-logs';

describe('TableLogs', () => {
  let component: TableLogs;
  let fixture: ComponentFixture<TableLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
