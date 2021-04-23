# People Search application

## Jeremy Young

young.a.jeremy@gmail.com

(385)-282-8822

This is my submission for the Technical Challenge in my application for the
Software Developer Internship position at Health Catalyst.

### Instructions:

Using the .NET CLI, run the following instructions:

```$ dotnet build```

```$ dotnet run```

Then, navigate to [localhost:5001](https://localhost:5001/)

#### The People Search Application
Business Requirements:

* The application accepts search input in a text box and then displays in a pleasing style a list of people where any part of their first or last name matches what was typed in the search box (displaying at least name, address, age, interests, and a picture).   

* Solution should either seed data or provide a way to enter new users or both.  

* Simulate search being slow and have the UI gracefully handle the delay.

Technical Requirements:

* A Web Application using WebAPI and a front-end JavaScript framework (e.g., Angular, React, etc.)   

* Use an ORM framework to talk to the database  

* Unit Tests for appropriate parts of the application   

This application uses Angular and WebApi. EntityFramework was chosen as the ORM.

Each time the application is run, three Persons are seeded into the database. 
New Persons can additionally be created via a form accessed from the home page.

After entering a query, the user is presented with a list of matching results. 
Clicking on any result will take the user to a page including all details about the 
person.