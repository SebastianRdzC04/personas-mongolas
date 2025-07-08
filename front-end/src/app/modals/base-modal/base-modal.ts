import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-modal.html',
  styleUrl: './base-modal.css'
})
export class BaseModal {
  isOpen = input<boolean>(false);
  title = input<string>('Modal Title');
  close = output<void>();

  closeModal(): void {
    this.close.emit();
  }
}
