using Avalonia.Controls;
using Avalonia.Interactivity;
using MVVM.Scripts;
using MVVM.Views.Pages;
using MVVM.Models;

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
        TextBox.Text = SaveVariables.Instance.AccessToken;
    }

    private void ExitApplication(object? sender, RoutedEventArgs e)
    {
        FileCrypt fileCrypt = new FileCrypt();
        fileCrypt.DeleteFile("data");
        
        AuthWindow authWindow = new AuthWindow();
        authWindow.Show();
        
        Close();
    }

    private void NavigateToGroupPage(object? sender, RoutedEventArgs e)
    {
        SaveVariables variables = SaveVariables.Instance;
        variables.NavigateTo(new GroupPage());
    }
}