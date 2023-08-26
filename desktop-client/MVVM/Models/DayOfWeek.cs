namespace MVVM.Models;

public class DayOfWeek : DictionaryModel
{
    public DayOfWeek(int id, string name) : base(id, name)
    {
    }

    public override bool Equals(object? obj)
    {
        return id.Equals(((DayOfWeek)obj).id);
    }
}

