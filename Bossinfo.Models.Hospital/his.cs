namespace Bossinfo.Models.Hospital
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("web_upl.his")]
    public partial class his
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long ID { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(200)]
        public string Name { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(10)]
        public string Account { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(10)]
        public string Password { get; set; }

        [Key]
        [Column(Order = 4)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Status { get; set; }

        [StringLength(500)]
        public string Remark { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? CreatedTime { get; set; }

        public long? CreatedBy { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? LastModifiedTime { get; set; }

        public long? LastModifiedBy { get; set; }
    }
}