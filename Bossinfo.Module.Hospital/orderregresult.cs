using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bossinfo.Module.Hospital
{
    public class orderregresult
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long HospitalID { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(10)]
        public string InspectionNumber { get; set; }

        [StringLength(10)]
        public string Idno { get; set; }

        [StringLength(40)]
        public string Name { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? InspectionDateTime { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? SendInspectionDateTime { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? RegDateTime { get; set; }

        [StringLength(20)]
        public string RegNo { get; set; }

        [Key]
        [Column(Order = 3)]
        public bool IsDelete { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? CreatedTime { get; set; }

        public long? CreatedBy { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? LastModifiedTime { get; set; }

        public long? LastModifiedBy { get; set; }
    }
}
