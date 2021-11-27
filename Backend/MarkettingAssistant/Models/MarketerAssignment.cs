using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarkettingAssistant.Models
{
    public class MarketerAssignment
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int MarketerId { get; set; }
        public DateTime StartDt { get; set; }
        public DateTime EndDt { get; set; }

    }
}