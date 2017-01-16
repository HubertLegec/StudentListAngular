using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;

namespace StudentListAngular.Controllers
{
    public class GroupController : Controller
    {
        private Storage s = new Storage();

        public ActionResult Groups()
        {
            List<Group> groups = s.getGroups();
            List<Object> mapped = groups.ConvertAll(
                new Converter<Group, Object>(g => new { IDGroup = g.IDGroup, Name = g.Name, Stamp = g.Stamp })
            );
            return Json(mapped, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add(Group group)
        {
            try
            {
                s.createGroup(group);
                return Json(new { value = "OK"}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                string error = "Nazwa grupy nie moze sie powtarzac!";
                return Json(new { value = error }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Edit(Group group)
        {
            try
            {
                s.updateGroup(group);
                return Json(new { value = "OK" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                var ex = e.GetBaseException();
                if (ex.Message.ToLower().Contains("unique"))
                {
                    Response.StatusCode = 400;
                    string error = "Nazwa grupy nie moze sie powtarzac!";
                    return Json(new { value = error }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Response.StatusCode = 409;
                    string error = "Rekord zostal zmodyfikowany przez kogos innego!";
                    return Json(new { value = error }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult Delete(Group group)
        {
            try
            {
                s.deleteGroup(group.IDGroup, group.Stamp);
                return Json(new { value = "OK" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                Response.StatusCode = 409;
                string error = "Rekord zostal zmodyfikowany przez kogos innego!";
                return Json(new { value = error }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}