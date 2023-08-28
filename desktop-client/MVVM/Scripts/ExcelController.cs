using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using DynamicData;
using MVVM.Models;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing;
using OfficeOpenXml.Style;
using DayOfWeek = MVVM.Models.DayOfWeek;

namespace MVVM.Scripts;

public class ExcelController
{
    private readonly ExcelPackage _package;
    private readonly List<ExcelWorksheet> _sheets;
    private readonly Group _group;
    private int _currentSheet = -1;
    public ExcelController(Group group)
    {
        _group = group;
        _sheets = new List<ExcelWorksheet>();
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        _package = new();
        CreateSheet(group);
    }
    
    private ExcelWorksheet CurrentSheet => _sheets[_currentSheet];

    public ExcelWorksheet CreateSheet(Group group)
    {
        ExcelWorksheet worksheet = _package.Workbook.Worksheets.Add(group.name);
        _sheets.Add(worksheet);
        _currentSheet++;
        return worksheet;
    }
    
    public void AddTablePairs(Pair[] pairs, Time[] times, DayOfWeek[] dayOfWeeks)
    {
        var groupedByDayOfWeek = GetGroupedPairs(dayOfWeeks, pairs, times);
        
        CurrentSheet.Cells[1, 1, 1, 2].Merge = true;
        CreateTitle(CurrentSheet.Cells[1, 1], "09.05-01.11");

        CurrentSheet.Cells[1, 3, 1, 4].Merge = true;
        CreateTitle(CurrentSheet.Cells[1, 3], _group.name);
        SetCenter(CurrentSheet.Cells[1, 3]);
        
        CurrentSheet.Columns[1].Width = 3.71;
        CurrentSheet.Columns[2].Width = 10.71;
        CurrentSheet.Columns[3].Width = 35.71;
        CurrentSheet.Columns[4].Width = 11.71;
        
        CreateCellWithDate(dayOfWeeks, groupedByDayOfWeek);
    }

    private DayOfWeekGrouped GetGroupedPairs(DayOfWeek[] dayOfWeeks, Pair[] pairs, Time[] times)
    {
        var groupedByDayOfWeek = new DayOfWeekGrouped();
        foreach (DayOfWeek dayOfWeek in dayOfWeeks)
        {
            var groupedByTime = new PairGrouped();
            
            int max = int.MinValue;
            int min = int.MaxValue;
            
            for (int i = 0; i < pairs.Length; i++)
            {
                if (pairs[i].dayOfWeek.id != dayOfWeek.id)
                {
                    continue;
                }

                if (min > pairs[i].time.id)
                {
                    min = pairs[i].time.id;
                }

                if (max < pairs[i].time.id)
                {
                    max = pairs[i].time.id;
                }
            }
            
            foreach (Time time in times)
            {
                var list = pairs.Where(pair => pair.time.id == time.id && pair.dayOfWeek.id == dayOfWeek.id).ToList();
                if (time.id >= min && time.id <= max)
                {
                    groupedByTime.Add(time, list);
                }
            }
            groupedByDayOfWeek.Add(dayOfWeek, groupedByTime);
        }

        return groupedByDayOfWeek;
    }
    private void CreateCellWithDate(DayOfWeek[] dayOfWeeks, DayOfWeekGrouped groupedByDayOfWeek)
    {
        int row = 2;
        int lastRow = 2;
        int countDays = 0;
        foreach (var dayOfWeek in dayOfWeeks)
        {
            countDays++;
            var listByTimeGrouped = groupedByDayOfWeek.Get(dayOfWeek);
            foreach (var time in listByTimeGrouped.Keys)
            {
                CreateRow(listByTimeGrouped, time, row);
                row++;
            }
            
            CurrentSheet.Cells[lastRow, 1 ,row - 1, 4].Style.Border.BorderAround(ExcelBorderStyle.Medium);
            
            Color backgroundColor = Color.White;
            
            if (countDays % 2 == 0)
            {
                backgroundColor = Color.FromArgb(1, 230, 243, 255);
            }

            CurrentSheet.Cells[lastRow, 1, row - 1, 4].Style.Fill.SetBackground(backgroundColor);
            CurrentSheet.Cells[lastRow, 1, row - 1, 1].Merge = true;
            
            CreateTitle(CurrentSheet.Cells[lastRow, 1], dayOfWeek.name);
            SetCenter(CurrentSheet.Cells[lastRow, 1]);
            
            CurrentSheet.Cells[lastRow, 1].Style.TextRotation = 90;
            
            lastRow = row;
        }
    }
    
    private void CreateRow(PairGrouped listByTimeGrouped, Time time, int row )
    {
        var filteredPairs = listByTimeGrouped.Get(time);
                
        CreateCell(CurrentSheet.Cells[row, 2], time.name);
                
        var (pairText, audienceText) = CreateTextForCell(filteredPairs.ToArray());
                
        CreateCell(CurrentSheet.Cells[row, 3], pairText);
        CreateCell(CurrentSheet.Cells[row, 4], audienceText);
                
        CurrentSheet.Cells[row, 3].Style.WrapText = true;
        CurrentSheet.Cells[row, 4].Style.WrapText = true;
        CurrentSheet.Cells[row, 4].Style.Border.BorderAround(ExcelBorderStyle.Medium);
    }
    
    private (string, string) CreateTextForCell(Pair[] pairs)
    {
        string pairText = "";
        string audienceText = "";
        
        foreach (var pair in pairs)
        {
            pairText += string.IsNullOrEmpty(pair.teacherSubject.Subject.Name) 
                ? pair.teacherSubject.Subject.FullName 
                : pair.teacherSubject.Subject.Name;
                    
            var dateStart = pair.dateStart.ToDateTime(TimeOnly.MinValue);
            var dateEnd = pair.dateEnd.ToDateTime(TimeOnly.MinValue);
            int numberOfWeeks = ((int)(dateEnd - dateStart).TotalDays) / 7 + 1;
                    
            pairText += $" {numberOfWeeks} н. с {pair.dateStart:d/M} {pair.teacherSubject.Teacher.FullName}       \t";
            audienceText += pair.audience.fullName + " \n";
        }
        
        return (pairText, audienceText);
    }
    
    private void CreateCell(ExcelRange range, string text)
    {
        range.Value = text;
        range.Style.Border.BorderAround(ExcelBorderStyle.Thin);
    }
    
    private void CreateTitle(ExcelRange range, string text)
    {
        CreateCell(range, text);
        range.Style.Font.Bold = true;
    }

    private void SetCenter(ExcelRange range)
    {
        range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
    }
    
    public byte[] Generate()
    {
        return _package.GetAsByteArray();
    }
}