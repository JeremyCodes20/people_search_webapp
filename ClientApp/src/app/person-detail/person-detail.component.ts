import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Person } from '../person';

import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person: Person;

  constructor(
    @Inject(forwardRef(() => PersonService)) private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personService.getPerson(id)
      .subscribe(person => this.person = person);
  }
}
