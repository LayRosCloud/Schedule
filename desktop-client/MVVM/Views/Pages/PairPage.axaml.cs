using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;
using MVVM.ViewModels;

namespace MVVM.Views.Pages;

public partial class PairPage : UserControl
{
    public PairPage()
    {
        InitializeComponent();
        DataContext = new PairViewModel();
    }
    
}