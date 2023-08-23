using System;

namespace MVVM.Models;

public class Pair : Model
{
    public DateOnly dateStart { get; set; }
    public DateOnly dateEnd { get; set; }
    public Audience audience { get; set; }
    public TeacherSubject teacherSubject { get; set; }
    public DayOfWeek dayOfWeek { get; set; }
    public Time time { get; set; }   
    public TypeOfPair typeOfPair { get; set; }

    public Pair(int id, DateOnly dateStart, DateOnly dateEnd, Audience audience, TeacherSubject teacherSubject, DayOfWeek dayOfWeek, Time time, TypeOfPair typeOfPair)
        : base(id)
    {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.audience = audience;
        this.teacherSubject = teacherSubject;
        this.dayOfWeek = dayOfWeek;
        this.time = time;
        this.typeOfPair = typeOfPair;
    }
}