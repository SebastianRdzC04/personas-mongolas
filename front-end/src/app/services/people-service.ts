import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Person, PeopleResponse, createPersonRequest, updatePersonRequest } from '../models/person.model'; // Adjust the import path as necessary

// Define interface for API response


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'http://localhost:3333/people';
  
  // Subject para notificar cuando se crea una nueva persona
  private personCreatedSubject = new Subject<void>();
  public personCreated$ = this.personCreatedSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getAllPeople(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(this.apiUrl);
  }


  createPerson(person: createPersonRequest): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(person: updatePersonRequest, id:number): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person);
  }


  getPersonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Método para notificar que una persona ha sido creada
  notifyPersonCreated(): void {
    this.personCreatedSubject.next();
  }
}
