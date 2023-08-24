using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TimeRepository : IDataReader<Time>
{
    public async Task<Time[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Time[]>($"{Constants.DOMAIN}/v1/times");
            
        return response!;
    }

    public async Task<Time> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<Time>($"{Constants.DOMAIN}/v1/times/{id}");
            
        return response!;
    }
}