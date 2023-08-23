namespace MVVM.Models;

public abstract class Model
{
    public int id { get; set; }

    public Model(int id)
    {
        this.id = id;
    }
}