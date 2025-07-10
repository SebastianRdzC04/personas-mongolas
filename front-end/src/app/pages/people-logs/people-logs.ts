import { Component } from '@angular/core';
import { TableLogs } from '../../tables/table-logs/table-logs';
import { DashboardLayout } from '../../layout/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-people-logs',
  imports: [TableLogs, DashboardLayout],
  templateUrl: './people-logs.html',
  styleUrl: './people-logs.css'
})
export class PeopleLogs {

}
