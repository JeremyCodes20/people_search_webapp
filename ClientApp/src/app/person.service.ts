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
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    };
    console.log(`${person.fName} ${person.lName}`);
    return this.http.post<Person>(this.PEOPLE_API, person);
  }

//   private handleError(error: HttpErrorResponse) {
//   if (error.error instanceof ErrorEvent) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An error occurred:', error.error.message);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong.
//     console.error(
//       `Backend returned code ${error.status}, ` +
//       `body was: ${error.error}`);
//   }
//   // Return an observable with a user-facing error message.
//   return throwError(
//     'Something bad happened; please try again later.');
// }
}
