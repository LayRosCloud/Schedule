namespace MVVM.Models
{
    public class Time
    {
        public int id { get; set; }
        public string name { get; set; }

        public Time(int id, string name)
        {
            this.id = id;
            this.name = name;
        }
    }
}
