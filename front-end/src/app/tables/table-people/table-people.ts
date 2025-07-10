import { Component, OnInit, OnDestroy, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../services/people-service';
import { Person } from '../../models/person.model';
import { Subscription } from 'rxjs';
import { BaseModal } from '../../modals/base-modal/base-modal';
import { UpdatePersonForm } from '../../forms/update-person-form/update-person-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-people',
  standalone: true,
  imports: [CommonModule, BaseModal, UpdatePersonForm, FormsModule],
  templateUrl: './table-people.html',
  styleUrl: './table-people.css'
})
export class TablePeople implements OnInit, OnDestroy {
  @Input() pageSize = 5;
  
  people: Person[] = [];
  displayedPeople: Person[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSizeOptions = [5, 10, 15, 20];
  
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
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching people data:', error);
      }
    });
  }
  
  updatePagination(): void {
    this.totalPages = Math.ceil(this.people.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages);
    if (this.currentPage <= 0 && this.people.length > 0) {
      this.currentPage = 1;
    }
    this.updateDisplayedPeople();
  }
  
  updateDisplayedPeople(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.people.length);
    this.displayedPeople = this.people.slice(startIndex, endIndex);
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedPeople();
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedPeople();
    }
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedPeople();
    }
  }
  
  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
    // Limit to maximum of 20
    if (this.pageSize > 20) this.pageSize = 20;
    if (this.pageSize < 1) this.pageSize = 1;
    
    this.updatePagination();
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
