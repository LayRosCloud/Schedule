using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories
{
    internal interface IDataRemover <T>
    {
        public Task Delete(int id);
    }
}
