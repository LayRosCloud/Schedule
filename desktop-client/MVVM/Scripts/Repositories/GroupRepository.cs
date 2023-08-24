using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class GroupRepository : IDataReader<Group>
{
    public async Task<Group[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Group[]>($"{Constants.DOMAIN}/v1/groups");
            
        return response!;
    }

    public async Task<Group> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Group>($"{Constants.DOMAIN}/v1/groups/{id}");
            
        return response!;
    }
}