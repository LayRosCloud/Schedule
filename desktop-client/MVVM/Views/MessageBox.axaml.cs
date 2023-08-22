using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace MVVM.Views;

public partial class MessageBox : Window
{
    public enum MessageBoxButtons
    {
        Ok,
        OkCancel,
        YesNo,
        YesNoCancel
    }

    public enum MessageBoxResult
    {
        Ok,
        Cancel,
        Yes,
        No
    }

    public MessageBox()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public static Task<MessageBoxResult> Show(Window? parent, string text, string title = "", MessageBoxButtons buttons = MessageBoxButtons.Ok)
    {
        var messageBox = new MessageBox()
        {
            Title = title
        };
        messageBox.FindControl<TextBlock>("Text")!.Text = text;
        messageBox.FindControl<TextBlock>("TitleMain")!.Text = title;
        var buttonPanel = messageBox.FindControl<StackPanel>("Buttons");

        var res = MessageBoxResult.Ok;

        void AddButton(string caption, MessageBoxResult r, bool def = false)
        {
            var btn = new Button { Content = caption };
            btn.Click += (_, __) => { 
                res = r;
                messageBox.Close();
            };
            buttonPanel.Children.Add(btn);
            if (def)
                res = r;
        }

        if (buttons == MessageBoxButtons.Ok || buttons == MessageBoxButtons.OkCancel)
        {
            AddButton("Ok", MessageBoxResult.Ok, true);
        }
        
        if (buttons == MessageBoxButtons.YesNo || buttons == MessageBoxButtons.YesNoCancel)
        {
            AddButton("Yes", MessageBoxResult.Yes);
            AddButton("No", MessageBoxResult.No, true);
        }

        if (buttons == MessageBoxButtons.OkCancel || buttons == MessageBoxButtons.YesNoCancel)
        {
            AddButton("Cancel", MessageBoxResult.Cancel, true);
        }

        var tcs = new TaskCompletionSource<MessageBoxResult>();
        
        messageBox.Closed += delegate { tcs.TrySetResult(res); };

        messageBox.ShowDialog(parent);
        
        return tcs.Task;
    }
}