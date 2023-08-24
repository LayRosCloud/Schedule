using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TypeOfPairRepository : IDataReader<TypeOfPair>
{
    public async Task<TypeOfPair[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<TypeOfPair[]>($"{Constants.DOMAIN}/v1/typeOfPairs");
            
        return response!;
    }

    public async Task<TypeOfPair> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<TypeOfPair>($"{Constants.DOMAIN}/v1/typeOfPairs/{id}");
            
        return response!;
    }
}