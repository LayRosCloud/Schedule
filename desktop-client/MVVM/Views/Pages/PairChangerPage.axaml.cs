using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

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
}