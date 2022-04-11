using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{
    [Authorize]
    public class SpelController : Controller
    {
        private readonly ReversiApiService _service;
        private readonly ReversiDbContext _context;

        public SpelController(ReversiApiService service, ReversiDbContext context)
        {
            _service = service;
            _context = context;
        }

        public IActionResult Index()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Spel spel = _service.GetSpelFromPlayer(currentUserId);

            if (spel != null)
            {
                return RedirectToAction(nameof(Bord), new { id = spel.token });
            }

            return View(_service.GetAll());
        }

        public IActionResult Create() 
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Spel spel = _service.GetSpelFromPlayer(currentUserId);

            if (spel != null)
            {
                return RedirectToAction(nameof(Bord), new { id = spel.token });
            }

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("omschrijving")] Spel spel)
        {
            if (ModelState.IsValid)
            {
                ClaimsPrincipal currentUser = this.User;
                var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                spel = _service.CreateSpel(currentUserId, spel.omschrijving);
                return RedirectToAction(nameof(Bord), new { id = spel.token });
            }

            return View(spel);
        }

        [HttpGet]
        public async Task<IActionResult> Done(string id)
        {
            if (id == null) return NotFound();


            Spel spel = _service.GetSpel(id);
            if (spel == null) return NotFound();

            ClaimsPrincipal currentUser = this.User;
            var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Speler speler1 = _context.Spelers.FirstOrDefault(s => s.Guid == spel.speler1Token);
            if (speler1 == null) return NotFound();

            Speler speler2 = _context.Spelers.FirstOrDefault(s => s.Guid == spel.speler2Token);
            if (speler2 == null) return NotFound();


            int score1 = spel.bord.Count(v => v.Value == 1);
            int score2 = spel.bord.Count(v => v.Value == 2);

            if (score1 > score2)
            {
                speler1.AantalGewonnen++;
                speler2.AantalVerloren++;
            }
            else if (score2 > score1)
            {
                speler2.AantalGewonnen++;
                speler1.AantalVerloren++;
            }
            else
            {
                speler1.AantalGelijk++;
                speler2.AantalGelijk++;
            }

            await _context.SaveChangesAsync();

            if (!_service.Delete(id)) return BadRequest();

            return Ok();
        }

        public IActionResult Join(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ClaimsPrincipal currentUser = this.User;
            var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Spel spel = _service.JoinSpel(id, currentUserId);

            return RedirectToAction(nameof(Bord), new { id = spel.token });
        }

        public IActionResult Bord(string id)
        {
            if (id == null)
            {
                return RedirectToAction(nameof(Index));
            }

            Spel spel = _service.GetSpel(id);

            if (spel == null)
            {
                return RedirectToAction(nameof(Index));
            }

            return View(spel);
        }

        [HttpPost, ActionName("Leave")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Leave(string id)
        {
            if (id == null) return RedirectToAction(nameof(Index)); ;


            Spel spel = _service.GetSpel(id);
            if (spel == null) return RedirectToAction(nameof(Index)); ;

            ClaimsPrincipal currentUser = this.User;
            var currentUserId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            Speler speler1 = _context.Spelers.FirstOrDefault(s => s.Guid == spel.speler1Token);
            if (speler1 == null) return NotFound();

            Speler speler2 = _context.Spelers.FirstOrDefault(s => s.Guid == spel.speler2Token);
            if (speler2 == null) {
                if (!_service.Delete(id)) return BadRequest();

                return RedirectToAction(nameof(Index));
            }


            if (speler2.Guid == currentUserId)
            {
                speler1.AantalGewonnen++;
                speler2.AantalVerloren++;
            }
            else if (speler1.Guid == currentUserId)
            {
                speler2.AantalGewonnen++;
                speler1.AantalVerloren++;
            }
            

            await _context.SaveChangesAsync();

            if (!_service.Delete(id)) return BadRequest();

            return RedirectToAction(nameof(Index));

        }

    }
}
