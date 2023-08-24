using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using MVVM.Scripts;

namespace MVVM.Views.Pages;

public partial class PairChangerPage : UserControl
{
    public PairChangerPage()
    {
        InitializeComponent();
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }

    private void SavePair(object? sender, RoutedEventArgs e)
    {
        SaveVariables variables = SaveVariables.Instance;
        variables.NavigateTo(new PairPage());
    }
}