import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Location } from '@angular/common';

import { Person } from '../person';

import { PersonService } from '../person.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  person: Person = {
    id: null,
    fName: "",
    lName: "",
    address: "",
    age: null,
    interests: ""
  };

  constructor(private location: Location,
    @Inject(forwardRef(() => PersonService)) private personService: PersonService) { }

  ngOnInit(): void {
  }

  createPerson(): void {
    this.personService.createPerson(this.person)
      .subscribe(person => this.person = person);
    // this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

}
