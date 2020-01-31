using AngularJS_Demo.Interface;
using AngularJS_Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS_Demo.Repositories
{

    public class TrainingRepository : ITrainingRepository
    {
        TrainingDBEntities TrainingDB = new TrainingDBEntities();

        public IEnumerable<TblTrainingList> GetAll()
        {
            // TO DO : Code to get the list of all the records in database
            return TrainingDB.TblTrainingLists;
        }

        public TblTrainingList Get(int id)
        {
            // TO DO : Code to find a record in database
            return TrainingDB.TblTrainingLists.Find(id);
        }

        public TblTrainingList Add(TblTrainingList item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to save record into database
            TrainingDB.TblTrainingLists.Add(item);
            TrainingDB.SaveChanges();
            return item;
        }

        public bool Update(TblTrainingList item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            // TO DO : Code to update record into database
            var Trainings = TrainingDB.TblTrainingLists.Single(a => a.Id == item.Id);
            Trainings.Name = item.Name;
            Trainings.Category = item.Category;
            Trainings.Price = item.Price;
            TrainingDB.SaveChanges();

            return true;
        }

        public bool Delete(int id)
        {
            // TO DO : Code to remove the records from database
            TblTrainingList Trainings = TrainingDB.TblTrainingLists.Find(id);
            TrainingDB.TblTrainingLists.Remove(Trainings);
            TrainingDB.SaveChanges();
            return true;
        }
    }
}
