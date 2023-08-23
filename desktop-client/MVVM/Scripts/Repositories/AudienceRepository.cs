using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class AudienceRepository : IDataReader<Audience>
{
    public Task<Audience[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<Audience> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}