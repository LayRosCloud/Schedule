using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.ViewModels;

namespace MVVM.Views.Pages;

public partial class GroupPage : UserControl
{
    public GroupPage()
    {
        InitializeComponent();
        DataContext = new GroupViewModel();
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }

    private void SelectedChanged(object? sender, SelectionChangedEventArgs e)
    {
        Group? selectedGroup = (sender as ListBox).SelectedItem as Group;
        SaveVariables.Instance.Group = selectedGroup;
        SaveVariables.Instance.NavigateTo(new PairPage());
    }
}