using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentListAngular.Controllers
{
    public class StudentListController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}