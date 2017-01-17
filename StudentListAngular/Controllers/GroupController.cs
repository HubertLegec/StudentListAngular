using StudentListAngular.Models;
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
            List<GroupDTO> mapped = groups.ConvertAll(
                new Converter<Group, GroupDTO>(g => new Models.GroupDTO(){
                    IDGroup = g.IDGroup,
                    Name = g.Name,
                    Stamp = Convert.ToBase64String(g.Stamp)
                })
            );
            return Json(mapped, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add(GroupDTO group)
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

        public ActionResult Edit(GroupDTO group)
        {
            try
            {
                s.updateGroup(group);
                return Json(new { value = "OK" }, JsonRequestBehavior.AllowGet);
            }
            catch(KeyNotFoundException e)
            {
                Response.StatusCode = 404;
                string error = "Rekord zostal usuniety przez kogos innego!";
                return Json(new { value = error }, JsonRequestBehavior.AllowGet);
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

        public ActionResult Delete(GroupDTO group)
        {
            try
            {
                byte[] stamp = Convert.FromBase64String(group.Stamp);
                s.deleteGroup(group.IDGroup, stamp);
                return Json(new { value = "OK" }, JsonRequestBehavior.AllowGet);
            }
            catch (KeyNotFoundException e)
            {
                Response.StatusCode = 404;
                string error = "Rekord zostal usuniety przez kogos innego!";
                return Json(new { value = error }, JsonRequestBehavior.AllowGet);
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