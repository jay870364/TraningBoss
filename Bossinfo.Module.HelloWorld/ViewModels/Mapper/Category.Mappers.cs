using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Bossinfo.Models.HelloWorld;

namespace Bossinfo.Module.HelloWorld.ViewModels.Mappers
{
    public class CategoryMapper : Mvc.Model.SelectModelMapper<Models.HelloWorld.Category, Category>
    {
        public override Func<Category, Models.HelloWorld.Category> ViewModelToModelConverter => c => new Models.HelloWorld.Category
        {
            Id = c.Id,
            Name = c.Name
        };

        public override Expression<Func<Models.HelloWorld.Category, Category>> ModelToViewModelSelector => c => new Category
        {
            Id = c.Id,
            Name = c.Name,
            NewsCount = c.News.Count()
        };
    }
}
