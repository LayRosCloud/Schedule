using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories
{
    public interface IDataReader <T>
    {
        public Task<T[]> GetAll();
        public Task<T> Get(int id);
    }
}
