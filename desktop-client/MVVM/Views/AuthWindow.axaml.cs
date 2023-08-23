using System;
using System.Diagnostics;
using System.Security.Authentication;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Controls.Documents;
using Avalonia.Interactivity;
using Avalonia.Media;
using MVVM.ViewModels;

namespace MVVM.Views;

public partial class AuthWindow : Window
{
    public AuthWindow()
    {
        InitializeComponent();
    }

    private async void EnterApplication(object? sender, RoutedEventArgs e)
    {
        string login = Login.Text.ToLower();

        try
        {
            CheckLoginAndPassword(login, Password.Text);

            await SendSuccessfulNotification(this);

            ShowNewWindow();

            CloseWindow(this);
        }
        catch (AuthenticationException ex)
        {
            await SendErrorNotification(this);
        }
        catch (Exception ex)
        {
            Debug.Write(ex.Message);
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
    
    private void CheckLoginAndPassword(string login, string password)
    {
        if (!login.Equals("admin") || !password.Equals("admin"))
        {
            throw new AuthenticationException();
        }
    }

    private void CloseWindow(Window? window)
    {
        window?.Close();
    }
}
    