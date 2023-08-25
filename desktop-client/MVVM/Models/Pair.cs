using System;

namespace MVVM.Models;

public class Pair : Model
{
    public DateOnly dateStart { get; set; }
    public DateOnly dateEnd { get; set; }
    public int? audienceId { get; set; }
    public int? teacherSubjectId { get; set; }
    public int? dayOfWeekId { get; set; }
    public int? timeId { get; set; }
    public int? typeOfPairId { get; set; }
    public int? groupId { get; set; }
    public Audience audience { get; set; }
    public TeacherSubject teacherSubject { get; set; }
    public DayOfWeek dayOfWeek { get; set; }
    public Time time { get; set; }   
    public TypeOfPair typeOfPair { get; set; }
    public Group group { get; set; }

    public Pair()
        : this(0, DateOnly.MinValue, DateOnly.MaxValue, 0, 0, 0, 0, 0, 0)
    {
        
    }

    public Pair(int id, DateOnly dateStart, DateOnly dateEnd, int audienceId, int teacherSubjectId, int dayOfWeekId,
        int timeId, int typeOfPairId, int groupId) 
        : base(id)
    {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.audienceId = audienceId;
        this.teacherSubjectId = teacherSubjectId;
        this.dayOfWeekId = dayOfWeekId;
        this.timeId = timeId;
        this.typeOfPairId = typeOfPairId;
        this.groupId = groupId;
    }
    
    public Pair(int id, DateOnly dateStart, DateOnly dateEnd, Audience audience, TeacherSubject teacherSubject, 
        DayOfWeek dayOfWeek, Time time, TypeOfPair typeOfPair, Group group)
        : this(id, dateStart, dateEnd, audience.id, teacherSubject.id, dayOfWeek.id, time.id, typeOfPair.id, group.id)
    {
        this.audience = audience;
        this.teacherSubject = teacherSubject;
        this.dayOfWeek = dayOfWeek;
        this.time = time;
        this.typeOfPair = typeOfPair;
        this.group = group;
    }
}