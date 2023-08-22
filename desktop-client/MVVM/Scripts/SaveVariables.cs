using Avalonia.Controls;

namespace MVVM.Scripts;

public class SaveVariables
{
    private static SaveVariables s_instance;
    
    public static SaveVariables Instance
    {
        get
        {
            if (s_instance == null)
            {
                s_instance = new SaveVariables();
            }

            return s_instance;
        }
    }

    public ContentControl PageControl { get; set; }
}