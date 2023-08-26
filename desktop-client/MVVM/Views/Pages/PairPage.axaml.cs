using System;
using System.Threading.Tasks;
using System.Linq;
using Avalonia.Controls;
using Avalonia.Controls.Documents;
using Avalonia.Interactivity;
using Avalonia.Media;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using System.Collections.Generic;

namespace MVVM.Views.Pages;

public partial class PairPage : UserControl
{
    private readonly List<Pair> _pairs;
    private readonly Group _selectedGroup;

    private const string CAN_YOU_DELETE = "Вы уверены, что хотите удалить пару ";
    private const string UNDO_ACTION = "Отменить действия будет ";
    private const string IMPOSSIBLE = "нельзя";
    private const string DELETE_PAIR = "Удаление пары";
    
    private readonly IBrush FOREGROUND_IMPOSSIBLE = Brushes.DarkRed;
    private readonly IBrush FOREGROUND_PAIR = Brushes.ForestGreen;
    private readonly FontWeight STYLE_PAIR = FontWeight.Bold;

    public PairPage(Group group)
    {
        InitializeComponent();

        _pairs = new List<Pair>();
        
        _selectedGroup = group;
        
        Init();
    }

    private async void Init()
    {
        TitlePage.Text = _selectedGroup.name;
        Pair[] pairs = await GetPairs();
        
        LoadToList(pairs);
        
        _pairs.AddRange(pairs); 
    }

    private void LoadToList(Pair[] pairs)
    {
        Pairs.ItemsSource = pairs;
        LoadingBar.IsVisible = false;
    }
    
    private async void DeletePair(object? sender, RoutedEventArgs e)
    {
        Pair? selectedPair = (sender as Button)?.DataContext as Pair;
        
        var variables = SaveUserInterface.Instance;
        var mainWindow = variables.MainWindow;
        
        MessageBox.MessageBoxResult response = await SendNotificationOnDeletePair(mainWindow, selectedPair!);
        
        if (response != MessageBox.MessageBoxResult.Yes)
        {
            return;
        }

        try 
        {
            PairRepository pairRepository = new PairRepository();
            await pairRepository.Delete(selectedPair.id);
            _pairs.Remove(selectedPair);
            LoadToList(_pairs.ToArray());
        }
        catch (Exception ex)
        {
            await MessageBox.Show(mainWindow, ex.Message);
        }
    }

    private Task<MessageBox.MessageBoxResult> SendNotificationOnDeletePair(Window main, Pair pair)
    {
        const int sentenceCount = 4;
        
        var runs = new Run[sentenceCount];
        runs[0] = new Run(CAN_YOU_DELETE);
        
        runs[1] = new Run($"{pair.teacherSubject.FullName}? ")
        {
            Foreground = FOREGROUND_PAIR,
            FontWeight = STYLE_PAIR
        };

        runs[2] = new Run(UNDO_ACTION);
        
        runs[3] = new Run(IMPOSSIBLE)
        {
            Foreground = FOREGROUND_IMPOSSIBLE
        };

        return MessageBox.Show(main,
            runs,
            DELETE_PAIR, 
            MessageBox.MessageBoxButtons.YesNo);
    }

    private void ChangePair(object? sender, RoutedEventArgs e)
    {
        Pair? pair = (sender as Button)?.DataContext as Pair;
        var page = new PairChangerPage(pair!, _selectedGroup);
        SaveUserInterface.Instance.NavigateTo(page);
    }

    private void SearcherTextChanged(object sender, TextChangedEventArgs e) 
    {
        FindOnText();
    }

    private async Task<Pair[]> GetPairs()
    {
        var repository = new PairRepository();

        Pair[] pairs = await repository.GetAll(_selectedGroup.id);
        return pairs;
    }

    private void FindOnText()
    {
        string find = Searcher.Text.ToLower();
        Pairs.ItemsSource = _pairs.Where(x => x.teacherSubject.FullName.ToLower().Contains(find)).ToList();
    }
}
