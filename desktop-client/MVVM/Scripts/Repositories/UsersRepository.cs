using MVVM.Models;
using MVVM.Scripts.API;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace MVVM.Scripts.Repositories;

internal class UsersRepository
{
    public async Task<User?> Login(string login, string password)
    {
        HttpClient httpClient = new HttpClient();

        var post = await httpClient.PostAsJsonAsync<User>($"{Constants.DOMAIN_OAUTH}", new User(1,login, password, ""));
        User? user = await post.Content.ReadFromJsonAsync<User>();
        return user;
    }
}