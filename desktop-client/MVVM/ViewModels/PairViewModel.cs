﻿using System.Collections.ObjectModel;
using System.Threading.Tasks;
using DynamicData;
using MVVM.Models;
using MVVM.Scripts.Repositories;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.ViewModels;

public class PairViewModel : ViewModelBase
{
    private ObservableCollection<Pair> _pairs = new();
    private bool _loadingVisible = true;

    public PairViewModel()
    {
        Init();
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

    private async Task GetPairs() 
    {
        ICrudRepository<Pair> repository = new PairRepository();
        var pairs = await repository.GetAll();
        Pairs.AddRange(pairs);
        LoadingVisible = false;
    }
}