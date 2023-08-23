using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories.Interfaces;

internal interface IDataRemover
{
    public Task Delete(int id);
}

