using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using MVVM.Models;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories;

public class TeacherSubjectRepository : IDataReader<TeacherSubject>
{
    public async Task<TeacherSubject> Get(int id)
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<TeacherSubject>($"{Constants.DOMAIN}/v1/cache/teacherSubjects/{id}");
            
        return response!;
    }

    public async Task<TeacherSubject[]> GetAll()
    {
        HttpClient httpClient = new HttpClient();
        var response = await httpClient.GetFromJsonAsync<TeacherSubject[]>($"{Constants.DOMAIN}/v1/cache/teacherSubjects/");

        return response!;
    }
}