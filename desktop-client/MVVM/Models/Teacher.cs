using System;

namespace MVVM.Models
{
    public class Teacher
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Phone { get; set; }

        public Teacher(int id, string name, string lastName, string patronymic, string phone) 
        { 
            this.id = id;
            this.Name = name;
            this.LastName = lastName;
            this.Patronymic = patronymic;
            this.Phone = phone;
        }
    }
}
