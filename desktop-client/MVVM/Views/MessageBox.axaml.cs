using System;
using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace MVVM.Views;

public partial class MessageBox : Window
{
    public MessageBox()
    {
        InitializeComponent();
    }

    public string Text
    {
        get => text.Text;
        set => text.Text = value;
    }
    
    public static void Show(string text)
    {
        MessageBox messageBox = new MessageBox();
        messageBox.Text = text;
        messageBox.Show();
    }
}