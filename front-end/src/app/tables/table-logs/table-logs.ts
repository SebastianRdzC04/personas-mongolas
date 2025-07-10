import { Component, OnInit, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService, Log } from '../../services/log-service';

@Component({
  selector: 'app-table-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-logs.html',
  styleUrl: './table-logs.css'
})
export class TableLogs implements OnInit {
  // Using the new input() syntax from Angular 17+
  pageSize = input(5);
  
  // Using signals for reactive state
  logs = signal<Log[]>([]);
  currentPage = signal(1);
  pageSizeValue = signal(5);
  
  // Computed values with signals
  totalPages = computed(() => Math.ceil(this.logs().length / this.pageSizeValue()));
  displayedLogs = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSizeValue();
    const endIndex = Math.min(startIndex + this.pageSizeValue(), this.logs().length);
    return this.logs().slice(startIndex, endIndex);
  });
  
  pageSizeOptions = [5, 10, 15, 20];
  
  constructor(private logService: LogService) {}
  
  ngOnInit(): void {
    // Initialize pageSize from input
    this.pageSizeValue.set(this.pageSize());
    this.loadLogs();
  }
  
  loadLogs(): void {
    this.logService.getAllLogs().subscribe({
      next: (response) => {
        this.logs.set(response.logs);
        this.updateCurrentPage();
      },
      error: (error) => {
        console.error('Error fetching logs data:', error);
      }
    });
  }
  
  updateCurrentPage(): void {
    if (this.currentPage() > this.totalPages() && this.logs().length > 0) {
      this.currentPage.set(Math.max(1, this.totalPages()));
    }
    
    if (this.currentPage() <= 0 && this.logs().length > 0) {
      this.currentPage.set(1);
    }
  }
  
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  
  onPageSizeChange(size: number): void {
    this.pageSizeValue.set(size);
    this.currentPage.set(1); // Reset to first page when changing page size
    this.updateCurrentPage();
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
