import { Component } from '@angular/core';
import { HeaderDashboard } from '../../compose/header-dashboard/header-dashboard';
import { SideBar } from '../../compose/side-bar/side-bar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [HeaderDashboard, SideBar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

}
