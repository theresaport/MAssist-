namespace MarkettingAssistant.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using MarkettingAssistant.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<MarkettingAssistant.MarkettingDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "MarkettingAssistant.MarkettingDBContext";
        }

        protected override void Seed(MarkettingAssistant.MarkettingDBContext context)
        {
            //add sample titles(books)
            context.Books.AddOrUpdate(x => x.Id,
                new Book() { Id = 1, Title = "Tale of two cities", ISBN = "123-333-44424", AuthorFirstName = "Tom", AuthorLastName = "Hanks", PublishDate = new DateTime(2021, 12, 01) },
                new Book() { Id = 2, Title = "In Search of Lost Time ", ISBN = "423-333-44424", AuthorFirstName = "Marcel", AuthorLastName = "Proust", PublishDate = new DateTime(2021, 10, 01) },
                new Book() { Id = 3, Title = "Ulysses", ISBN = "423-333-44424", AuthorFirstName = "James", AuthorLastName = "Joyce", PublishDate = new DateTime(2021, 11, 01) },
                new Book() { Id = 4, Title = "Don Quixote", ISBN = "823-333-44424", AuthorFirstName = "Miguelde", AuthorLastName = "Cervantes", PublishDate = new DateTime(2021, 09, 01) },
                new Book() { Id = 5, Title = " One Hundred Years of Solitude", ISBN = "1230-333-44424", AuthorFirstName = "Gabriel", AuthorLastName = "Garcia", PublishDate = new DateTime(2022, 12, 01) },
                new Book() { Id = 6, Title = "Title of arms race", ISBN = "2424-333-44424", AuthorFirstName = "Jeno", AuthorLastName = "Alex", PublishDate = new DateTime(2022, 12, 13) },
                new Book() { Id = 7, Title = "Ancient Weapons", ISBN = "3454-333-44424", AuthorFirstName = "Jerard", AuthorLastName = "Lumkov", PublishDate = new DateTime(2022, 12, 14) },
                new Book() { Id = 8, Title = "WW1", ISBN = "2474-333-44424", AuthorFirstName = "Leo", AuthorLastName = "Frank", PublishDate = new DateTime(2022, 12, 15) },
                new Book() { Id = 9, Title = "WW2", ISBN = "2475-333-44424", AuthorFirstName = "Rea", AuthorLastName = "Jacob", PublishDate = new DateTime(2022, 12, 16) }
        );

            //sample analysts (mrketers)
            context.Marketers.AddOrUpdate(x => x.Id,
                new Marketer() { Id = 1,  FirstName = "Tom", LastName = "Hanks", Active = true },
                new Marketer() { Id = 2,  FirstName = "Vincent", LastName = "Jerome", Active = true },
                new Marketer() { Id = 3,  FirstName = "Alan", LastName = "Bastian", Active = true },
                new Marketer() { Id = 4, FirstName = "Randy", LastName = "Spector", Active = true },
                new Marketer() { Id = 5, FirstName = "Vincent", LastName = "Fero", Active = true },
                new Marketer() { Id = 6, FirstName = "Randolph", LastName = "Hero", Active = true }

        );
            //MarketMaterial
            context.MarketMaterials.AddOrUpdate(x => x.Id,
               new MarketMaterial() { Id = 1, Name = "Flyer", Description = "Flyer-MarketMaterial" },
               new MarketMaterial() { Id = 2, Name = "Banner", Description = "Banner-MarketMaterial" },
               new MarketMaterial() { Id = 3, Name = "Poster", Description = "Poster-MarketMaterial" },
               new MarketMaterial() { Id = 4, Name = "Flyer2", Description = "Flyer2-MarketMateria" },
               new MarketMaterial() { Id = 5, Name = "Banner2", Description = "Banner2-MarketMateria" }
       );

            //MarketerAssignment
            context.MarketerAssignments.AddOrUpdate(x => x.Id,
            new MarketerAssignment() { Id = 1, BookId = 1, MarketerId = 1, StartDt = new DateTime(2021, 12, 01), EndDt = new DateTime(2022, 01, 01) },
            new MarketerAssignment() { Id = 2, BookId = 1, MarketerId = 2, StartDt = new DateTime(2022, 12, 01), EndDt = new DateTime(2023, 01, 01) },
            new MarketerAssignment() { Id = 3, BookId = 1, MarketerId = 3, StartDt = new DateTime(2023, 12, 01), EndDt = new DateTime(2024, 01, 01) },
            new MarketerAssignment() { Id = 4, BookId = 2, MarketerId = 2, StartDt = new DateTime(2021, 10, 01), EndDt = new DateTime(2021, 11, 01) },
            new MarketerAssignment() { Id = 5, BookId = 3, MarketerId = 3, StartDt = new DateTime(2021, 11, 01), EndDt = new DateTime(2021, 11, 10) }
             );

            //MarketMaterialAssignment
            context.MarketMaterialAssignments.AddOrUpdate(x => x.Id,
            new MarketMaterialAssignment() { Id = 1, BookId = 1, MarketMaterialId = 1, StartDt = new DateTime(2021, 12, 01), EndDt = new DateTime(2022, 01, 01) },
            new MarketMaterialAssignment() { Id = 2, BookId = 1, MarketMaterialId = 2, StartDt = new DateTime(2022, 12, 01), EndDt = new DateTime(2023, 01, 01) },
            new MarketMaterialAssignment() { Id = 3, BookId = 2, MarketMaterialId = 3, StartDt = new DateTime(2022, 12, 01), EndDt = new DateTime(2023, 01, 01) }            

             );

        }
    }
}
