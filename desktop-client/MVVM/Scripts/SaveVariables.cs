using System;
using System.Collections.Generic;
using Avalonia.Controls;
using MVVM.Models;

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
    
    public string AccessToken { get; set; }
}