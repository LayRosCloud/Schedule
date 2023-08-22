using System.Windows.Input;
using MVVM.Scripts;
using MVVM.ViewModels;
using MVVM.Views.Pages;

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

    public ICommand NavigateToPairs
    {
        get
        {
            return new RelayCommand((obj) =>
            {
                SaveVariables.Instance.PageControl.Content = new PairPage();
            });
        }
    }
}