namespace MVVM.Models;

public class Audience : DictionaryModel
{
    public Audience(int id, string name) : base(id, name)
    {
    }

    public override bool Equals(object? obj)
    {
        Audience audience = obj as Audience;
        return id.Equals(audience.id);
    }
}

