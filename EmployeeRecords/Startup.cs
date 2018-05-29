using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmployeeRecords.Startup))]
namespace EmployeeRecords
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
