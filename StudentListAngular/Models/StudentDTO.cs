using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StudentListAngular.Models
{
    public class StudentDTO
    {
        [Required]
        public int IDStudent { get; set; }
        [Required]
        public int IDGroup { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string BirthPlace { get; set; }
        public DateTime? BirthDate { get; set; }
        [Required]
        public string IndexNo { get; set; }
        [Required]
        public String Stamp { get; set; }
    }
}