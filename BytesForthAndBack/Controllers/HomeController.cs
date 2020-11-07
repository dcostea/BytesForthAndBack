using BytesForthAndBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BytesForthAndBack.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly byte[] originalBytes;

        public HomeController(ILogger<HomeController> logger)
        {
            originalBytes = new byte[] { 10, 20, 30, 40, 50 };

            _logger = logger;
        }

        [HttpGet("api/bytes")]
        public byte[] GetBytesAsync()
        {
            return originalBytes;
        }

        [HttpPost("api/bytes")]
        public async Task<IActionResult> PostBytesAsync()
        {
            string result;
            using StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            result = await reader.ReadToEndAsync();

            byte[] resultBytes = Convert.FromBase64String(result);

            return Ok(resultBytes);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
