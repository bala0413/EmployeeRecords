using EmployeeRecords.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EmployeeRecords.Controllers
{
    public class EmployeeFormAPIController : ApiController
    {
        EmployeeCredentialEntity objEc = new EmployeeCredentialEntity();

        [HttpGet]
        public IEnumerable<Employeeform> Get()
        {
            return objEc.Employeeforms.AsEnumerable();
            //return objAPI.ImageDetails.AsEnumerable().OrderByDescending(item => item.ImageID );

        }

        public HttpResponseMessage Post(Employeeform Empform)
        {
            if (ModelState.IsValid)
            {
                objEc.Employeeforms.Add(Empform);
                objEc.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, Empform);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = Empform.ProfilePicture }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

    }
}
