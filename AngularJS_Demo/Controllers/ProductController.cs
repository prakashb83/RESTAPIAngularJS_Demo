using AngularJS_Demo.Interface;
using AngularJS_Demo.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using AngularJS_Demo.Models;
using System.Web.Http;

namespace AngularJS_Demo.Controllers
{
    public class TrainingController : ApiController
    {
        static readonly ITrainingRepository repository = new TrainingRepository();

        public IEnumerable GetAllTrainings()
        {
            return repository.GetAll();
        }

        public TblTrainingList PostTraining(TblTrainingList item)
        {
            return repository.Add(item);
        }

        public IEnumerable PutTraining(int id, TblTrainingList Training)
        {
            Training.Id = id;
            if (repository.Update(Training))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }

        public bool DeleteTraining(int id)
        {
            if (repository.Delete(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
