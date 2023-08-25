using MVVM.Models;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using System.Text;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;
using MVVM.Views;

namespace MVVM.Scripts.Repositories
{
    internal class PairRepository : ICrudRepository<Pair>
    {
        public async Task<Pair> Create(Pair entity)
        {
            HttpClient httpClient = new HttpClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, $"{Constants.DOMAIN}/v1/pairs/");
            
            request.Headers.Add("Authorization", $"Bearer {SaveVariables.Instance.AccessToken}");
            string requestBody = "{" +
                                 $"\"dateStart\": \"{entity.dateStart}\"," +
                                 $"\"dateEnd\": \"{entity.dateEnd}\"," +
                                 $"\"audienceId\": \"{entity.audienceId}\"," +
                                 $"\"teacherSubjectId\": \"{entity.teacherSubjectId}\"," +
                                 $"\"groupId\": \"{entity.groupId}\"," +
                                 $"\"timeId\": \"{entity.timeId}\"," +
                                 $"\"dayOfWeekId\": \"{entity.dayOfWeekId}\"," +
                                 $"\"typeOfPairId\": \"{entity.typeOfPairId}\"," +
                                 "}";
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await httpClient.SendAsync(request);
            await MessageBox.Show(SaveVariables.Instance.GetMainWindow(), response.StatusCode.ToString());
            var responseBody = await response.Content.ReadFromJsonAsync<Pair>();

            return responseBody!;
        }

        public async Task Delete(int id)
        {
            HttpClient httpClient = new HttpClient();
            
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {SaveVariables.Instance.AccessToken}");

            var response = await httpClient.DeleteAsync($"{Constants.DOMAIN}/v1/pairs/{id}");
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
            
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {SaveVariables.Instance.AccessToken}");
            
            var response = await httpClient.PutAsJsonAsync($"{Constants.DOMAIN}/v1/pairs/{entity.id}", entity);
            var pair = await response.Content.ReadFromJsonAsync<Pair>();
            return pair!;
        }
    }
}
