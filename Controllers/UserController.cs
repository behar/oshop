using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using oshop.Models;
using oshop.Persistence;
using oshop.Persistence.Resources;

namespace oshop.Controllers
{
    public class UserController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public UserController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }


        [HttpGet("/api/users")]
        //[Authorize]
        public async Task<IEnumerable<UserResource>> GetUsers()
        {
            var users = await context.Users.Include(u => u.UserAddress).ToListAsync();

            return mapper.Map<List<User>,List<UserResource>>(users);
        }
    }
}