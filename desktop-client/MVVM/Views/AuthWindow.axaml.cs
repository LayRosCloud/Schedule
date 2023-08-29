using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Controls.Documents;
using Avalonia.Interactivity;
using Avalonia.Media;
using MVVM.Models;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;

namespace MVVM.Views;

public partial class AuthWindow : Window
{
    private readonly FileCrypt _crypt;

    private const string Error = "Ошибка!";
    private const string ErrorMessage = " Неверный логин или пароль!";
    private const string ErrorFields = $"{Error} Не все поля заполнены";

    public AuthWindow()
    {
        InitializeComponent();
        _crypt = new FileCrypt();
    }
    
    private void AuthWindowLoaded(object? sender, RoutedEventArgs e)
    {
        Init();
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

    private void SendError(string text)
    {
        ErrorBorder.IsVisible = true;
        TbError.Text = text;
    }
    
    private async void EnterApplication(object? sender, RoutedEventArgs e)
    {
        string login = Login.Text!.ToLower();
        string password = Password.Text!;
        
        try
        {
            await CheckLoginAndPassword(login, password);
            
            if (RememberMe.IsChecked == true)
            {
                 _crypt.WriteText(SaveVariables.Instance.AccessToken);
            }
            
            ShowNewWindow();
            CloseWindow();
        }
        catch (AuthenticationException)
        {
            SendError(ErrorMessage);
        }
        catch (ArgumentException ex)
        {
            SendError(ex.Message);
        }
    }
    

    private void ShowNewWindow()
    {
        Window mainWindow = new MainWindow();
        mainWindow.Show();
    }
    
    private async Task CheckLoginAndPassword(string login, string password)
    {
        if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
        {
            throw new ArgumentException(ErrorFields);
        }
        
        UsersRepository usersRepository = new UsersRepository();
        User? user = await usersRepository.Login(login, password);
        SaveVariables.Instance.AccessToken = user.accessToken;
    }

    private void CloseWindow()
    {
        Close();
    }


    private void CloseErrorMessage(object? sender, RoutedEventArgs e)
    {
        ErrorBorder.IsVisible = false;
    }
}
    