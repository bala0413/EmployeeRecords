using EmployeeRecords.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.IO;

namespace EmployeeRecords.Controllers
{
    public class EmployeeFormController : Controller
    {
        // GET: EmployeeForm
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddEmployee()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UploadFile()
        {
            string Message, fileName;
            Message = fileName = string.Empty;
            bool flag = false;
            if (Request.Files != null)
            {
                var file = Request.Files[0];
                fileName = file.FileName;
                try
                {
                    file.SaveAs(Path.Combine(Server.MapPath("~/Images"), fileName));
                    Message = "File uploaded";
                    flag = true;
                }
                catch (Exception)
                {
                    Message = "File upload failed! Please try again";
                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag } };
        }



        public ActionResult UpdateEmployee()
        {
            return View();
        }

        public string GetAllEmployees()
        {
            using (EmployeeCredentialEntity Obj = new EmployeeCredentialEntity())
            {
                List<Employeeform> p = Obj.Employeeforms.ToList();
                string returnvalue = JsonConvert.SerializeObject(p);
                return returnvalue;
            }

        }

        [HttpPost]
        public string InsertEmployee(Employeeform e)
        {
            if (e != null)
            {
                using (EmployeeCredentialEntity Obj = new EmployeeCredentialEntity())
                {
                    Obj.Employeeforms.Add(e);
                    Obj.SaveChanges();
                    return "Employee Added Successfully";
                }
            }
            else
            {
                return "Not Inserted Try Again";
            }
        }

        [HttpPost]
        public string UpdatEmployee(Employeeform e)
        {
            if (e != null)
            {
                using (EmployeeCredentialEntity eObj = new EmployeeCredentialEntity())
                {
                    var e_ = eObj.Entry(e);
                    Employeeform Empl = eObj.Employeeforms.Where(x => x.EmpId == e.EmpId).FirstOrDefault();
                    Empl.Firstname = e.Firstname;
                    Empl.Middlename = e.Middlename;
                    Empl.Lastname = e.Lastname;
                    Empl.DOB = e.DOB;
                    Empl.DOJ = e.DOJ;
                    Empl.ProfilePicture = e.ProfilePicture;
                    Empl.Position = e.Position;

                    eObj.SaveChanges();
                    return "Employee Updated Successfully";
                }
            }
            else
            {
                return "Not Updated!";
            }
        }

        
        [HttpPost]
        public string DeleteEmployee(Employeeform employee)
        {
            if (employee != null)
            {
                using (EmployeeCredentialEntity eObj = new EmployeeCredentialEntity())
                {
                    var Emplo_ = eObj.Entry(employee);
                    if (Emplo_.State == System.Data.Entity.EntityState.Detached)
                    {
                        eObj.Employeeforms.Attach(employee);
                        eObj.Employeeforms.Remove(employee);
                    }
                    eObj.SaveChanges();
                    return "Employee Deleted Successfully";
                }
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }
        }
    }
}