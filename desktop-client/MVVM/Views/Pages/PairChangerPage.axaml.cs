using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using Avalonia.Controls;
using Avalonia.Interactivity;
using MVVM.Scripts;
using MVVM.Scripts.Repositories;
using System.Threading.Tasks;
using Avalonia.Input;
using Avalonia.Media;
using MVVM.Models;
using DayOfWeek = System.DayOfWeek;

namespace MVVM.Views.Pages;

public partial class PairChangerPage : UserControl
{
    private readonly Pair _selectedPair;
    private readonly Group _group;
    private readonly List<Pair> _allPairs;

    private const int NewPairId = 0;
    private const int DaysCountInWeek = 7;
    private const int MinimumPair = 1;

    public PairChangerPage(Pair pair, Group group)
    {
        InitializeComponent();
        BackButton.Content = "<-";
        
        if(pair == null!)
        {
            pair = new Pair();
        }

        _allPairs = new List<Pair>();
        _selectedPair = pair;
        _group = group;
        
        Init();

        Title.Text = group.name;
    }
    
    private async void Init()
    {
        await InitData();
        if (_selectedPair.id != NewPairId)
        {
            SetDefaultParams();
        }
        LoadBar.IsVisible = false;
    }

    private async Task InitData()
    {
        CbTeachers.ItemsSource = await GetTeacherSubjects();
        CbTime.ItemsSource = await GetTimes();
        CbAudience.ItemsSource = await GetAudiences();
        CbTypeOfPairs.ItemsSource = await GetTypeOfPairs();
        _allPairs.AddRange(await GetAllPairs());
    }

    private void SetDefaultParams()
    {
        var dateStart = new DateTime(_selectedPair.dateStart.Year, _selectedPair.dateStart.Month, _selectedPair.dateStart.Day);
        var dateEnd = new DateTime(_selectedPair.dateEnd.Year, _selectedPair.dateEnd.Month, _selectedPair.dateEnd.Day);

        CdpDateStart.SelectedDate = dateStart;
        CbTime.SelectedItem = _selectedPair.time;
        NudNumberOfWeeks.Value = ( ( (decimal?)(dateEnd - dateStart).TotalDays) / DaysCountInWeek) + MinimumPair;

        CbTeachers.SelectedItem = _selectedPair.teacherSubject;
        CbAudience.SelectedItem = _selectedPair.audience;
        CbTypeOfPairs.SelectedItem = _selectedPair.typeOfPair;
    }

    private async Task<TeacherSubject[]> GetTeacherSubjects() 
    { 
        var teacherSubjectRepository = new TeacherSubjectRepository();
        TeacherSubject[] teacherSubjects = await teacherSubjectRepository.GetAll();
        
        return teacherSubjects;
    }

    private async Task<Time[]> GetTimes()
    {
        var timeRepository = new TimeRepository();
        Time[] times = await timeRepository.GetAll();
        
        return times;
    }
    
    private async Task<Pair[]> GetAllPairs()
    {
        var pairRepository = new PairRepository();
        Pair[] pairs = await pairRepository.GetAll();
        
        return pairs;
    }

    private async Task<Audience[]> GetAudiences()
    {
        var audienceRepository = new AudienceRepository();
        Audience[] audiences = await audienceRepository.GetAll();
        
        return audiences.OrderBy(audience => audience.name).ToArray();
    }

    private async Task<TypeOfPair[]> GetTypeOfPairs()
    {
        var typeOfPairRepository = new TypeOfPairRepository();
        TypeOfPair[] typeOfPairs = await typeOfPairRepository.GetAll();
        
        return typeOfPairs;
    }

    private async void SavePair(object? sender, RoutedEventArgs e)
    {
        const string errorTitle = "Ошибка проверки данных";
        try
        {
            Pair pair = CheckPair();
            
            if (_selectedPair.id != NewPairId)
            {
                await UpdateToApi(pair);
            }
            else
            {
                await SaveToApi(pair);
            }
            
            NavigateToPairPage();
        }
        catch (ValidationException exception)
        {
            SendErrorNotification(exception.Message, errorTitle);
        }
    }

    private void NavigateToPairPage()
    {
        var variables = SaveUserInterface.Instance;
        variables.NavigateTo(new PairPage(_group));
    }
    
    private void SendErrorNotification(string text, string title)
    {
        ErrorNotification.Background = new SolidColorBrush(Color.FromRgb(168, 75, 75));//"#a84b4b"
        TitleError.Text = title;
        MessageError.Text = text;
        ErrorNotification.IsVisible = true;
    }
    private void SendNotification(string text, string title)
    {
        ErrorNotification.Background = new SolidColorBrush(Color.FromRgb(176, 176, 0));//"#cbcd00"
        TitleError.Text = title;
        MessageError.Text = text;
        ErrorNotification.IsVisible = true;
    }
    
    private Pair CheckPair()
    {
        Audience? audience = CbAudience.SelectedItem as Audience;
        Time? time = CbTime.SelectedItem as Time;
        TypeOfPair? typeOfPair = CbTypeOfPairs.SelectedItem as TypeOfPair;
        TeacherSubject? teacherSubject = CbTeachers.SelectedItem as TeacherSubject;
        
        var fullDate = CdpDateStart.SelectedDate;
        int pairCount = (int)NudNumberOfWeeks.Value!;

        DateOnly dateStart = new DateOnly(fullDate!.Value.Year, fullDate.Value.Month, fullDate.Value.Day);

        DateOnly dateEnd = dateStart.AddDays((pairCount - MinimumPair) * DaysCountInWeek);
        
        return new Pair(_selectedPair.id,
            dateStart, 
            dateEnd, 
            audience!.id, 
            teacherSubject!.id, 
            (int)dateStart.DayOfWeek,
            time!.id, 
            typeOfPair!.id, 
            _group.id);
    }
    
    private async Task SaveToApi(Pair pair)
    {
        PairRepository repository = new PairRepository();
        await repository.Create(pair);
    }
    
    private async Task UpdateToApi(Pair pair)
    {
        PairRepository pairRepository = new PairRepository();
        await pairRepository.Update(pair);
    }
    
    private void KeyDownNumberOfWeeks(object? sender, KeyEventArgs e)
    {
        Key code = e.Key;
        
        if ((code < Key.D0 || code > Key.D9) && 
             (code < Key.NumPad0 || code > Key.NumPad9))
        {
            e.Handled = true;
        }
    }

    private void DateChanged(object? sender, SelectionChangedEventArgs e)
    {
        CheckOnError();

        CbTime.IsVisible = true;
    }

    private void SelectedTime(object? sender, SelectionChangedEventArgs e)
    {
        CheckOnError();
        
        NudNumberOfWeeks.IsVisible = true;
    }

    private void InputNumberOfWeeks(object? sender, NumericUpDownValueChangedEventArgs e)
    {
        SettingsPairs.IsVisible = true;
        CbTeachers.IsVisible = true;
    }

    private void SelectTeachers(object? sender, SelectionChangedEventArgs e)
    {
        CheckOnError();
        
        CbAudience.IsVisible = true;
    }
    
    private void SelectAudience(object? sender, SelectionChangedEventArgs e)
    {
        CheckOnError();
        
        CbTypeOfPairs.IsVisible = true;
    }

    private void CheckOnError()
    {
        var fullDate = CdpDateStart.SelectedDate!;
        var dayOfWeek = fullDate.Value.DayOfWeek;
        
        Time? time = CbTime.SelectedItem as Time;
        
        TeacherSubject? teacherSubject = CbTeachers.SelectedItem as TeacherSubject;
        Audience? audience = CbAudience.SelectedItem as Audience;
        
        DateOnly dateStart = new DateOnly(fullDate!.Value.Year, fullDate.Value.Month, fullDate.Value.Day);
        int pairCount = 0;
        
        if (NudNumberOfWeeks.Value != null)
        {
            pairCount = (int)NudNumberOfWeeks.Value;
        }
        
        DateOnly dateEnd = dateStart.AddDays((pairCount - MinimumPair) * DaysCountInWeek);
        SendButton.IsEnabled = dayOfWeek != DayOfWeek.Sunday;

        if (dayOfWeek == DayOfWeek.Sunday)
        {
            SendErrorNotification("Нельзя выбрать воскресенье", "Ошибка");
            return;
        }
        
        var pairTime = _allPairs.Where(pair => pair.time.name == time!.name);
        var pairDayOfWeek = pairTime.Where(pair => dayOfWeek == pair.dateStart.DayOfWeek);
        var pairCurrentDate = pairDayOfWeek.Where(pair => dateStart <= pair.dateEnd && dateEnd >= pair.dateStart);
        
        Pair pairTeacher = null;
        Pair pairAudience = null;
        if (teacherSubject != null)
        {
            pairTeacher = pairCurrentDate.Where(pair => pair.teacherSubject.Teacher.id == teacherSubject.Teacher.id).FirstOrDefault();
        }
        
        if (audience != null )
        {
            pairAudience = pairCurrentDate.Where(pair => pair.audience.id == audience.id).FirstOrDefault();
        }
        
        string notification = "";
        if (pairTeacher != null)
        {
            notification =
                $"Преподаватель\n С {pairTeacher.dateStart} по {pairTeacher.dateEnd} есть пара у преподавателя \"{pairTeacher.teacherSubject.Teacher.FullName}\"\n" +
                $"• группа: {pairTeacher.group.name}\n• тип пары: {pairTeacher.typeOfPair.name}\n• аудитория: {pairTeacher.audience.fullName}";
        }

        if (pairAudience != null)
        {
            notification += "\n\n";
            notification +=
                $"Аудитория\n С {pairAudience.dateStart} по {pairAudience.dateEnd} есть пара у преподавателя \"{pairAudience.teacherSubject.Teacher.FullName}\"\n" +
                $"• группа: {pairAudience.group.name}\n• тип пары: {pairAudience.typeOfPair.name}\n• аудитория: {pairAudience.audience.fullName}";
        }
        SendNotification(notification, "Предупреждение");
        ErrorNotification.IsVisible = pairTeacher != null || pairAudience != null;
    }
    
    private void SelectTypeOfPair(object? sender, SelectionChangedEventArgs e)
    {
        SendButton.IsVisible = true;
    }

    private void Back(object? sender, RoutedEventArgs e)
    {
        NavigateToPairPage();
    }
}