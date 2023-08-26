namespace MVVM.Models
{
    public class Time : DictionaryModel
    {
        public Time(int id, string name) : base(id, name)
        {
        }
        public override bool Equals(object? obj)
        {
            Time time = obj as Time;
            return id.Equals(time.id);
        }
    }
}
