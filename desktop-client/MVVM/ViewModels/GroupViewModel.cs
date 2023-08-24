using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows.Input;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;
using MVVM.Scripts.Repositories;
using DynamicData;

namespace MVVM.ViewModels;

public class GroupViewModel : ViewModelBase
{
    private ObservableCollection<Group> _groups = new();

    public GroupViewModel()
    {
        Init();
    }

    private async void Init()
    {
        await GetGroups();
    }

    public ObservableCollection<Group> Groups
    {
        get { return _groups; }
        set { _groups = value; OnPropertyChanged(); }
    }

    private async Task GetGroups()
    {

        IDataReader<Group> repository = new GroupRepository();
        var groups = await repository.GetAll();
        Groups.AddRange(groups);
    }
}