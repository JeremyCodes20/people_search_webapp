import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router,
    @Inject(forwardRef(() => PersonService)) private personService: PersonService) { }

  ngOnInit(): void {
  }

  createPerson(): void {
    const observePost = {
      next: person => this.person = person,
      error: err => console.error('Error occurred during POST: ' + err),
      complete: () => this.router.navigate([`detail/${this.person.id}`])
    };
    this.personService.createPerson(this.person)
      .subscribe(observePost);
    // this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

}
