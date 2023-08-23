using System.Threading.Tasks;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Documents;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using Avalonia.Media;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.ViewModels;

namespace MVVM.Views.Pages;

public partial class PairPage : UserControl
{
    public PairPage()
    {
        InitializeComponent();
        DataContext = new PairViewModel();
    }

    private async void DeletePair(object? sender, RoutedEventArgs e)
    {
        Pair? selectedPair = (sender as Button)?.DataContext as Pair;
        var variables = SaveVariables.Instance;

        MessageBox.MessageBoxResult response = await SendNotificationOnDeletePair(variables.GetMainWindow(), selectedPair!);
        if (response != MessageBox.MessageBoxResult.Yes)
        {
            return;
        }
        //TODO: Сделать уведомление об успешном удалении
    }

    private Task<MessageBox.MessageBoxResult> SendNotificationOnDeletePair(Window main, Pair pair)
    {
        var runs = new Run[4];
        runs[0] = new Run("Вы уверены, что хотите удалить пару ");
        
        runs[1] = new Run($"{pair.id}? ")
        {
            Foreground = Brushes.Green,
            FontWeight = FontWeight.Bold
        };

        runs[2] = new Run("Отменить действия будет");
        
        runs[3] = new Run(" нельзя")
        {
            Foreground = Brushes.DarkRed
        };

        return MessageBox.Show(main,
            runs,
            "Удаление пары", 
            MessageBox.MessageBoxButtons.YesNo);
    }

    private void ChangePair(object? sender, RoutedEventArgs e)
    {
        SaveVariables.Instance.NavigateTo(new PairChangerPage());
    }
}