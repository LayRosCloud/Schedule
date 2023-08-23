using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories.Interfaces;

public interface IDataReader <T>
{
    public Task<T[]> GetAll();
    public Task<T> Get(int id);
}

