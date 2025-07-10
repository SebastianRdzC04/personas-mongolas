import { Component } from '@angular/core';
import { DashboardLayout } from '../../layout/dashboard-layout/dashboard-layout';
import { CommonModule } from '@angular/common';
import { GenderStats } from '../../compose/stats/gender-stats/gender-stats';
import { AgeStats } from '../../compose/stats/age-stats/age-stats';

@Component({
  selector: 'app-people-stats',
  standalone: true,
  imports: [CommonModule, DashboardLayout, GenderStats, AgeStats],
  templateUrl: './people-stats.html',
  styleUrl: './people-stats.css'
})
export class PeopleStats {
  // Chart data moved from Index component
  chartValue1 = 615; // Revenue value
  chartValue2 = 400; // Expenses value
  
  chartTitle = 'Financial Performance';
  xAxisLabel = 'Categories';
  yAxisLabel = 'Amount (USD)';
  firstDatasetLabel = 'Revenue';
  secondDatasetLabel = 'Expenses';
}
