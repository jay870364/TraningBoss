using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bossinfo.Mvc;
using Bossinfo.Mvc.ModuleBuilder;
using Bossinfo.Models.HelloWorld;

namespace Bossinfo.Module.HelloWorld
{
    public class ModuleConfig : IPlatformModule
    {
        public void Load (IModuleBuilder moduleBuilder)
        {
            moduleBuilder.ModelRegister.RegisterContext(c => new HelloWorldContext());

            moduleBuilder.ModelRegister.Register<Category>()
                .WithViewModel<ViewModels.Category>()
                .AddValidationTask(Mvc.Validators.UniqueValidationTask<ViewModels.Category>.Check(e => e.Name))
                .SetMapper<ViewModels.Mappers.CategoryMapper>();

            moduleBuilder.ModelRegister.Register<News>()
                .AddValidationTask(Mvc.Validators.UniqueValidationTask<News>.Check(e => e.Title));

            //moduleBuilder.ModelRegister.Register<News2>()
            //    .AddValidationTask(Mvc.Validators.UniqueValidationTask<News2>.Check(e => e.Title));

            var moduleName = typeof(ModuleConfig).Namespace;
            moduleBuilder.FunctionBuilder.DefineFunction("Category", moduleName)
                .AddStandarRoles<ViewModels.Category>();// Setting rights of CRUD

            moduleBuilder.FunctionBuilder.DefineFunction("News", moduleName)
                .AddStandarRoles<News>()
                .AddQuerySettings<News>(new QueryGuardBuilder<News>()
                .AllowExpand(e => e.Category.Name)
                .Build()
                );

            //moduleBuilder.FunctionBuilder.DefineFunction("News2", moduleName)
            //    .AddStandarRoles<News2>()
            //    .AddQuerySettings<News2>(new QueryGuardBuilder<News2>()
            //    .Build()
            //    );
        }
    }
}

