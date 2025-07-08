import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModal } from '../../modals/base-modal/base-modal';
import { CreatePersonForm } from '../../forms/create-person-form/create-person-form';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [CommonModule, BaseModal, CreatePersonForm],
  templateUrl: './header-dashboard.html',
  styleUrl: './header-dashboard.css'
})
export class HeaderDashboard {
  isCreateModalOpen = false;

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  handlePersonCreated(success: boolean) {
    if (success) {
      this.closeCreateModal();
      // You could add a toast notification here or refresh the table
    }
  }
}
