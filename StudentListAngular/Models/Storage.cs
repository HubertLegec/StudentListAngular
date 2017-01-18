using StudentListAngular.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace StudentListAngular
{
    public class Storage
    {

        public Storage()
        {
            Database.SetInitializer<StorageContext>(null);  // to wyłącza sprawdzanie migracji
        }

        public List<Student> getStudents()
        {
            using (var db = new StorageContext())
                return db.Students.Include("Group").ToList();
        }

        public void createStudent(StudentDTO newStudent)
        {
            using (var db = new StorageContext())
            {
                Student s = new Student()
                {
                    IDGroup = newStudent.IDGroup,
                    FirstName = newStudent.FirstName,
                    LastName = newStudent.LastName,
                    BirthDate = newStudent.BirthDate,
                    BirthPlace = newStudent.BirthPlace,
                    IndexNo = newStudent.IndexNo
                };
                db.Students.Add(s);
                db.SaveChanges();
            }
        }

        public void updateStudent(StudentDTO newStudent)
        {
            using (var db = new StorageContext())
            {
                var original = db.Students.Find(newStudent.IDStudent);
                if (original != null)
                {
                    byte[] stamp = Convert.FromBase64String(newStudent.Stamp);
                    if (!ByteArrayCompare(stamp, original.Stamp))
                    {
                        throw new Exception();
                    }
                    original.FirstName = newStudent.FirstName;
                    original.LastName = newStudent.LastName;
                    original.IndexNo = newStudent.IndexNo;
                    original.BirthPlace = newStudent.BirthPlace;
                    original.BirthDate = newStudent.BirthDate;
                    original.IDGroup = newStudent.IDGroup;
                    db.SaveChanges();
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
        }

        public void deleteStudent(int id, byte[] timestamp)
        {
            using (var db = new StorageContext())
            {
                var original = db.Students.Find(id);
                if (original != null)
                {
                    if (!ByteArrayCompare(timestamp, original.Stamp))
                    {
                        throw new Exception();
                    }
                    db.Students.Remove(original);
                    db.SaveChanges();
                } else
                {
                    throw new KeyNotFoundException();
                }
            }
        }

        public List<Group> getGroups()
        {
            using (var db = new StorageContext())
                return db.Groups.ToList();
        }

        public void createGroup(GroupDTO newGroup)
        {
            using (var db = new StorageContext())
            {
                Group g = new Group()
                {
                    Name = newGroup.Name
                };
                db.Groups.Add(g);
                db.SaveChanges();
            }
        }

        public void updateGroup(GroupDTO newGroup)
        {
            using (var db = new StorageContext())
            {
                var original = db.Groups.Find(newGroup.IDGroup);
                if (original != null)
                {
                    byte[] stamp = Convert.FromBase64String(newGroup.Stamp);
                    if (!ByteArrayCompare(stamp, original.Stamp))
                    {
                        throw new Exception();
                    }
                    original.Name = newGroup.Name;
                    db.SaveChanges();
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
        }

        public void deleteGroup(int id, byte[] timestamp)
        {
            using (var db = new StorageContext())
            {
                var original = db.Groups.Find(id);
                if (original != null)
                {
                    if (!ByteArrayCompare(timestamp, original.Stamp))
                    {
                        throw new Exception();
                    }
                    db.Groups.Remove(original);
                    db.SaveChanges();
                }
                else
                {
                    throw new KeyNotFoundException();
                }
            }
        }

        static bool ByteArrayCompare(byte[] a1, byte[] a2)
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals(a1, a2);
        }
    }
}