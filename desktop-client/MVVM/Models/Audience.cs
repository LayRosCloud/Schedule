namespace MVVM.Models
{
    public class Audience
    {
        public int id { get; set; }
        public string name { get; set; }

        public Audience(int id, string name)
        {
            this.id = id;
            this.name = name;
        }
    }
}
