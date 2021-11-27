using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using MarkettingAssistant;
using MarkettingAssistant.Models;

namespace MarkettingAssistant.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MarketersController : ApiController
    {
        private MarkettingDBContext db = new MarkettingDBContext();

        // GET: api/Books
        [Route("api/v1/Marketers/GetBooks")]
        [HttpGet]
        public IQueryable<Book> GetBooks()
        {
            return db.Books;
        }

        [Route("api/v1/Marketers/GetBook/{id}")]
        [HttpGet]       
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            db.Entry(book).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        [ResponseType(typeof(Book))]
        public IHttpActionResult PostBook(Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(book);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }



        [Route("api/v1/Marketers/GetMarketers")]
        [HttpGet]
        public IQueryable<Marketer> GetMarketers()
        {
            return db.Marketers;
        }

        // GET: api/Marketers/5
        [ResponseType(typeof(Marketer))]
        public IHttpActionResult GetMarketer(int id)
        {
            Marketer marketer = db.Marketers.Find(id);
            if (marketer == null)
            {
                return NotFound();
            }

            return Ok(marketer);
        }

        [Route("api/v1/Marketers/GetMarketerWithNoTitles")]
        [HttpGet]
        public IHttpActionResult GetMarketerWithNoTitles()
        {           
            using (MarkettingDBContext db = new MarkettingDBContext())
            {
                var marketerWithNoAssignments = db.Marketers
               .Where(c => !db.MarketerAssignments
               .Select(b => b.MarketerId)
               .Contains(c.Id)
               ).ToList();
             
                return Ok(marketerWithNoAssignments);
            }
        }

    [ResponseType(typeof(void))]
        public IHttpActionResult PutMarketer(int id, Marketer marketer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marketer.Id)
            {
                return BadRequest();
            }

            db.Entry(marketer).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarketerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
                
        [ResponseType(typeof(Marketer))]
        public IHttpActionResult PostMarketer(Marketer marketer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Marketers.Add(marketer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = marketer.Id }, marketer);
        }

        // DELETE: api/Marketers/5
        [ResponseType(typeof(Marketer))]
        public IHttpActionResult DeleteMarketer(int id)
        {
            Marketer marketer = db.Marketers.Find(id);
            if (marketer == null)
            {
                return NotFound();
            }

            db.Marketers.Remove(marketer);
            db.SaveChanges();

            return Ok(marketer);
        }


        #region "MarketerAssignment"      

        [Route("api/v1/Marketers/GetMarketerAssignments/{bookId}")]
        [HttpGet]
        public IHttpActionResult GetMarketerAssignments(int bookId)
        {                                  
            using (MarkettingDBContext db = new MarkettingDBContext())
            {
                var marketerAssignments = (from ma in db.MarketerAssignments
                              join b in db.Books
                              on ma.BookId equals b.Id
                              where ma.BookId == bookId
                              select new
                              {
                                  Id = ma.Id,
                                  BookId = ma.BookId,
                                  MarketerId = ma.MarketerId,
                                  StartDt = ma.StartDt,
                                  EndDt = ma.EndDt
                              }).ToList();                

                return Ok(marketerAssignments);
            }
        }

        [Route("api/v1/Marketers/AddAnalystToTitle")]
        [HttpPost]
        public IHttpActionResult AddAnalystToTitle(MarketerAssignment marketerAssignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MarketerAssignments.Add(marketerAssignment);
            db.SaveChanges();
            return Ok();
        }

        [Route("api/v1/Marketers/RemoveAnalystFromTitle/{bookId}/{marketerId}")]
        [HttpPost]
        public IHttpActionResult RemoveAnalystFromTitle(int bookId, int marketerId)
        {

            MarketerAssignment marketerAssignment = db.MarketerAssignments.FirstOrDefault(
                 ma => ma.BookId== bookId && ma.MarketerId== marketerId);


            if (marketerAssignment == null)
            {
                return NotFound();
            }

            db.MarketerAssignments.Remove(marketerAssignment);
            db.SaveChanges();
            return Ok();
        }
           


        #endregion

        #region  "MarketMaterial"

        // GET: api/v1/MarketMaterial
        [Route("api/v1/Marketers/GetMarketMaterials")]
        public IQueryable<MarketMaterial> GetMarketMaterials()
        {
            return db.MarketMaterials;
        }


        [Route("api/v1/Marketers/AddMarketMaterial")]
        [HttpPost]
        public IHttpActionResult AddMarketMaterial(MarketMaterial marketMaterial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MarketMaterials.Add(marketMaterial);
            db.SaveChanges();

            return Ok(); 
        }


        // DELETE: api/MarketMaterial/5
        [ResponseType(typeof(MarketMaterial))]
        public IHttpActionResult DeleteMarketMaterial(int id)
        {
            MarketMaterial marketMaterial = db.MarketMaterials.Find(id);
            if (marketMaterial == null)
            {
                return NotFound();
            }

            db.MarketMaterials.Remove(marketMaterial);
            db.SaveChanges();

            return Ok(marketMaterial);
        }

        #endregion

        #region "MarketMaterialAssignment"

        [Route("api/v1/Marketers/GetMarketMaterialAssignments/{bookId}")]
        [HttpGet]
        public IHttpActionResult GetMarketMaterialAssignments(int bookId)
        {           

            using (MarkettingDBContext db = new MarkettingDBContext())
            {
                var marketMaterialAssignments = (from mma in db.MarketMaterialAssignments
                                           join b in db.Books
                                           on mma.BookId equals b.Id
                                           join mm in db.MarketMaterials 
                                           on mma.MarketMaterialId equals mm.Id
                                           where mma.BookId == bookId
                                           select new
                                           {
                                               Id = mma.Id,
                                               BookId = mma.BookId,
                                               MarketerMaterialId = mma.MarketMaterialId,                                              
                                               Name  = mm.Name,
                                               Description = mm.Description,
                                               EndDt = mma.EndDt,
                                               StartDt = mma.StartDt,
                                           }).ToList();

                return Ok(marketMaterialAssignments);
            }
        }


        [Route("api/v1/Marketers/AddMarketMaterialAssignment")]
        [HttpPost]
        public IHttpActionResult AddMarketMaterialAssignment(MarketMaterialAssignment marketMaterialAssignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MarketMaterialAssignments.Add(marketMaterialAssignment);
            db.SaveChanges();
            return Ok();
        }

        [Route("api/v1/Marketers/RemoveMarketMaterialFromTitle/{marketMaterialId}")]
        [HttpPost]
        public IHttpActionResult RemoveMarketMaterialFromTitle(int marketMaterialId)
        {
            MarketMaterialAssignment marketMaterialAssignment = db.MarketMaterialAssignments.Find(marketMaterialId);
            if (marketMaterialAssignment == null)
            {
                return NotFound();
            }
            db.MarketMaterialAssignments.Remove(marketMaterialAssignment);
            db.SaveChanges();
            return Ok();           
        }

    #endregion


    private bool MarketerExists(int id)
        {
            return db.Marketers.Count(e => e.Id == id) > 0;
        }

     

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.Id == id) > 0;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}