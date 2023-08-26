using System;
using System.ComponentModel.DataAnnotations;
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
    private readonly Pair _selectedPair;
    private readonly Group _group;

    private const int NewPairId = 0;
    private const int DaysCountInWeek = 7;
    private const int MinimumPair = 1;
    
    public PairChangerPage(Pair pair, Group group)
    {
        InitializeComponent();
        
        if (pair == null)
        {
            pair = new Pair();
        }
        
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
        Teachers.ItemsSource = await GetTeacherSubjects();
        Time.ItemsSource = await GetTimes();
        Audience.ItemsSource = await GetAudiences();
        TypeOfPairs.ItemsSource = await GetTypeOfPairs();
    }

    private void SetDefaultParams()
    {
        

        Teachers.SelectedItem = _selectedPair.teacherSubject;
        Time.SelectedItem = _selectedPair.time;
        Audience.SelectedItem = _selectedPair.audience;
        TypeOfPairs.SelectedItem = _selectedPair.typeOfPair;
        
        var dateStart = new DateTime(_selectedPair.dateStart.Year, _selectedPair.dateStart.Month, _selectedPair.dateStart.Day);
        var dateEnd = new DateTime(_selectedPair.dateEnd.Year, _selectedPair.dateEnd.Month, _selectedPair.dateEnd.Day);

        
        DatePicker.SelectedDate = dateStart;
        TbNumberOfWeeks.Value = ((decimal?)(dateEnd - dateStart).TotalDays) / DaysCountInWeek + MinimumPair;
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

    private async Task<Audience[]> GetAudiences()
    {
        var audienceRepository = new AudienceRepository();
        Audience[] audiences = await audienceRepository.GetAll();
        
        return audiences;
    }

    private async Task<TypeOfPair[]> GetTypeOfPairs()
    {
        var typeOfPairRepository = new TypeOfPairRepository();
        TypeOfPair[] typeOfPairs = await typeOfPairRepository.GetAll();
        
        return typeOfPairs;
    }

    private async void SavePair(object? sender, RoutedEventArgs e)
    {
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

            var variables = SaveUserInterface.Instance;
            variables.NavigateTo(new PairPage(_group));
        }
        catch (ValidationException exception)
        {
            await MessageBox.Show(SaveUserInterface.Instance.MainWindow, 
                                exception.Message, 
                                "Ошибка проверки данных");
        }
    }

    private Pair CheckPair()
    {
        Audience? audience = Audience.SelectedItem as Audience;
        Time? time = Time.SelectedItem as Time;
        TypeOfPair? typeOfPair = TypeOfPairs.SelectedItem as TypeOfPair;
        TeacherSubject? teacherSubject = Teachers.SelectedItem as TeacherSubject;
        
        var fullDate = DatePicker.SelectedDate;
        int pairCount = (int)TbNumberOfWeeks.Value!;
        
        if (audience == null || time == null || typeOfPair == null || teacherSubject == null || fullDate == null)
        {
            throw new ValidationException("Ошибка! Вы ввели не все поля");
        }
        
        DateOnly dateStart = new DateOnly(fullDate.Value.Year, fullDate.Value.Month, fullDate.Value.Day);
        
        if (dateStart.DayOfWeek == DayOfWeek.Sunday)
        {
            throw new ValidationException("Ошибка, вы не можете выбрать день недели воскресенье");
        }
        
        DateOnly dateEnd = dateStart.AddDays((pairCount - MinimumPair) * DaysCountInWeek);
        
        return new Pair(_selectedPair.id,
            dateStart, 
            dateEnd, 
            audience.id, 
            teacherSubject.id, 
            (int)dateStart.DayOfWeek,
            time.id, 
            typeOfPair.id, 
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
    private void TbNumberOfWeeks_OnKeyDown(object? sender, KeyEventArgs e)
    {
        const string panelWithNumbers = "NumPad";
        const string nothing = "";
        const int firstLetter = 0;
        
        Key code = e.Key;
        
        string keyCode = e.Key.ToString();
        
        if (!(keyCode.Contains(panelWithNumbers) && 
                char.IsDigit(keyCode.Replace(panelWithNumbers, nothing)[firstLetter]) 
                || (keyCode[firstLetter] == 'D' && code != Key.D)))
        {
            e.Handled = true;
        }
    }
}