using AngularJS_Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJS_Demo.Interface
{
    interface ITrainingRepository
    {
        IEnumerable<TblTrainingList> GetAll();
        TblTrainingList Get(int id);
        TblTrainingList Add(TblTrainingList item);
        bool Update(TblTrainingList item);
        bool Delete(int id);
    }
}