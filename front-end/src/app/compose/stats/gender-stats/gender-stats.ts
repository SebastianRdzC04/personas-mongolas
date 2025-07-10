import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../../services/stats-service';
import { DobleBarChart } from '../../charts/doble-bar-chart/doble-bar-chart';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-gender-stats',
  imports: [CommonModule, DobleBarChart],
  templateUrl: './gender-stats.html',
  styleUrl: './gender-stats.css',
  standalone: true
})
export class GenderStats implements OnInit {
  private calculator = inject(StatsService);

  genderStats = this.calculator.getGenderStats();
  
  constructor() {
  }
  
  ngOnInit() {
  }
  
  get maleCount(): number {
    return this.genderStats().males.length;
  }
  
  get femaleCount(): number {
    return this.genderStats().females.length;
  }
  
  get data(): { males: Person[], females: Person[] } {
    return this.genderStats();
  }
  
  get isDataLoaded(): boolean {
    return this.genderStats() !== undefined;
  }
}
