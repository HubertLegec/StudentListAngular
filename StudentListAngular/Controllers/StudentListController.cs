using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;

namespace StudentListAngular.Controllers
{
    public class StudentListController : Controller
    {
        private Storage s = new Storage();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Students()
        {
            List<Object> students = s.getStudents().ConvertAll(
                new Converter<Student, object>(s => new {
                    IDStudent = s.IDStudent,
                    IDGroup = s.IDGroup,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    BirthDate = s.BirthDate,
                    BirthPlace = s.BirthPlace,
                    IndexNo = s.IndexNo
                })
            );
            return Json(students, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(true)]
        public ActionResult AddStudent(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    s.createStudent(student);
                    return Json(new { value = "OK", JsonRequestBehavior.AllowGet });
                }
                else
                {
                    Response.StatusCode = 400;
                    string error = "Niepoprawne wartosci pol";
                    return Json(new { value = error, JsonRequestBehavior.AllowGet });
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                string error = "Numer indeksu musi byc unikalny!";
                return Json(new { value = error, JsonRequestBehavior.AllowGet });
            }
        }

        [ValidateInput(true)]
        public ActionResult EditStudent(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    s.updateStudent(student);
                    return Json(new { value = "OK", JsonRequestBehavior.AllowGet });
                }
                else
                {
                    Response.StatusCode = 400;
                    string error = "Niepoprawne wartosci pol";
                    return Json(new { value = error, JsonRequestBehavior.AllowGet });
                }
            }
            catch (Exception e)
            {
                var ex = e.GetBaseException();
                if (ex.Message.ToLower().Contains("unique"))
                {
                    Response.StatusCode = 400;
                    string error = "Numer indeksu musi byc unikalny!";
                    return Json(new { value = error, JsonRequestBehavior.AllowGet });
                }
                else
                {
                    Response.StatusCode = 409;
                    string error = "Rekord zostal zmodyfikowany przez kogos innego!";
                    return Json(new { value = error, JsonRequestBehavior.AllowGet });
                }
            }
        }

        public ActionResult DeleteStudent(Student student)
        {
            try
            {
                s.deleteStudent(student.IDStudent, student.Stamp);
                return Json(new { value = "OK"}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                string error = "Rekord zostal zmodyfikowany przez kogos innego!";
                Response.StatusCode = 409;
                return Json(new { value = error}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}