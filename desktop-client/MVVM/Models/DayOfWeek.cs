namespace MVVM.Models;

public class DayOfWeek : DictionaryModel
{
    public DayOfWeek(int id, string name) : base(id, name)
    {
    }

    public override bool Equals(object? obj)
    {
        DayOfWeek dayOfWeek = obj as DayOfWeek;
        return id.Equals(dayOfWeek.id);
    }
}

