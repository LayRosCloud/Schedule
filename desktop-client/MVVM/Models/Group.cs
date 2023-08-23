namespace MVVM.Models;

public class Group
{
    public Group(int id, string name)
    {
        this.id = id;
        this.name = name;
    }
    public int id { get; set; }
    public string name { get; set; }
}