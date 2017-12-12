using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bossinfo.Mvc;
using Bossinfo.Mvc.ModuleBuilder;
using Bossinfo.Models.Hospital;

namespace Bossinfo.Module.Hospital
{
    public class ModuleConfig : IPlatformModule
    {
        public void Load(IModuleBuilder moduleBuilder)
        {

            moduleBuilder.ModelRegister.RegisterContext(c => new HospitalContext());

            //moduleBuilder.ModelRegister.Register<his>()
            //    .AddValidationTask(Mvc.Validators.UniqueValidationTask<his>.Check(e => e.ID));

            //moduleBuilder.ModelRegister.Register<Hospital>()
            //    .AddValidationTask(Mvc.Validators.UniqueValidationTask<Hospital>.Check(e => e.ID));

            //moduleBuilder.ModelRegister.Register<orderregresult>()
            //    .AddValidationTask(Mvc.Validators.UniqueValidationTask<orderregresult>.Check(e => e.ID));

            //moduleBuilder.ModelRegister.Register<orderregresultdetail>()
            //    .AddValidationTask(Mvc.Validators.UniqueValidationTask<orderregresultdetail>.Check(e => e.ID));


            var moduleName = typeof(ModuleConfig).Namespace;

            moduleBuilder.FunctionBuilder.DefineFunction("his", moduleName)
                .AddStandarRoles<his>()
                .AddQuerySettings<his>(new QueryGuardBuilder<his>()
                .Build()
                ); // Setting rights of CRUD

            moduleBuilder.FunctionBuilder.DefineFunction("Hospital", moduleName)
               .AddStandarRoles<Hospital>()
               .AddQuerySettings<Hospital>(new QueryGuardBuilder<Hospital>()
                .Build()
                );

            moduleBuilder.FunctionBuilder.DefineFunction("orderregresult", moduleName)
               .AddStandarRoles<orderregresult>()
               .AddQuerySettings<orderregresult>(new QueryGuardBuilder<orderregresult>()
                .Build()
                );

            moduleBuilder.FunctionBuilder.DefineFunction("orderregresultdetail", moduleName)
               .AddStandarRoles<orderregresultdetail>()
               .AddQuerySettings<orderregresultdetail>(new QueryGuardBuilder<orderregresultdetail>()
                .Build()
                );

        }
    }
}
