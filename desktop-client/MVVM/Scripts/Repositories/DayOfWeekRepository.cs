using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class DayOfWeekRepository : IDataReader<DayOfWeek>
{
    public async Task<DayOfWeek[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<DayOfWeek[]>($"{Constants.DOMAIN}/v1/dayOfWeeks");
            
        return response!;
    }

    public async Task<DayOfWeek> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<DayOfWeek>($"{Constants.DOMAIN}/v1/dayOfWeeks/{id}");
            
        return response!;
    }
}