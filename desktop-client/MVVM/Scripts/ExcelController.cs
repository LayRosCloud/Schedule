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
        var groupedByDayOfWeek = new DayOfWeekGrouped();
        foreach (DayOfWeek dayOfWeek in dayOfWeeks)
        {
            var groupedByTime = new PairGrouped();
            foreach (Time time in times)
            {
                var list = pairs.Where(pair => pair.time.id == time.id && pair.dayOfWeek.id == dayOfWeek.id).ToList();
                if (list.Count != 0)
                {
                    groupedByTime.Add(time, list);
                }
            }
            groupedByDayOfWeek.Add(dayOfWeek, groupedByTime);
        }

        CurrentSheet.Cells[1, 1, 1, 2].Merge = true;
        CreateTitle(CurrentSheet.Cells[1, 1], "09.05-01.11");

        CurrentSheet.Cells[1, 3, 1, 4].Merge = true;
        CreateTitle(CurrentSheet.Cells[1, 3], _group.name);
        SetCenter(CurrentSheet.Cells[1, 3]);
        
        int row = 2;
        int lastRow = 2;
        int countDays = 0;

        CurrentSheet.Columns[3].Width = 50;
        CurrentSheet.Columns[4].Width = 25;
        
        foreach (var dayOfWeek in dayOfWeeks)
        {
            countDays++;
            var listByTimeGrouped = groupedByDayOfWeek.Get(dayOfWeek);
            foreach (var time in listByTimeGrouped.Keys)
            {
                var currentTime = time;
                var filteredPairs = listByTimeGrouped.Get(currentTime);
                
                CreateCell(CurrentSheet.Cells[row, 2], currentTime.name);
                
                string audienceText = "";
                string pairText = "";
                
                foreach (var pair in filteredPairs)
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
                CreateCell(CurrentSheet.Cells[row, 3], pairText);
                CreateCell(CurrentSheet.Cells[row, 4], audienceText);
                
                CurrentSheet.Cells[row, 3].Style.WrapText = true;
                CurrentSheet.Cells[row, 4].Style.WrapText = true;
                CurrentSheet.Cells[row, 4].Style.Border.BorderAround(ExcelBorderStyle.Medium);
                
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