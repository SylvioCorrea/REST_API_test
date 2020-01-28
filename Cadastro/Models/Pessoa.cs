using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Cadastro.Models
{
    public class Pessoa
    {
        public long Id { get; set; }
        
        [Required(AllowEmptyStrings = false)]
        public string Nome { get; set; }
        
        public string Email { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime? Nascimento { get; set; }
    }
}
