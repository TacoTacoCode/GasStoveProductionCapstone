using GSP_API.Domain.Repositories;
using GSP_API.Business.Services;
using GSP_API.Domain.Interfaces;
using GSP_API.Infrastructure;
using GSP_API.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using AutoMapper;
using GSP_API.Extensions.Profiles;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GSP_API.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure DbContext with Scoped lifetime
            services.AddDbContext<TestDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("TestDatabase"));
            });

            services.AddScoped<Func<TestDbContext>>((provider) => () => provider.GetService<TestDbContext>());
            services.AddScoped<DbFactory>();

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            //Configure Interface vs Repo
            return services
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddScoped<IAccountRepository, AccountRepository>()
                .AddScoped<IAttendanceRepository, AttendanceRepository>()
                .AddScoped<IAttendanceDetailRepository, AttendanceDetailRepository>()
                .AddScoped<IComponentRepository, ComponentRepository>()
                .AddScoped<IMaterialRepository, MaterialRepository>()
                .AddScoped<IProductRepository, ProductRepository>()
                .AddScoped<IOrderRepository, OrderRepository>()
                .AddScoped<IOrderDetailRepository, OrderDetailRepository>()
                .AddScoped<IProcessRepository, ProcessRepository>()
                .AddScoped<IProcessDetailRepository, ProcessDetailRepository>()
                .AddScoped<IRoleRepository, RoleRepository>()
                .AddScoped<IProductComponentRepository, ProductComponentRepository>()
                .AddScoped<IComponentMaterialRepository, ComponentMaterialRepository>()
                .AddScoped<IImportExportRepository, ImportExportRepository>()
                .AddScoped<IImportExportDetailRepository, ImportExportDetailRepository>();
        }

        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            //Add Service
            return services.AddScoped<AccountService>()
                .AddScoped<AttendanceService>()
                .AddScoped<AttendanceDetailService>()
                .AddScoped<ComponentService>()
                .AddScoped<MaterialService>()
                .AddScoped<ProductService>()
                .AddScoped<OrderService>()
                .AddScoped<OrderDetailService>()
                .AddScoped<ProcessService>()
                .AddScoped<ProcessDetailService>()
                .AddScoped<RoleService>()
                .AddScoped<ProductComponentService>()
                .AddScoped<ComponentMaterialService>()
                .AddScoped<ImportExportService>()
                .AddScoped<ImportExportDetailService>();
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            //Swagger
            return services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1",
                    new Microsoft.OpenApi.Models.OpenApiInfo
                    {
                        Title = "Swagger Demo API",
                        Description = "Demo API for showing Swagger",
                        Version = "v1"
                    });
            });
        }

        public static IServiceCollection AddAutoMapper(this IServiceCollection services)
        {
            //AutoMapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MapperProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            return services.AddSingleton(mapper);
        }

        public static IServiceCollection AddJWT(this IServiceCollection services, IConfiguration configuration)
        {
            //JWT
            return (IServiceCollection)services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetSection("validIssuer").Value,
                    ValidAudience = configuration.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(configuration.GetSection("JWTSettings:securityKey").Value))
                };
            });
        }
        
        public static IServiceCollection AddCORS(this IServiceCollection services)
        {
            return services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
            //return services.AddCors(options =>
            //{
            //    options.AddPolicy(name: "MyPolicy",
            //        builder =>
            //        {
            //            builder.WithOrigins("http://localhost:3000")
            //            .AllowAnyMethod().AllowAnyHeader();

            //        });
            //});
        }

    }
}
