using System;
using System.Diagnostics;
using System.Security.Authentication;
using System.Windows.Input;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
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

            await MessageBox.Show(currentWindow, "Успех, вы успешно авторизовались", "Успех");

            ShowNewWindow();

            CloseWindow(currentWindow);
        }
        catch (AuthenticationException ex)
        {
            Debug.Write(ex.Message);
            await MessageBox.Show(currentWindow, "Ошибка! Неправильный логин или пароль", "Ошибка!");
        }
        catch (Exception ex)
        {
            Debug.Write(ex.Message);
        }
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