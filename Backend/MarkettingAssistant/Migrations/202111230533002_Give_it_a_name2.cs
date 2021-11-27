namespace MarkettingAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Give_it_a_name2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MarketMaterialAssignments", "MarketMaterialId", c => c.Int(nullable: false));
            DropColumn("dbo.MarketMaterialAssignments", "MarketerMaterialId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MarketMaterialAssignments", "MarketerMaterialId", c => c.Int(nullable: false));
            DropColumn("dbo.MarketMaterialAssignments", "MarketMaterialId");
        }
    }
}
