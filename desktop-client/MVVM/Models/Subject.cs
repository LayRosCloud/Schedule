namespace MVVM.Models
{
    public class Subject
    {
        public int id { get; set; }
        public string FullName { get; set; }
        public string Name { get; set; }

        public Subject(int id, string fullName, string name) 
        {
            this.id = id;
            this.FullName = fullName;
            this.Name = name;
        }
    }
}
