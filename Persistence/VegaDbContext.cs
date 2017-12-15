using Microsoft.EntityFrameworkCore;
using oshop.Models;

namespace oshop.Persistence
{
    public class VegaDbContext:DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options):base(options)
        {
        }

                    public DbSet<User> Users { get; set; }
                    public DbSet<UserAddress> UserAddresses { get; set; }
    }



}