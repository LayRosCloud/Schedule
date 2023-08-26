using System;

namespace MVVM.Models
{
    public class Teacher : Model
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Phone { get; set; }

        public Teacher(int id, string name, string lastName, string patronymic, string phone):base(id)
        { 
            this.Name = name;
            this.LastName = lastName;
            this.Patronymic = patronymic;
            this.Phone = phone;
        }

        public override bool Equals(object? obj)
        {
            return id.Equals(((Teacher)obj).id);
        }
    }
}
