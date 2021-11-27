namespace MarkettingAssistant.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Give_it_a_name : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        ISBN = c.String(),
                        AuthorFirstName = c.String(),
                        AuthorLastName = c.String(),
                        PublishDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Marketers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmployeeId = c.Int(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Marketers");
            DropTable("dbo.Books");
        }
    }
}
