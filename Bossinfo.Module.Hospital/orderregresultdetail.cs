using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bossinfo.Module.Hospital
{
    public class orderregresultdetail
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long OrderRegResultID { get; set; }

        [StringLength(100)]
        public string ItemID { get; set; }

        [StringLength(200)]
        public string ItemName { get; set; }

        [StringLength(20)]
        public string ResultNoteOriginalValue { get; set; }

        [StringLength(200)]
        public string Result { get; set; }

        [StringLength(5)]
        public string ResultNote { get; set; }

        [StringLength(500)]
        public string ReferenceVauleDescription { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Sort { get; set; }

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
