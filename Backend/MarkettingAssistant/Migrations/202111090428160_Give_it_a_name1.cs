namespace MarkettingAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Give_it_a_name1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MarketerAssignments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookId = c.Int(nullable: false),
                        MarketerId = c.Int(nullable: false),
                        StartDt = c.DateTime(nullable: false),
                        EndDt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MarketMaterialAssignments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BookId = c.Int(nullable: false),
                        MarketerMaterialId = c.Int(nullable: false),
                        StartDt = c.DateTime(nullable: false),
                        EndDt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MarketMaterials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MarketMaterials");
            DropTable("dbo.MarketMaterialAssignments");
            DropTable("dbo.MarketerAssignments");
        }
    }
}
