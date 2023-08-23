using System;
using System.Diagnostics;
using System.Security.Authentication;
using System.Threading.Tasks;
using System.Windows.Input;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Controls.Documents;
using Avalonia.Media;
using MVVM.Views;

namespace MVVM.ViewModels;

public class AuthViewModel : ViewModelBase
{
    private string _login = "";
    private string _password = "";

    public AuthViewModel()
    {
        EnterToApplication = new RelayCommand(Click);
    }
    
    public string Login
    {
        get { return _login;}
        set { _login = value; OnPropertyChanged(); }
    }
    
    public string Password
    {
        get { return _password;}
        set { _password = value; OnPropertyChanged(); }
    }

    public ICommand EnterToApplication { get; private set; }

    private async void Click(object obj)
    {
        var desktopStyleApplicationLifetime =
            Application.Current?.ApplicationLifetime as IClassicDesktopStyleApplicationLifetime;
        
        Window? currentWindow = desktopStyleApplicationLifetime?.MainWindow;
        string login = Login.ToLower();

        try
        {
            CheckLoginAndPassword(login, Password);

            await SendSuccessfulNotification(currentWindow!);

            ShowNewWindow();

            CloseWindow(currentWindow);
        }
        catch (AuthenticationException ex)
        {
            Debug.Write(ex.Message);
            await SendErrorNotification(currentWindow!);
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