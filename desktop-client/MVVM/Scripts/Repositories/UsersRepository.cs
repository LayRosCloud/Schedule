using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories;

public class UsersRepository
{
    public Task Login(string login, string password)
    {
        return Task.CompletedTask;
    }
}