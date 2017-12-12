using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bossinfo.Models.HelloWorldBack
{
    public class HelloWorldContext : DbContext
    {
        public DbSet<Category> Categoryies { get; set; }
        public DbSet<News> News { get; set; }
        //public DbSet<News2> News2 { get; set; }
        public HelloWorldContext() : base ("name=HelloWorldContext")
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("helloworld");

            modelBuilder.Entity<Category>()
                .HasMany(e => e.News)
                .WithRequired(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .WillCascadeOnDelete(true);

            //modelBuilder.Entity<Category>()
            //    .HasMany(e => e.News2)
            //    .WithRequired(e => e.Category)
            //    .HasForeignKey(e => e.CategoryId)
            //    .WillCascadeOnDelete(true);
        }
    }
}
