using System.Collections.ObjectModel;
using System.Windows.Input;
using DynamicData;
using MVVM.Models;
using MVVM.Scripts.Repositories;

namespace MVVM.ViewModels;

public class PairViewModel : ViewModelBase
{
    private ObservableCollection<Pair> _pairs = new();

    public PairViewModel()
    {
        GetPairs();
    }
    
    public ObservableCollection<Pair> Pairs
    {
        get { return _pairs; }
        set { _pairs = value; OnPropertyChanged(); }
    }
    
    public ICommand ItemClickedCommand { get; set; }

    private async void GetPairs() 
    {
        ICrudRepository<Pair> repository = new PairRepository();
        var pairs = await repository.GetAll();
        Pairs.AddRange(pairs);
    }
}