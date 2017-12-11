using Microsoft.Owin;
using Owin;
using Bossinfo.Mvc;
using Bossinfo.Mvc.Providers;
[assembly: OwinStartup(typeof(WebApplication2.Startup))]

namespace WebApplication2
{
    public class Startup
    {

        public void Configuration(IAppBuilder app)
        {
            app.UseBossinfoPlatform(options =>
            {
                options.MapPath = System.Web.Hosting.HostingEnvironment.MapPath;
                options.AddModule<Bossinfo.Module.Platform.ModuleConfig>();
                options.AddModule<Bossinfo.Module.FileManagement.ModuleConfig>();


                //this
                options.AddModule<Bossinfo.Module.HelloWorld.ModuleConfig>();

                options.AddModule<Bossinfo.Module.Hospital.ModuleConfig>();

                options.ConfigurationProviders = ConfigurationProviders;
            });
        }

        public void ConfigurationProviders(IProviderBuilder builder)
        {
            builder.UseEmptyLog();
            builder.UseWebConfig();
            builder.UseLocalDiskFileContainer((c, o) =>
            {
                o.RootPath = c.Resolve<Bossinfo.Mvc.Providers.Config.IConfigProvider>().Get("fileStorageLocation");
            });
            builder.UseDatabaseFileManagement(c => c.Resolve<Bossinfo.Mvc.Providers.File.Physical.IFileStorage>());
        }


    }
}