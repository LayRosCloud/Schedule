using System.Collections.ObjectModel;
using System.Windows.Input;
using MVVM.Models;

namespace MVVM.ViewModels;

public class PairViewModel : ViewModelBase
{
    private ObservableCollection<Pair> _pairs = new();

    public PairViewModel()
    {
        Pairs.Add(new Pair(1));
        Pairs.Add(new Pair(2));
        Pairs.Add(new Pair(3));
    }
    
    public ObservableCollection<Pair> Pairs
    {
        get { return _pairs; }
        set { _pairs = value; OnPropertyChanged(); }
    }
    
    public ICommand ItemClickedCommand { get; set; }
}