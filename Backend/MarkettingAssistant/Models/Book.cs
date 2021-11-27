using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarkettingAssistant.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public DateTime PublishDate { get; set; }	

    }
}


