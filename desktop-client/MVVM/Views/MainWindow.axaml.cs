using Avalonia.Controls;
using Avalonia.Interactivity;
using MVVM.Scripts;
using MVVM.Views.Pages;

namespace MVVM.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        SaveVariables variables = SaveVariables.Instance;
        variables.SetMainWindow(this);

        variables.SetPageControl(PageControl);

        variables.NavigateTo(new GroupPage());
    }

    private void ExitApplication(object? sender, RoutedEventArgs e)
    {
        AuthWindow authWindow = new AuthWindow();
        authWindow.Show();
        this.Close();
    }

    private void NavigateToGroupPage(object? sender, RoutedEventArgs e)
    {
        SaveVariables variables = SaveVariables.Instance;
        variables.NavigateTo(new GroupPage());
    }
}