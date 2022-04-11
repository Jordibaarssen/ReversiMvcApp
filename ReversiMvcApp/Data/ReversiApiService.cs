using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Data
{
    public static class HttpContentExtensions
    {
        public static async Task<T> ReadAsAsync<T>(this HttpContent content) =>
            await JsonSerializer.DeserializeAsync<T>(await content.ReadAsStreamAsync());
    }

    public class ReversiApiService
    {
        private readonly HttpClient httpClient;

        public ReversiApiService()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:5003/");
        }

        public List<Spel> GetAll()
        {
            List<Spel> objecten = new List<Spel>();
            
            var resultaat = httpClient.GetAsync("/api/spel/").Result;
            if (resultaat.IsSuccessStatusCode)
            {
                objecten = resultaat.Content.ReadAsAsync<List<Spel>>().Result;
            }

            return objecten;
        }

        public Spel GetSpel(string id)
        {
            Spel objecten = null;
            
            var resultaat = httpClient.GetAsync($"/api/spel/{id}").Result;
            if (resultaat.IsSuccessStatusCode)
            {
                objecten = resultaat.Content.ReadAsAsync<Spel>().Result;
            }

            return objecten;
        }

        public Spel CreateSpel(string spelerToken, string omschrijving)
        {
            Spel objecten = null;
            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("spelerToken", spelerToken),
                new KeyValuePair<string, string>("omschrijving", omschrijving)
            });

            HttpResponseMessage result = httpClient.PostAsync("/api/spel/", formContent).Result;
            if (result.IsSuccessStatusCode)
            {
                objecten = result.Content.ReadAsAsync<Spel>().Result;
            }

            return objecten;
        }

        public Spel JoinSpel(string id, string spelerToken)
        {
            Spel objecten = null;

            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("spelerToken", spelerToken),
            });

            HttpResponseMessage result = httpClient.PostAsync(
                $"/api/Spel/{id}/join/", formContent).Result;
            if (result.IsSuccessStatusCode)
            {
                objecten = result.Content.ReadAsAsync<Spel>().Result;
            }

            return objecten;
        }

        public Spel GetSpelFromPlayer(string spelerToken)
        {
            Spel objecten = null;
            
            var resultaat = httpClient.GetAsync($"/api/SpelSpeler/{spelerToken}").Result;
            if (resultaat.IsSuccessStatusCode)
            {
                objecten = resultaat.Content.ReadAsAsync<Spel>().Result;
            }

            return objecten;
        }

        public bool Delete(string id)
        {
            var resultaat = httpClient.DeleteAsync($"/api/spel/{id}/remove").Result;

            return resultaat.IsSuccessStatusCode;
        }
    }
}