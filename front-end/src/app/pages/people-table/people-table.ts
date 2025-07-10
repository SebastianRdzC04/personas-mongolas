import { Component } from '@angular/core';
import { TablePeople } from '../../tables/table-people/table-people';
import { DashboardLayout } from '../../layout/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-people-table',
  imports: [TablePeople, DashboardLayout],
  templateUrl: './people-table.html',
  styleUrl: './people-table.css'
})
export class PeopleTable {

}
