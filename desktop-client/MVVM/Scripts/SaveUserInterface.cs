using Avalonia.Controls;

namespace MVVM.Scripts;

public class SaveUserInterface
{
    private static SaveUserInterface s_instance;
    
    public static SaveUserInterface Instance
    {
        get
        {
            if (s_instance == null)
            {
                s_instance = new SaveUserInterface();
            }

            return s_instance;
        }
    }

    public ContentControl PageControl { get; set; }
    public Window MainWindow { get; set; }
    
    public void NavigateTo(UserControl page)
    {
        PageControl.Content = page;
    }
}