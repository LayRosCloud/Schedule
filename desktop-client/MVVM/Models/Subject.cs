namespace MVVM.Models
{
    public class Subject : Model
    {
        public string FullName { get; set; }
        public string Name { get; set; }

        public Subject(int id, string fullName, string name) 
            : base(id)
        {
            this.FullName = fullName;
            this.Name = name;
        }
    }
}
