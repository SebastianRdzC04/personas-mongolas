import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people-service';
import { createPersonRequest } from '../../models/person.model';

@Component({
  selector: 'app-create-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-person-form.html',
  styleUrl: './create-person-form.css',
  standalone: true
})
export class CreatePersonForm {
  @Output() personCreated = new EventEmitter<boolean>();
  
  personForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService
  ) {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', [Validators.required, Validators.pattern('^(male|female)$')]] // Validación para género
    });
  }
  
  onSubmit() {
    if (this.personForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const personData: createPersonRequest = {
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      age: this.personForm.value.age,
      gender: this.personForm.value.gender
    };
    
    // Mostrar el body del request en consola antes de enviarlo
    console.log('Request body a enviar:', personData);
    
    this.peopleService.createPerson(personData).subscribe({
      next: () => {
        this.isLoading = false;
        this.personForm.reset();
        // Notificar al servicio que se ha creado una persona
        this.peopleService.notifyPersonCreated();
        this.personCreated.emit(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Error al crear persona. Intente nuevamente.';
      }
    });
  }
}
