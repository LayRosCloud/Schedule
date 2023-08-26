using System;
using System.Threading.Tasks;
using System.Linq;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Documents;
using Avalonia.Input;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using Avalonia.Media;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using MVVM.ViewModels;
using System.Collections.Generic;

namespace MVVM.Views.Pages;

public partial class PairPage : UserControl
{
    private List<Pair> _pairs;

    public PairPage()
    {
        InitializeComponent();

        _pairs = new List<Pair>();
        Init();
    }

    private async void Init()
    {
        await GetPairs();        
    }

    private async void DeletePair(object? sender, RoutedEventArgs e)
    {
        Pair? selectedPair = (sender as Button)?.DataContext as Pair;
        var variables = SaveVariables.Instance;

        MessageBox.MessageBoxResult response = await SendNotificationOnDeletePair(variables.GetMainWindow(), selectedPair!);
        if (response != MessageBox.MessageBoxResult.Yes)
        {
            return;
        }

        try 
        {
            PairRepository pairRepository = new PairRepository();
            await pairRepository.Delete(selectedPair.id);
        }
        catch (Exception ex)
        {
            await MessageBox.Show(SaveVariables.Instance.GetMainWindow(), ex.Message);
        }
    }

    private Task<MessageBox.MessageBoxResult> SendNotificationOnDeletePair(Window main, Pair pair)
    {
        var runs = new Run[4];
        runs[0] = new Run("Вы уверены, что хотите удалить пару ");
        
        runs[1] = new Run($"{pair.id}? ")
        {
            Foreground = Brushes.Green,
            FontWeight = FontWeight.Bold
        };

        runs[2] = new Run("Отменить действия будет");
        
        runs[3] = new Run(" нельзя")
        {
            Foreground = Brushes.DarkRed
        };

        return MessageBox.Show(main,
            runs,
            "Удаление пары", 
            MessageBox.MessageBoxButtons.YesNo);
    }

    private void ChangePair(object? sender, RoutedEventArgs e)
    {
        Pair? pair = (sender as Button)?.DataContext as Pair;
        var page = new PairChangerPage(pair!);
        SaveVariables.Instance.NavigateTo(page);
    }

    private void SearcherTextChanged(object sender, TextChangedEventArgs e) 
    {
        FindOnText();
    }

    private async Task GetPairs()
    {
        PairRepository repository = new PairRepository();

        var variables = SaveVariables.Instance.Group;
        var pairs = await repository.GetAll(variables.id);

        Pairs.ItemsSource = pairs;
        LoadingVisible.IsVisible = false;
        _pairs.AddRange(pairs);
    }

    private void FindOnText()
    {
        string find = Searcher.Text.ToLower();
        Pairs.ItemsSource = _pairs.Where(x => x.teacherSubject.FullName.ToLower().Contains(find)).ToList();
    }
}
