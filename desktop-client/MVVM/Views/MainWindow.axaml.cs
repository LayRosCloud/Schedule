using Avalonia.Controls;
using MVVM.Scripts;
using MVVM.Views.Pages;

namespace MVVM.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        SaveVariables.Instance.PageControl = PageControl;
        PageControl.Content =  new GroupPage();
        
    }
    
}