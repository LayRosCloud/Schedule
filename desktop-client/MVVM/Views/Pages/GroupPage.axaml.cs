using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using MVVM.Models;
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
}