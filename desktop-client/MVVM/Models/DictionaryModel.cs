namespace MVVM.Models;

public abstract class DictionaryModel : Model
{
    public string name { get; set; }
    
    protected DictionaryModel(int id, string name) : base(id)
    {
        this.name = name;
    }
}