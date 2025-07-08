import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../services/people-service';
import { Person } from '../../models/person.model';
import { Subscription } from 'rxjs';
import { BaseModal } from '../../modals/base-modal/base-modal';
import { UpdatePersonForm } from '../../forms/update-person-form/update-person-form';

@Component({
  selector: 'app-table-people',
  standalone: true,
  imports: [CommonModule, BaseModal, UpdatePersonForm],
  templateUrl: './table-people.html',
  styleUrl: './table-people.css'
})
export class TablePeople implements OnInit, OnDestroy {
  people: Person[] = [];
  private personCreatedSubscription: Subscription = new Subscription();
  
  // Modal state management with signals
  isEditModalOpen = signal(false);
  selectedPerson = signal<Person | undefined>(undefined);
  
  // Delete modal state management
  isDeleteModalOpen = signal(false);
  personToDelete = signal<Person | undefined>(undefined);
  
  constructor(private peopleService: PeopleService) {}
  
  ngOnInit(): void {
    this.loadPeople();
    
    // Suscribirse al evento de persona creada
    this.personCreatedSubscription = this.peopleService.personCreated$.subscribe(() => {
      this.loadPeople();
    });
  }
  
  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    this.personCreatedSubscription.unsubscribe();
  }
  
  loadPeople(): void {
    this.peopleService.getAllPeople().subscribe({
      next: (response) => {
        this.people = response.people;
        // Añadimos console log para ver la estructura de los datos
      },
      error: (error) => {
        console.error('Error fetching people data:', error);
      }
    });
  }
  
  openEditModal(person: Person): void {
    this.selectedPerson.set(person);
    this.isEditModalOpen.set(true);
  }
  
  closeEditModal(): void {
    this.isEditModalOpen.set(false);
    this.selectedPerson.set(undefined);
  }
  
  handlePersonUpdated(updated: boolean): void {
    if (updated) {
      this.loadPeople();
      this.closeEditModal();
    }
  }
  
  // Delete modal methods
  openDeleteModal(person: Person): void {
    this.personToDelete.set(person);
    this.isDeleteModalOpen.set(true);
  }
  
  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.personToDelete.set(undefined);
  }
  
  deletePerson(): void {
    const personId = this.personToDelete()?.id;
    
    if (personId) {
      this.peopleService.deletePerson(personId).subscribe({
        next: () => {
          this.loadPeople();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting person:', error);
        }
      });
    }
  }
}
