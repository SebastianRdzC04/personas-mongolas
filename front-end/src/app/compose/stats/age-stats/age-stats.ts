import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../../services/stats-service';
import { DobleBarChart } from '../../charts/doble-bar-chart/doble-bar-chart';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-age-stats',
  imports: [CommonModule, DobleBarChart],
  templateUrl: './age-stats.html',
  styleUrl: './age-stats.css',
  standalone: true
})
export class AgeStats implements OnInit {
  private calculator = inject(StatsService);

  // Get the signal directly
  ageStats = this.calculator.getAgeStats();
  
  constructor() {
  }
  
  ngOnInit() {
  }
  
  // Getter methods to access signal data
  get minorsCount(): number {
    return this.ageStats().minors.length;
  }
  
  get adultsCount(): number {
    return this.ageStats().adults.length;
  }
  
  get data(): { minors: Person[], adults: Person[] } {
    return this.ageStats();
  }
  
  get isDataLoaded(): boolean {
    return this.ageStats() !== undefined;
  }
}
