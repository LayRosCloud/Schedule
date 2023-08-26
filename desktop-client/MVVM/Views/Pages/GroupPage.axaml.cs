using System.Collections.Generic;
using System.Linq;
using Avalonia.Controls;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using System.Threading.Tasks;

namespace MVVM.Views.Pages;

public partial class GroupPage : UserControl
{
    private readonly List<Group> _groups;
    public GroupPage()
    {
        InitializeComponent();
        _groups = new List<Group>();
        Init();
    }

    private async void Init()
    {
         var groups = await GetGroups();
         LoadToList(groups);
         LoadingBar.IsVisible = false;
    }

    private async Task<Group[]> GetGroups()
    {
        GroupRepository repository = new GroupRepository();
        Group[] groups = await repository.GetAll();
        
        return groups;
    }

    private void LoadToList(Group[] groups)
    {
        GroupsList.ItemsSource = groups;
        _groups.AddRange(groups);
    }

    private void SelectedChanged(object? sender, SelectionChangedEventArgs e)
    {
        var listBox = sender as ListBox;
        
        if (listBox == null)
        {
            return;
        }
        
        Group? selectedGroup = listBox.SelectedItem as Group;
        
        if (selectedGroup == null)
        {
            return;
        }
        
        SaveUserInterface.Instance.NavigateTo(new PairPage(selectedGroup));
    }

    private void SearcherTextChanged(object sender, TextChangedEventArgs e)
    {
        FindOnText();
    }

    private void FindOnText()
    {
        string find = Searcher.Text!.ToLower();
        GroupsList.ItemsSource = _groups.Where(x => x.name.ToLower().Contains(find)).ToList();
    }
}