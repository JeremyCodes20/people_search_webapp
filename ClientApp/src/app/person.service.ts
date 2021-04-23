import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  API = 'https://localhost:5001/api';
  PEOPLE_API = `${this.API}/People`;

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    // return of(PEOPLE);
    return this.http.get<Person[]>(this.PEOPLE_API);
  }

  getPerson(id: Number): Observable<Person> {
    return this.http.get<Person>(`${this.PEOPLE_API}/${id}`);
  }

  getPeopleWithNameSearch(query: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.PEOPLE_API}/search?name=${query}`);
  }

  createPerson(person: Person): Observable<Person> {
    delete person.id;
  
    return this.http.post<Person>(this.PEOPLE_API, person);
  }
}
