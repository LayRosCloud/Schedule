using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories
{
    internal interface IDataWriter <T>
    {
        public Task<T> Create(T entity);
        public Task<T> Update(T entity);
    }
}
