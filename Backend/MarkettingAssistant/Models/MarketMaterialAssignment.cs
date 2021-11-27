using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MarkettingAssistant.Models
{
    public class MarketMaterialAssignment
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int MarketMaterialId { get; set; }
        public DateTime StartDt { get; set; }
        public DateTime EndDt { get; set; }
    }
}