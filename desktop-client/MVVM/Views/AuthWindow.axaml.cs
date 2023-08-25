using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Controls.Documents;
using Avalonia.Interactivity;
using Avalonia.Media;
using Avalonia.Threading;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;

namespace MVVM.Views;

public partial class AuthWindow : Window
{
    private readonly FileCrypt _crypt;
    private readonly DispatcherTimer dispatcherTimer = new();

    public AuthWindow()
    {
        InitializeComponent();
        _crypt = new FileCrypt();
        dispatcherTimer.Interval = new TimeSpan(0, 0, 0, 0,1);
        dispatcherTimer.Tick += (sender, args) =>
        {
            Init();
            dispatcherTimer.Stop();
        };
        dispatcherTimer.Start();
    }

    private void Init()
    {
        string token = _crypt.ReadText();
        if (token != "")
        {
            SaveVariables.Instance.AccessToken = token;
            ShowNewWindow();
            CloseWindow();
        }
    }
    
    private async void EnterApplication(object? sender, RoutedEventArgs e)
    {
        string login = Login.Text.ToLower();
        try
        {
            await CheckLoginAndPassword(login, Password.Text);
            await SendSuccessfulNotification(this);

            if (RememberMe.IsChecked == true)
            {
                 _crypt.WriteText(SaveVariables.Instance.AccessToken);
            }
            
            ShowNewWindow();
            CloseWindow();
        }
        catch (AuthenticationException)
        {
            await SendErrorNotification(this);
        }
    }
    
    
    private Task<MessageBox.MessageBoxResult> SendSuccessfulNotification(Window currentWindow)
    {
        Run[] runs = new Run[2];
        runs[0] = new Run("Успех! ");
        runs[0].Foreground = Brushes.ForestGreen;
        runs[1] = new Run("Вы успешно авторизовались");
        return MessageBox.Show(currentWindow, runs, "Успех");
    }
    
    private Task<MessageBox.MessageBoxResult> SendErrorNotification(Window currentWindow)
    {
        Run[] runs = new Run[2];
        runs[0] = new Run("Ошибка! ");
        runs[0].Foreground = Brushes.DarkRed;
        runs[1] = new Run("Неверный логин или пароль!");
        return MessageBox.Show(currentWindow, runs, "Ошибка!");
    }
    
    private void ShowNewWindow()
    {
        Window mainWindow = new MainWindow();
        mainWindow.Show();
    }
    
    private async Task CheckLoginAndPassword(string login, string password)
    {
        UsersRepository usersRepository = new UsersRepository();
        await usersRepository.Login(login, password);
    }

    private void CloseWindow()
    {
        this.Close();
    }
}
    