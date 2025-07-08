import { Component, EventEmitter, input, OnInit, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../services/people-service';
import { Person, updatePersonRequest } from '../../models/person.model';

@Component({
  selector: 'app-update-person-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-person-form.html',
  styleUrl: './update-person-form.css',
  standalone: true
})
export class UpdatePersonForm implements OnInit {
  person = input<Person | undefined>(undefined);
  personUpdated = output<boolean>();
  
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
      gender: ['', [Validators.required, Validators.pattern('^(male|female)$')]]
    });

    // Add effect to watch for changes to the person input
    effect(() => {
      const currentPerson = this.person();
      if (currentPerson) {
        this.personForm.patchValue({
          firstName: currentPerson.firstName,
          lastName: currentPerson.lastName,
          age: currentPerson.age,
          gender: currentPerson.gender
        });
      }
    });
  }
  
  ngOnInit(): void {
    // Initial form population handled by effect
  }
  
  onSubmit() {
    if (this.personForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const currentPerson = this.person();
    if (!currentPerson) {
      this.errorMessage = 'No se encontró la persona a actualizar';
      this.isLoading = false;
      return;
    }
    
    const personId = currentPerson.id;
    const personData: updatePersonRequest = {
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      age: this.personForm.value.age,
      gender: this.personForm.value.gender
    };
    
    // Mostrar el body del request en consola antes de enviarlo
    
    this.peopleService.updatePerson(personData, personId).subscribe({
      next: () => {
        this.isLoading = false;
        // Notificar al componente padre que se ha actualizado una persona
        this.personUpdated.emit(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Error al actualizar persona. Intente nuevamente.';
      }
    });
  }
}
