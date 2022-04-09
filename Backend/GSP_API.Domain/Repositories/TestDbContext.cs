using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GSP_API.Domain.Repositories.Models;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace GSP_API.Domain.Repositories
{
    public partial class TestDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public TestDbContext()
        {
        }

        public TestDbContext(DbContextOptions<TestDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<AttendanceDetail> AttendanceDetails { get; set; }
        public virtual DbSet<Component> Components { get; set; }
        public virtual DbSet<ComponentMaterial> ComponentMaterials { get; set; }
        public virtual DbSet<ImportExport> ImportExports { get; set; }
        public virtual DbSet<ImportExportDetail> ImportExportDetails { get; set; }
        public virtual DbSet<ItemType> ItemTypes { get; set; }
        public virtual DbSet<Material> Materials { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Process> Processes { get; set; }
        public virtual DbSet<ProcessDetail> ProcessDetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductComponent> ProductComponents { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Section> Sections { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("TestDatabase"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Vietnamese_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Address).HasMaxLength(100);

                entity.Property(e => e.AvatarUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Password)
                    .HasMaxLength(64)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Account_Role");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_Account_Section1");
            });

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.ToTable("Attendance");

                entity.Property(e => e.CheckDate).HasColumnType("date");

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Attendances)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Attendance_Account");
            });

            modelBuilder.Entity<AttendanceDetail>(entity =>
            {
                entity.ToTable("AttendanceDetail");

                entity.Property(e => e.CheckDate).HasColumnType("date");

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.HasOne(d => d.Attendance)
                    .WithMany(p => p.AttendanceDetails)
                    .HasForeignKey(d => d.AttendanceId)
                    .HasConstraintName("FK_AttendanceDetail_Attendance");
            });

            modelBuilder.Entity<Component>(entity =>
            {
                entity.ToTable("Component");

                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Color).HasMaxLength(50);

                entity.Property(e => e.ComponentName).HasMaxLength(100);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Size)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.Substance).HasMaxLength(50);
            });

            modelBuilder.Entity<ComponentMaterial>(entity =>
            {
                entity.ToTable("Component_Material");

                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Component)
                    .WithMany(p => p.ComponentMaterials)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Component_Material_Component");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.ComponentMaterials)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_Component_Material_Material");
            });

            modelBuilder.Entity<ImportExport>(entity =>
            {
                entity.ToTable("ImportExport");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ItemType)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.ItemTypeNavigation)
                    .WithMany(p => p.ImportExports)
                    .HasForeignKey(d => d.ItemType)
                    .HasConstraintName("FK_ImportExport_Types");
            });

            modelBuilder.Entity<ImportExportDetail>(entity =>
            {
                entity.ToTable("ImportExportDetail");

                entity.Property(e => e.ItemId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.ImportExport)
                    .WithMany(p => p.ImportExportDetails)
                    .HasForeignKey(d => d.ImportExportId)
                    .HasConstraintName("FK_ImportExportDetail_ImportExport");

                entity.HasOne(d => d.ProcessDetail)
                    .WithMany(p => p.ImportExportDetails)
                    .HasForeignKey(d => d.ProcessDetailId)
                    .HasConstraintName("FK_ImportExportDetail_ProcessDetail");
            });

            modelBuilder.Entity<ItemType>(entity =>
            {
                entity.HasKey(e => e.TypeId)
                    .HasName("PK_Type");

                entity.ToTable("ItemType");

                entity.Property(e => e.TypeId)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.TypeName)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.ToTable("Material");

                entity.Property(e => e.MaterialId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MaterialName).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.Unit).HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Order_Account");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.ToTable("OrderDetail");

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.Property(e => e.ProductId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderDetail_Order");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_OrderDetail_Product");
            });

            modelBuilder.Entity<Process>(entity =>
            {
                entity.ToTable("Process");

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ExpectedFinishDate).HasColumnType("date");

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.FinishedDate).HasColumnType("date");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.OrderDetail)
                    .WithMany(p => p.Processes)
                    .HasForeignKey(d => d.OrderDetailId)
                    .HasConstraintName("FK_Process_OrderDetail");
            });

            modelBuilder.Entity<ProcessDetail>(entity =>
            {
                entity.ToTable("ProcessDetail");

                entity.Property(e => e.ExpectedFinishDate).HasColumnType("date");

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.FinishedDate).HasColumnType("date");

                entity.Property(e => e.FirstExportDate).HasColumnType("date");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Process)
                    .WithMany(p => p.ProcessDetails)
                    .HasForeignKey(d => d.ProcessId)
                    .HasConstraintName("FK_ProcessDetail_Process");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.ProcessDetails)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_ProcessDetail_Section");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProductName).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);
            });

            modelBuilder.Entity<ProductComponent>(entity =>
            {
                entity.ToTable("Product_Component");

                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Component)
                    .WithMany(p => p.ProductComponents)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Product_Component_Component");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductComponents)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Component_Product");
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("RefreshToken");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.Token).HasMaxLength(16);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_RefreshToken_Account");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.RoleId)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.ToTable("Section");

                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Component)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Section_Component");

                entity.HasOne(d => d.SectionLead)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.SectionLeadId)
                    .HasConstraintName("FK_Section_Account2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
