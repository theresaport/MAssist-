using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarkettingAssistant.Models
{
    public class Marketer
    {
        public int Id { get; set; }        
        public string 	FirstName { get; set; }        
        public string LastName { get; set; }
        public  bool Active { get; set; }
    }
}