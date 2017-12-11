using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;

namespace Bossinfo.Models.Hospital
{
    public class his1
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

    }
}