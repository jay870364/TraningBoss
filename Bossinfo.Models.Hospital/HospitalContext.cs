using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Bossinfo.Models.Hospital
{
    public class HospitalContext : DbContext
    {
        public DbSet<his1> his { get; set; }
        public DbSet<hospital> hospital { get; set; }
        public DbSet<orderregresult> orderregresult { get; set; }
        public DbSet<orderregresultdetail> orderregresultdetail { get; set; }
        public HospitalContext() : base ("name=HospitalContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("hospital");

        }
    }
}
