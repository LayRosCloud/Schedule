namespace MVVM.Models
{
    public class TeacherSubject
    {
        public int id { get; set; }
        public Subject Subject { get; set; }
        public Teacher Teacher { get; set; }

        public TeacherSubject(int id, Subject subject, Teacher teacher)
        {
            this.id = id;
            Subject = subject;
            Teacher = teacher;
        }
    }
}
