using Avalonia;
using Avalonia.Controls;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using System.Threading.Tasks;

namespace MVVM.Views.Pages;

public partial class PairChangerPage : UserControl
{
    public PairChangerPage()
    {
        InitializeComponent();
        Init();
        Title.Text = SaveVariables.Instance.Group.name;
    }

    private async void Init() 
    {
        await GetTeacherSubjects();
        await GetTime();
        await GetAudience();
        await GetTypeOfPair();
    }

    private async Task GetTeacherSubjects() 
    { 
        TeacherSubjectRepository teacherSubjectRepository = new TeacherSubjectRepository();
        var save = await teacherSubjectRepository.GetAll();
        Teachers.ItemsSource = save;
    }

    private async Task GetTime()
    {
        TimeRepository timeRepository = new TimeRepository();
        var save = await timeRepository.GetAll();
        Time.ItemsSource = save;
    }

    private async Task GetAudience()
    {
        AudienceRepository audienceRepository = new AudienceRepository();
        var save = await audienceRepository.GetAll();
        Audience.ItemsSource = save;
    }

    private async Task GetTypeOfPair()
    {
        TypeOfPairRepository typeOfPairRepository = new TypeOfPairRepository();
        var save = await typeOfPairRepository.GetAll();
        TypeOfPairs.ItemsSource = save;
    }

    private void SavePair(object? sender, RoutedEventArgs e)
    {
        SaveVariables variables = SaveVariables.Instance;
        variables.NavigateTo(new PairPage());
    }


}