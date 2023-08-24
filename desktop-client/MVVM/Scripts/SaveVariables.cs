using System;
using System.Collections.Generic;
using Avalonia.Controls;

namespace MVVM.Scripts;

public class SaveVariables
{
    private static SaveVariables s_instance;
    private readonly Stack<UserControl> _listNavigate = new();
    
    private ContentControl _pageControl;
    private Window _mainWindow;
    
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
    
    public string AccessToken { get; set; }

    public void SetPageControl(ContentControl pageControl)
    {
        _pageControl = pageControl;
    }

    public void SetMainWindow(Window window)
    {
        _mainWindow = window;
    }

    public Window GetMainWindow()
    {
        return _mainWindow;
    }
    
    public void NavigateTo(UserControl page)
    {
        _pageControl.Content = page;
    }

}