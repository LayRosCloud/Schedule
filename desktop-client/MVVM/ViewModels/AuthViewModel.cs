using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using MVVM.Views;

namespace MVVM.ViewModels;

public class AuthViewModel : INotifyPropertyChanged
{
    private string _login;
    private string _password;
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

    private void Click(object obj)
    {
        Window mainWindow = new MainWindow();
        mainWindow.Show(); //TODO: Check login and password
        (Application.Current?.ApplicationLifetime as IClassicDesktopStyleApplicationLifetime)?.MainWindow?.Close();
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = "")
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}