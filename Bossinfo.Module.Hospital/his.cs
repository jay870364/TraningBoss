using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bossinfo.Module.Hospital
{
    public class his
    {
        [Key]
        public long ID { get; set; }

        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(10)]
        public string Account { get; set; }

        [StringLength(10)]
        public string Password { get; set; }

        public int Status { get; set; }

        [StringLength(500)]
        public string Remark { get; set; }

        public DateTime? CreatedTime { get; set; }

        public long? CreatedBy { get; set; }

        public DateTime? LastModifiedTime { get; set; }

        public long? LastModifiedBy { get; set; }
    }
}
