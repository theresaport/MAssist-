using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MarkettingAssistant
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
           // Database.SetInitializer<MarkettingDBContext>(null);
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MarkettingDBContext>());


            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
