namespace MVVM.Models
{
    public class TeacherSubject : Model
    {
        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }

        public TeacherSubject(int id, Subject subject, Teacher teacher)
            : base(id)
        {
            Subject = subject;
            Teacher = teacher;
        }
    }
}
