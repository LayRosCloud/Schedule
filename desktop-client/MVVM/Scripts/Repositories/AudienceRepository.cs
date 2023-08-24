using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class AudienceRepository : IDataReader<Audience>
{
    public async Task<Audience> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Audience>($"{Constants.DOMAIN}/v1/cache/audiences/{id}");
            
        return response!;
    }

    public async Task<Audience[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Audience[]>($"{Constants.DOMAIN}/v1/cache/audiences/");

        return response!;
    }
}