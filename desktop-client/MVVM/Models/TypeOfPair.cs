
namespace MVVM.Models
{
    public class TypeOfPair : DictionaryModel
    {
        public string color { get; set; }
        public TypeOfPair(int id, string name, string color) : base(id, name)
        {
            this.color = color;
        }
        public override bool Equals(object? obj)
        {
            return id.Equals(((TypeOfPair)obj).id);
        }
    }
}
