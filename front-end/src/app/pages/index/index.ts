import { Component } from '@angular/core';
import { TablePeople } from '../../tables/table-people/table-people';
import { DashboardLayout } from '../../layout/dashboard-layout/dashboard-layout';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [DashboardLayout, TablePeople],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  // Modal logic has been moved to the header component
}

