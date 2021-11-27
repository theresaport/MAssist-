using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data.Entity;
using MarkettingAssistant.Models;
namespace MarkettingAssistant
{
    public class MarkettingDBContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Marketer> Marketers { get; set; }
        public DbSet<MarketMaterial> MarketMaterials { get; set; }
        public DbSet<MarketerAssignment> MarketerAssignments { get; set; }
        public DbSet<MarketMaterialAssignment> MarketMaterialAssignments { get; set; }
    }
}