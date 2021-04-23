using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace people_search_webapp.Models
{
    public class Person
    {
        public Person(string FName, string LName, string Address, int Age, String Interests)
        {
            this.FName = FName;
            this.LName = LName;
            this.Address = Address;
            this.Age = Age;
            this.Interests = Interests;
        }

        public long Id { get; set; }
        public String FName { get; set; }
        public String LName { get; set; }
        public String Address { get; set; }
        public int Age { get; set; }
        public String Interests { get; set; }
    }
}
