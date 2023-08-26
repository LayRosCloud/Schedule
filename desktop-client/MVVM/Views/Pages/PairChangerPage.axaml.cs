using System;
using Avalonia.Controls;
using Avalonia.Interactivity;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using System.Threading.Tasks;
using Avalonia.Input;
using MVVM.Models;
using DayOfWeek = System.DayOfWeek;

namespace MVVM.Views.Pages;

public partial class PairChangerPage : UserControl
{
    private int globalAnus;

    public PairChangerPage(Pair pair)
    {
        InitializeComponent();
        Init(pair);
        Title.Text = SaveVariables.Instance.Group.name;
    }
    
    private async void Init(Pair pair) 
    {
        await GetTeacherSubjects();
        await GetTime();
        await GetAudience();
        await GetTypeOfPair();

        globalAnus = pair.id;

        Teachers.SelectedItem = pair.teacherSubject;
        Time.SelectedItem = pair.time;
        Audience.SelectedItem = pair.audience;
        TypeOfPairs.SelectedItem = pair.typeOfPair;

        var dateStart = new DateTime(pair.dateStart.Year, pair.dateStart.Month, pair.dateStart.Day);
        var dateEnd = new DateTime(pair.dateEnd.Year, pair.dateEnd.Month, pair.dateEnd.Day);
        DatePicker.SelectedDate = dateStart;
        TbNumberOfWeeks.Value = (((decimal?)(dateEnd - dateStart).TotalDays) / 7) + 1;

    }

    private async Task GetTeacherSubjects() 
    { 
        var teacherSubjectRepository = new TeacherSubjectRepository();
        TeacherSubject[] teacherSubjects = await teacherSubjectRepository.GetAll();
        Teachers.ItemsSource = teacherSubjects;
    }

    private async Task GetTime()
    {
        var timeRepository = new TimeRepository();
        Time[] times = await timeRepository.GetAll();
        Time.ItemsSource = times;
    }

    private async Task GetAudience()
    {
        var audienceRepository = new AudienceRepository();
        Audience[] audiences = await audienceRepository.GetAll();
        
        Audience.ItemsSource = audiences;
    }

    private async Task GetTypeOfPair()
    {
        var typeOfPairRepository = new TypeOfPairRepository();
        TypeOfPair[] typeOfPairs = await typeOfPairRepository.GetAll();
        TypeOfPairs.ItemsSource = typeOfPairs;
    }

    private async void SavePair(object? sender, RoutedEventArgs e)
    {
        Audience? audience = Audience.SelectedItem as Audience;
        Time? time = Time.SelectedItem as Time;
        TypeOfPair? typeOfPair = TypeOfPairs.SelectedItem as TypeOfPair;
        TeacherSubject? teacherSubject = Teachers.SelectedItem as TeacherSubject;
        
        var fullDate = DatePicker.SelectedDate;
        int numberOfWeeks = (int)TbNumberOfWeeks.Value!;
        
        if (audience == null || time == null || typeOfPair == null || teacherSubject == null || fullDate == null)
        {
            await MessageBox.Show(SaveVariables.Instance.GetMainWindow(), "ХОПА");
            return;
        }
        
        DateOnly dateStart = new DateOnly(fullDate.Value.Year, fullDate.Value.Month, fullDate.Value.Day);
        
        if (dateStart.DayOfWeek == DayOfWeek.Sunday)
        {
            await MessageBox.Show(SaveVariables.Instance.GetMainWindow(), "ХОПА v.2.0");
            return;
        }
        
        DateOnly dateEnd = dateStart.AddDays((numberOfWeeks - 1) * 7);
        
        Pair pair = new(globalAnus, 
            dateStart, 
            dateEnd, 
            audience.id, 
            teacherSubject.id, 
            (int)dateStart.DayOfWeek,
            time.id, 
            typeOfPair.id, 
            SaveVariables.Instance.Group.id);

        if (globalAnus != 0) 
        {
            PairRepository pairRepository = new PairRepository();
            await pairRepository.Update(pair);
        }
        else
        {
            await SaveToApi(pair);
        }

        SaveVariables variables = SaveVariables.Instance;
        variables.NavigateTo(new PairPage());
    }

    private async Task SaveToApi(Pair pair)
    {
        PairRepository repository = new PairRepository();
        await repository.Create(pair);
    }
    
    private void TbNumberOfWeeks_OnKeyDown(object? sender, KeyEventArgs e)
    {
        Key code = e.Key;
        string keyCode = e.Key.ToString();
        
        if (!(keyCode.Contains("NumPad") && char.IsDigit(keyCode.Replace("NumPad", "")[0]) || (keyCode[0] == 'D' && code != Key.D)))
        {
            e.Handled = true;
        }
    }
}