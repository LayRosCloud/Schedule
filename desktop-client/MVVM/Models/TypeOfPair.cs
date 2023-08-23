namespace MVVM.Models
{
    public class TypeOfPair
    {
        public int id {  get; set; }
        public string name { get; set; }

        public TypeOfPair(int id, string name) 
        {
            this.id = id;
            this.name = name;
        }
    }
}
