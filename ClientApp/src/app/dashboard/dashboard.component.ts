import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';

import { Person } from '../person';

import { PersonService } from '../person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() query: string = "";
  people: Person[] = [];
  waiting: boolean = false;

  constructor(
    @Inject(forwardRef(() => PersonService)) private personService: PersonService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.waiting = true;

    // simulate slow response
    setTimeout(() => {
      this.waiting = false;

      if (this.query === "") {
        this.personService.getPeople()
          .subscribe(people => this.people = people);
      }
      else {
        this.personService.getPeopleWithNameSearch(this.query)
          .subscribe(people => this.people = people);
      }
    }, 2000);
  }
}
