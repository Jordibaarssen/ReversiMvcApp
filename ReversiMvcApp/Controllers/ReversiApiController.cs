using Microsoft.AspNetCore.Mvc;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{

    [Route("api/Spel")]
    [ApiController]
    public class ReversiApiController : ControllerBase
    {
        private readonly ReversiApiService _service;
        private readonly HttpClient httpClient;

        public ReversiApiController()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:5003/");
        }

        [HttpGet("/api/Spel/{id}")]
        public ActionResult<Spel> GetSpel(string id)
        {
            Spel objecten = null;

            HttpResponseMessage result = httpClient.GetAsync("/api/spel/" + id).Result;
            if (result.IsSuccessStatusCode)
            {
                objecten = result.Content.ReadAsAsync<Spel>().Result;
            }

            return Ok(objecten);
        }

        [HttpGet("/api/Spel/Beurt/{token}")]
        public ActionResult<Kleur> GetBeurt(string token)
        {
            Kleur objecten = Kleur.Geen;

            HttpResponseMessage result = httpClient.GetAsync("/api/Spel/Beurt/" + token).Result;
            if (result.IsSuccessStatusCode)
            {
                objecten = result.Content.ReadAsAsync<Kleur>().Result;
            }

            return Ok(objecten);
        }

        [HttpPut("/api/Spel/{id}/zet")]
        public ActionResult<Spel> DoeZet(string id, [FromQuery] string token, [FromQuery] string x, [FromQuery] string y)
        {
            Spel objecten = null;

            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("token", token),
                new KeyValuePair<string, string>("x", x),
                new KeyValuePair<string, string>("y", y),
            });

            HttpResponseMessage result = httpClient.PostAsync("/api/spel/"+ id + "/zet", formContent).Result;
            if (result.IsSuccessStatusCode)
            {
                objecten = result.Content.ReadAsAsync<Spel>().Result;
            }

            return Ok(objecten);
        }


    }

}
