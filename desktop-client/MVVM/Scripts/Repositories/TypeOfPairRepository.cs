using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TypeOfPairRepository : IDataReader<TypeOfPair>
{
    public Task<TypeOfPair[]> GetAll()
    {
        throw new System.NotImplementedException();
    }

    public Task<TypeOfPair> Get(int id)
    {
        throw new System.NotImplementedException();
    }
}