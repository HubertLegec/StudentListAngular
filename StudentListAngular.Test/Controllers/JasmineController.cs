using System;
using System.Web.Mvc;

namespace StudentListAngular.Test.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
