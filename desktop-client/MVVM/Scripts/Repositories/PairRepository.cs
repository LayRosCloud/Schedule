using MVVM.Models;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories
{
    internal class PairRepository : ICrudRepository<Pair>
    {
        public async Task<Pair> Create(Pair entity)
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.PostAsJsonAsync($"{Constants.DOMAIN}/v1/pairs/", entity);
            var pair = await response.Content.ReadFromJsonAsync<Pair>();
            return pair!;
        }

        public async Task Delete(int id)
        {
            HttpClient httpClient = new HttpClient();
            await httpClient.DeleteAsync($"{Constants.DOMAIN}/v1/pairs/{id}");
        }

        public async Task<Pair> Get(int id)
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.GetFromJsonAsync<Pair>($"{Constants.DOMAIN}/v1/pairs/{id}");
            
            return response!;
        }

        public async Task<Pair[]> GetAll()
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.GetFromJsonAsync<Pair[]>($"{Constants.DOMAIN}/v1/pairs/");

            return response!;
        }
        public async Task<Pair[]> GetAll(int groupId)
        {
            HttpClient httpClient = new HttpClient();

            var response = 
                await httpClient.GetFromJsonAsync<Pair[]>($"{Constants.DOMAIN}/v1/pairs?groupId={groupId}");

            return response!;
        }

        public async Task<Pair> Update(Pair entity)
        {
            HttpClient httpClient = new HttpClient();
            var response = await httpClient.PutAsJsonAsync($"{Constants.DOMAIN}/v1/pairs/{entity.id}", entity);
            var pair = await response.Content.ReadFromJsonAsync<Pair>();
            return pair!;
        }
    }
}
