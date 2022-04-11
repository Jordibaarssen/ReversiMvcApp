using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReversiMvcApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{
    public class SpelerController : Controller
    {
        private readonly ReversiDbContext _context;

        public SpelerController(ReversiDbContext context)
        {
            _context = context;
        }

        // GET: SpelerController
        public ActionResult Index()
        {
            return View(_context.Spelers.ToList());
        }

        // GET: SpelerController/Details/5
        public ActionResult Details(string id)
        {
            if (id == null) return NotFound();

            var speler = _context.Spelers.FirstOrDefault(s => s.Guid == id);
            if (speler == null) return NotFound();

            return View(speler);
        }
    }
}
