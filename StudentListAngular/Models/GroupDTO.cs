using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace StudentListAngular.Models
{
    public class GroupDTO
    {
        [Required]
        public int IDGroup { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Stamp { get; set; }
    }
}