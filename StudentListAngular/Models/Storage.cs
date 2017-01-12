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

        public void createStudent(Student newStudent)
        {
            using (var db = new StorageContext())
            {
                db.Students.Add(newStudent);
                db.SaveChanges();
            }
        }

        public void updateStudent(Student newStudent)
        {
            using (var db = new StorageContext())
            {
                var original = db.Students.Find(newStudent.IDStudent);
                if (original != null)
                {
                    if (!ByteArrayCompare(newStudent.Stamp, original.Stamp))
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
                }
            }
        }

        public List<Group> getGroups()
        {
            using (var db = new StorageContext())
                return db.Groups.ToList();
        }

        public void createGroup(Group newGroup)
        {
            using (var db = new StorageContext())
            {
                db.Groups.Add(newGroup);
                db.SaveChanges();
            }
        }

        public void updateGroup(Group newGroup)
        {
            using (var db = new StorageContext())
            {
                var original = db.Groups.Find(newGroup.IDGroup);
                if (original != null)
                {
                    if (!ByteArrayCompare(newGroup.Stamp, original.Stamp))
                    {
                        throw new Exception();
                    }
                    original.Name = newGroup.Name;
                    db.SaveChanges();
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
            }
        }

        static bool ByteArrayCompare(byte[] a1, byte[] a2)
        {
            return StructuralComparisons.StructuralEqualityComparer.Equals(a1, a2);
        }
    }
}