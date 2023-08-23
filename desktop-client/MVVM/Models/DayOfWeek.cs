namespace MVVM.Models
{
    public class DayOfWeek
    {
        public int id {  get; set; }
        public string name { get; set; }

        public DayOfWeek(int id, string name)
        {
            this.id = id;
            this.name = name;
        }
    }
}
