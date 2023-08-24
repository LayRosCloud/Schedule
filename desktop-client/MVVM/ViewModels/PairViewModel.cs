using System.Collections.ObjectModel;
using System.Threading.Tasks;
using DynamicData;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.ViewModels;

public class PairViewModel : ViewModelBase
{
    private ObservableCollection<Pair> _pairs = new();
    private bool _loadingVisible = true;
    private string _nameGroup;

    public PairViewModel()
    {
        Init();
        NameGroup = SaveVariables.Instance.Group.name;
    }

    private async void Init()
    {
        await GetPairs();
    }

    public bool LoadingVisible
    {
        get { return _loadingVisible; }
        set { _loadingVisible = value; OnPropertyChanged(); }
    }
    public ObservableCollection<Pair> Pairs
    {
        get { return _pairs; }
        set { _pairs = value; OnPropertyChanged(); }
    }

    public string NameGroup
    {
        get{ return _nameGroup; }
        set { _nameGroup = value; OnPropertyChanged(); }
    }

    private async Task GetPairs() 
    {
        PairRepository repository = new PairRepository();

        var variables = SaveVariables.Instance.Group;
        var pairs = await repository.GetAll(variables.id);
        Pairs.AddRange(pairs);
        LoadingVisible = false;
    }
}