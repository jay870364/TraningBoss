using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Bossinfo.Models.HelloWorld
{
    public class Category
    {
        //public ICollection<object> News { get; internal set; }

        public Category()
        {
            News = new HashSet<News>();
            News2 = new HashSet<News2>();
        }
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public ICollection<News> News { get; internal set; }
        public ICollection<News2> News2 { get; internal set; }
    }
}
