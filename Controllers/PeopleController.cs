using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using people_search_webapp.Models;

namespace people_search_webapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly PersonContext _context;

        public PeopleController(PersonContext context)
        {
            _context = context;

            SeedDatabase();
        }

        // Seed database with example Persons
        public void SeedDatabase()
        {
            if (!_context.Persons.Any())
            {
                Person[] people = new Person[]
                {
                    new Person(FName:"John",
                                LName:"Doe",
                                Address:"243 N. 253 E.",
                                Age: 23,
                                Interests: "Paddleboarding, Surfing"),
                    new Person(FName:"Jacob",
                                LName:"Smith",
                                Address:"353 S. 132 W.",
                                Age: 30,
                                Interests: "Programming, Baseball"),
                    new Person(FName:"Dane",
                                LName:"Littlefield",
                                Address:"234 N. 432 E.",
                                Age: 25,
                                Interests: "Volleyball, Crocheting"),
                };

                foreach (Person person in people)
                {
                    _context.Persons.Add(person);
                    _context.SaveChangesAsync();
                }
            }
            //_context.Persons.Add(person);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            return await _context.Persons.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(long id)
        {
            var person = await _context.Persons.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // GET: api/People/search?name={}
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersonsOfName(String name)
        {
            var query = from person in _context.Persons
                            //where person.FName.ToLower().Contains(name.ToLower())
                            //|| person.LName.ToLower().Contains(name.ToLower())
                        where string.Concat(person.FName, person.LName).ToLower().Contains(name.ToLower().Replace(" ", ""))
                        select person;

            return await query.ToListAsync();
        }

        // PUT: api/People/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(long id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(long id)
        {
            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(long id)
        {
            return _context.Persons.Any(e => e.Id == id);
        }
    }
}
