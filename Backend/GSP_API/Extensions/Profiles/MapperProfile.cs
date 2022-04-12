using AutoMapper;
using GSP_API.Models.Request;
using GSP_API.Models.Response;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Extensions.Profiles
{
    public class MapperProfile : Profile
    {       
        public MapperProfile()
        {            
            CreateMap<AccountRequest, Account>();
            CreateMap<Account, AccountResponse>();

            CreateMap<AttendanceRequest, Attendance>();
            CreateMap<Attendance, AttendanceResponse>();

            CreateMap<AttendanceDetailRequest, AttendanceDetail>();
            CreateMap<AttendanceDetail, AttendanceDetailResponse>();

            CreateMap<MaterialRequest, Material>();
            CreateMap<Material, MaterialResponse>();

            CreateMap<ComponentRequest, Component>()
                .ForMember(dest => dest.ComponentMaterials, act => act.MapFrom(src => src.ComponentMaterial));
            CreateMap<Component, ComponentResponse>();

            CreateMap<ImportExportRequest, ImportExport>()
                .ForMember(dest => dest.ImportExportDetails, act => act.MapFrom(src => src.ImportExportDetails));
            CreateMap<ImportExport, ImportExportResponse>()
                .ForMember(dest => dest.ImportExportDetails, act => act.MapFrom(src => src.ImportExportDetails));


            CreateMap<ImportExportDetailRequest, ImportExportDetail>();
            CreateMap<ImportExportDetail, ImportExportDetailResponse>();

            CreateMap<OrderRequest, Order>()
                .ForMember(dest => dest.OrderDetails, act => act.MapFrom(src => src.OrderDetail));
            CreateMap<Order, OrderResponse>();

            CreateMap<OrderDetailRequest, OrderDetail>();
            CreateMap<OrderDetail, OrderDetailResponse>();

            CreateMap<ProductRequest, Product>()
                .ForMember(dest => dest.ProductComponents, act => act.MapFrom(src => src.ProductComponents));
            CreateMap<Product, ProductResponse>();

            CreateMap<ProcessRequest, Process>();
            CreateMap<Process, ProcessResponse>();

            CreateMap<ProcessDetailRequest, ProcessDetail>();
            CreateMap<ProcessDetail, ProcessDetailResponse>();

            CreateMap<RoleRequest, Role>();
            CreateMap<Role, RoleResponse>();

            CreateMap<SectionRequest, Section>();
            CreateMap<Section, SectionResponse>();

            CreateMap<ComponentRequest, ComponentMaterial>();
            CreateMap<ComponentMaterial, CompoMateResponse>();

            CreateMap<ProductComponent, ProductCompoResponse>();

            CreateMap<ComponentMaterial, CompoMateResponse>()
                .ForMember(dest => dest.Material, act => act.MapFrom(src => src.Material));

            CreateMap<CartRequest, Cart>();
            CreateMap<Cart, CartResponse>();
        }
    }
}
