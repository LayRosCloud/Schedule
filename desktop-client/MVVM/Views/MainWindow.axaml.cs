using Avalonia.Controls;
using Avalonia.Interactivity;
using MVVM.Scripts;
using MVVM.Views.Pages;

namespace MVVM.Views;

public partial class MainWindow : Window
{
    private const string PathToFileData = "data";
    public MainWindow()
    {
        InitializeComponent();
        var saverInterface = SaveUserInterface.Instance;
        saverInterface.MainWindow = this;

        saverInterface.PageControl = PageControl;

        saverInterface.NavigateTo(new GroupPage());
    }

    private void ExitApplication(object? sender, RoutedEventArgs e)
    {
        FileCrypt fileCrypt = new FileCrypt();
        fileCrypt.DeleteFile(PathToFileData);
        
        AuthWindow authWindow = new AuthWindow();
        authWindow.Show();
        
        Close();
    }

    private void NavigateToGroupPage(object? sender, RoutedEventArgs e)
    {
        var variables = SaveUserInterface.Instance;
        variables.NavigateTo(new GroupPage());
    }
}