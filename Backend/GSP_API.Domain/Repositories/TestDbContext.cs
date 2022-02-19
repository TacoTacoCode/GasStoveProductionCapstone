using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GSP_API.Domain.Repositories.Models;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace GSP_API.Domain.Repositories
{
    public partial class TestDbContext : DbContext
    {
        public TestDbContext()
        {
        }

        public TestDbContext(DbContextOptions<TestDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Attendance> Attendance { get; set; }
        public virtual DbSet<AttendanceDetail> AttendanceDetail { get; set; }
        public virtual DbSet<Component> Component { get; set; }
        public virtual DbSet<ComponentMaterial> ComponentMaterial { get; set; }
        public virtual DbSet<ImportExport> ImportExport { get; set; }
        public virtual DbSet<ImportExportDetail> ImportExportDetail { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Process> Process { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductComponent> ProductComponent { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Section> Section { get; set; }
        public virtual DbSet<Types> Types { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=SE140247;Initial Catalog=GSP_DB_test;Persist Security Info=True;User ID=sa;Password=38200283tql");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
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
                    .IsFixedLength();

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Account_Role");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_Account_Section");
            });

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.Property(e => e.CheckDate).HasColumnType("date");

                entity.Property(e => e.Note).HasMaxLength(100);
            });

            modelBuilder.Entity<AttendanceDetail>(entity =>
            {
                entity.Property(e => e.Note).HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.AttendanceDetail)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_AttendanceDetail_Account");

                entity.HasOne(d => d.Attendance)
                    .WithMany(p => p.AttendanceDetail)
                    .HasForeignKey(d => d.AttendanceId)
                    .HasConstraintName("FK_AttendanceDetail_Attendance");
            });

            modelBuilder.Entity<Component>(entity =>
            {
                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Color).HasMaxLength(50);

                entity.Property(e => e.ComponentName).HasMaxLength(100);

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ManufactuirngDate).HasColumnType("date");

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
                    .WithMany(p => p.ComponentMaterial)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Component_Material_Component");

                entity.HasOne(d => d.Material)
                    .WithMany(p => p.ComponentMaterial)
                    .HasForeignKey(d => d.MaterialId)
                    .HasConstraintName("FK_Component_Material_Material");
            });

            modelBuilder.Entity<ImportExport>(entity =>
            {
                entity.Property(e => e.ImportExportId).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ItemType)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.ImportExport)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_ImportExport_Account");

                entity.HasOne(d => d.ItemTypeNavigation)
                    .WithMany(p => p.ImportExport)
                    .HasForeignKey(d => d.ItemType)
                    .HasConstraintName("FK_ImportExport_Type");
            });

            modelBuilder.Entity<ImportExportDetail>(entity =>
            {
                entity.Property(e => e.ItemId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.ImportExport)
                    .WithMany(p => p.ImportExportDetail)
                    .HasForeignKey(d => d.ImportExportId)
                    .HasConstraintName("FK_ImportExportDetail_ImportExport");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.ImportExportDetail)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK_ImportExportDetail_Component");

                entity.HasOne(d => d.ItemNavigation)
                    .WithMany(p => p.ImportExportDetail)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK_ImportExportDetail_Material");
            });

            modelBuilder.Entity<Material>(entity =>
            {
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
                entity.Property(e => e.Deadline).HasColumnType("date");

                entity.Property(e => e.Note).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Order_Account");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.Property(e => e.Note).HasMaxLength(100);

                entity.Property(e => e.ProductId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_OrderDetail_Order");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_OrderDetail_Product");
            });

            modelBuilder.Entity<Process>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.FinishedDate).HasColumnType("date");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.OrderDetail)
                    .WithMany(p => p.Process)
                    .HasForeignKey(d => d.OrderDetailId)
                    .HasConstraintName("FK_Process_OrderDetail");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.Process)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_Process_Section");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ExpiryDate).HasColumnType("date");

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ManufacturingDate).HasColumnType("date");

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
                    .WithMany(p => p.ProductComponent)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Product_Component_Component");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductComponent)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Product_Component_Product");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Status).HasMaxLength(100);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.Property(e => e.ComponentId)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.InstructionFilePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Component)
                    .WithMany(p => p.Section)
                    .HasForeignKey(d => d.ComponentId)
                    .HasConstraintName("FK_Section_Component");

                entity.HasOne(d => d.SectionLead)
                    .WithMany(p => p.SectionNavigation)
                    .HasForeignKey(d => d.SectionLeadId)
                    .HasConstraintName("FK_Section_Account");
            });

            modelBuilder.Entity<Types>(entity =>
            {
                entity.HasKey(e => e.TypeId)
                    .HasName("PK_Type");

                entity.Property(e => e.TypeId)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.TypeName)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
