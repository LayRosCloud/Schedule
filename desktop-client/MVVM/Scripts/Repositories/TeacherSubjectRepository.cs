using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TeacherSubjectRepository : IDataReader<TeacherSubject>
{
    public Task<TeacherSubject[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<TeacherSubject> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}