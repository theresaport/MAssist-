namespace MarkettingAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Give_it_a_name3 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Marketers", "EmployeeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Marketers", "EmployeeId", c => c.Int(nullable: false));
        }
    }
}          
