using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.ViewModels;
using MVVM.Scripts.Repositories;
using System.Threading.Tasks;

namespace MVVM.Views.Pages;

public partial class GroupPage : UserControl
{
    private List<Group> _groups;
    public GroupPage()
    {
        InitializeComponent();
        _groups = new List<Group>();
        Init();
    }

    private async void Init()
    {
        await GetGroup();
    }

    private async Task GetGroup()
    {
        GroupRepository repository = new GroupRepository();
        var group = await repository.GetAll();

        GroupsList.ItemsSource = group;
        _groups.AddRange(group);
    }

    private void SelectedChanged(object? sender, SelectionChangedEventArgs e)
    {
        Group? selectedGroup = (sender as ListBox).SelectedItem as Group;
        SaveVariables.Instance.Group = selectedGroup;
        SaveVariables.Instance.NavigateTo(new PairPage());
    }

    private void SearcherTextChanged(object sender, TextChangedEventArgs e)
    {
        FindOnText();
    }

    private void FindOnText()
    {
        string find = Searcher.Text.ToLower();
        GroupsList.ItemsSource = _groups.Where(x => x.name.ToLower().Contains(find)).ToList();
    }
}