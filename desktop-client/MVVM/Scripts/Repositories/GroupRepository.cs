using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class GroupRepository : IDataReader<Group>
{
    public Task<Group[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<Group> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}