using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TimeRepository : IDataReader<Time>
{
    public Task<Time[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<Time> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}