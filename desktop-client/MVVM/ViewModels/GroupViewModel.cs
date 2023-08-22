using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Windows.Input;
using MVVM.Models;

namespace MVVM.ViewModels;

public class GroupViewModel : ViewModelBase
{
    private ObservableCollection<Group> _groups = new();
    
    public GroupViewModel()
    {
        ItemClickedCommand = new RelayCommand(OnItemClicked);
        Groups.Add(new Group(1, "И-31"));
        Groups.Add(new Group(2, "И-32"));
        Groups.Add(new Group(3, "И-42"));
        Groups.Add(new Group(4, "И-41"));
    }

    public ICommand ItemClickedCommand { get; set; }
    public ObservableCollection<Group> Groups
    {
        get { return _groups; }
        set { _groups = value; OnPropertyChanged(); }
    }

    private void OnItemClicked(object selectedItem)
    {
        Debug.Write(selectedItem);
    }
}