using MVVM.Models;
using MVVM.Scripts.API;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Authentication;
using System.Threading.Tasks;
using MVVM.Views;

namespace MVVM.Scripts.Repositories;

internal class UsersRepository
{
    public async Task<User?> Login(string login, string password)
    {
        HttpClient httpClient = new HttpClient();
        JsonContent content = JsonContent.Create(new UserAuth(login, password));
        var post = await httpClient.PostAsync($"{Constants.DOMAIN_OAUTH}/v1/users/login", content);
        if (post.StatusCode != HttpStatusCode.OK)
        {
            throw new AuthenticationException();
        }
        
        User? user = await post.Content.ReadFromJsonAsync<User>();
        SaveVariables.Instance.AccessToken = user.accessToken;
        return user;
    }
}