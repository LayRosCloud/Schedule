using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class DayOfWeekRepository : IDataReader<DayOfWeek>
{
    public Task<DayOfWeek[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<DayOfWeek> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}