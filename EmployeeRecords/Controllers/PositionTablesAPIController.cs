using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EmployeeRecords.Models;

namespace EmployeeRecords.Controllers
{
    public class PositionTablesAPIController : ApiController
    {
        private EmployeePositionEntities db = new EmployeePositionEntities();

        // GET: api/PositionTablesAPI
        public IQueryable<PositionTable> GetPositionTables()
        {
            return db.PositionTables;
        }

        // GET: api/PositionTablesAPI/5
        [ResponseType(typeof(PositionTable))]
        public IHttpActionResult GetPositionTable(int id)
        {
            PositionTable positionTable = db.PositionTables.Find(id);
            if (positionTable == null)
            {
                return NotFound();
            }

            return Ok(positionTable);
        }

        // PUT: api/PositionTablesAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPositionTable(int id, PositionTable positionTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != positionTable.PId)
            {
                return BadRequest();
            }

            db.Entry(positionTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionTableExists(id))
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

        // POST: api/PositionTablesAPI
        [ResponseType(typeof(PositionTable))]
        public IHttpActionResult PostPositionTable(PositionTable positionTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PositionTables.Add(positionTable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = positionTable.PId }, positionTable);
        }

        // DELETE: api/PositionTablesAPI/5
        [ResponseType(typeof(PositionTable))]
        public IHttpActionResult DeletePositionTable(int id)
        {
            PositionTable positionTable = db.PositionTables.Find(id);
            if (positionTable == null)
            {
                return NotFound();
            }

            db.PositionTables.Remove(positionTable);
            db.SaveChanges();

            return Ok(positionTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PositionTableExists(int id)
        {
            return db.PositionTables.Count(e => e.PId == id) > 0;
        }
    }
}