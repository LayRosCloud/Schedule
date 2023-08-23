﻿using MVVM.Models;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json;
using MVVM.Scripts.API;
using MVVM.Scripts.Repositories.Interfaces;

namespace MVVM.Scripts.Repositories
{
    internal class PairRepository : ICrudRepository<Pair>
    {
        public Task<Pair> Create(Pair entity)
        {
            throw new System.NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new System.NotImplementedException();
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

        public Task<Pair> Update(Pair entity)
        {
            throw new System.NotImplementedException();
        }
    }
}
