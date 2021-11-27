using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MarkettingAssistant.Models;
namespace MarkettingAssistant
{
    public class MarkettingRepository
    {

        public List<Book> GetBooks()
        {
            MarkettingDBContext markettingDBContext = new MarkettingDBContext();
            return markettingDBContext.Books.ToList();
        }
    }
}