import { Injectable, signal, Signal, effect } from '@angular/core';
import { PeopleService } from '../services/people-service'; 
import { Person } from '../models/person.model'; 

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  // Define signals for stats
  private genderStats = signal<{ males: Person[], females: Person[] }>({ males: [], females: [] });
  private ageStats = signal<{ minors: Person[], adults: Person[] }>({ minors: [], adults: [] });

  constructor(private peopleService: PeopleService) {
    // Initialize data when service is instantiated
    this.loadGenderStats();
    this.loadAgeStats();
    
    // Subscribe to person created events to refresh stats
    this.peopleService.personCreated$.subscribe(() => {
      console.log('Person created, refreshing stats...');
      this.loadGenderStats();
      this.loadAgeStats();
    });
    
    // Create effect to monitor stats updates
    effect(() => {
      this.genderStats();
      this.ageStats()
    });
  }

  // Method to load/refresh gender stats
  loadGenderStats(): void {
    this.peopleService.getAllPeople().subscribe(response => {
      const males = response.people.filter(person => person.gender === 'male');
      const females = response.people.filter(person => person.gender === 'female');
      this.genderStats.set({ males, females });
    });
  }

  // Method to load/refresh age stats
  loadAgeStats(): void {
    this.peopleService.getAllPeople().subscribe(response => {
      const minors = response.people.filter(person => person.age < 18);
      const adults = response.people.filter(person => person.age >= 18);
      this.ageStats.set({ minors, adults });
    });
  }

  // Getter method for gender stats signal
  getGenderStats(): Signal<{ males: Person[], females: Person[] }> {
    return this.genderStats.asReadonly();
  }

  // Getter method for age stats signal
  getAgeStats(): Signal<{ minors: Person[], adults: Person[] }> {
    return this.ageStats.asReadonly();
  }
}
