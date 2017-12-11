using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Bossinfo.Models.HelloWorld
{
    public class News2
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [MaxLength]
        public string Images { get; set; }

        [MaxLength]
        public string Content { get; set; }

        public DateTime? CreatedTime { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? LastModifiedTime { get; set; }
        public long? LastModifiedBy { get; set; }

        public long CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
