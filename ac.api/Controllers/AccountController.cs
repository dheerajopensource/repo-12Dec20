using System.Threading.Tasks;
using ac.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.IdentityModel;
using System;
using System.Security.Claims;

namespace ac.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginVM usercred)
        {
            if (usercred == null)
                return BadRequest("Invalid User. Missing username or password.");
            if (usercred.Username == "dheeraj" && usercred.Password == "12345")
            {
                var secretkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySecretkey@dk1234"));
                var signCred = new SigningCredentials(secretkey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signCred
                );

                var tokenStr = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenStr });
            }

            return Unauthorized(new { message = "You are not authorized." });
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Welcome()
        {
            // GET: https://localhost:5001/api/account
            await Task.Delay(0);
            return Ok(new { message = "Welcome to my site" });
        }
    }
}