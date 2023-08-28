namespace MVVM.Models;

public class Audience : DictionaryModel
{
    public string fullName { get; set; }
    public Corpus corpu { get; set; }
    public Audience(int id, string name, Corpus corpu) : base(id, name)
    {
        this.corpu = corpu;
        fullName = $"ауд. {name} к. {corpu?.name}";
    }

    public override bool Equals(object? obj)
    {
        return (obj as Audience).id.Equals(id);
    }
}

