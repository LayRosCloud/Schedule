namespace MVVM.Models
{
    public class TeacherSubject : Model
    {
        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }
        public string FullName { get; set; }

        public TeacherSubject(int id, Subject subject, Teacher teacher)
            : base(id)
        {
            int firstLetter = 0;
            Subject = subject;
            Teacher = teacher;
            FullName =  $"{Teacher.LastName} {Teacher.Name[firstLetter]}. {Teacher.Patronymic[firstLetter]}. - {Subject.FullName}";
        }
        public override bool Equals(object? obj)
        {
            TeacherSubject teacherSubject = obj as TeacherSubject;
            return id.Equals(teacherSubject.id);
        }
    }
}
