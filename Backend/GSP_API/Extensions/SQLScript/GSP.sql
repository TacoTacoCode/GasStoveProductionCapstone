USE [master]
GO
/****** Object:  Database [GSP_DB_test1]    Script Date: 27/2/2022 2:56:22 PM ******/
CREATE DATABASE [GSP_DB_test1]
 CONTAINMENT = NONE
ALTER DATABASE [GSP_DB_test1] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GSP_DB_test1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GSP_DB_test1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET ARITHABORT OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GSP_DB_test1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GSP_DB_test1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GSP_DB_test1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GSP_DB_test1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET RECOVERY FULL 
GO
ALTER DATABASE [GSP_DB_test1] SET  MULTI_USER 
GO
ALTER DATABASE [GSP_DB_test1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GSP_DB_test1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GSP_DB_test1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GSP_DB_test1] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GSP_DB_test1] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GSP_DB_test1] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'GSP_DB_test1', N'ON'
GO
ALTER DATABASE [GSP_DB_test1] SET QUERY_STORE = OFF
GO
USE [GSP_DB_test1]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[AccountId] [int] IDENTITY(1,1) NOT NULL,
	[Password] [char](64) NULL,
	[Email] [varchar](100) NULL,
	[Name] [nvarchar](100) NULL,
	[Gender] [bit] NULL,
	[DateOfBirth] [date] NULL,
	[Address] [nvarchar](100) NULL,
	[Phone] [varchar](11) NULL,
	[AvatarUrl] [varchar](100) NULL,
	[RoleId] [char](3) NULL,
	[SectionId] [int] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Attendance]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attendance](
	[AttendanceId] [int] IDENTITY(1,1) NOT NULL,
	[CheckDate] [date] NULL,
	[PresentedAmount] [int] NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_Attendance] PRIMARY KEY CLUSTERED 
(
	[AttendanceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceDetail]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttendanceDetail](
	[AttendanceDetailId] [int] IDENTITY(1,1) NOT NULL,
	[AttendanceId] [int] NULL,
	[AccountId] [int] NULL,
	[IsPresented] [bit] NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_AttendanceDetail] PRIMARY KEY CLUSTERED 
(
	[AttendanceDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Component]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Component](
	[ComponentId] [varchar](20) NOT NULL,
	[ComponentName] [nvarchar](100) NULL,
	[Amount] [int] NULL,
	[ImageUrl] [varchar](100) NULL,
	[ManufactuirngDate] [date] NULL,
	[ExpiryDate] [date] NULL,
	[Status] [nvarchar](100) NULL,
	[Substance] [nvarchar](50) NULL,
	[Size] [varchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[Weight] [float] NULL,
 CONSTRAINT [PK_Component] PRIMARY KEY CLUSTERED 
(
	[ComponentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Component_Material]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Component_Material](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ComponentId] [varchar](20) NULL,
	[MaterialId] [varchar](20) NULL,
	[Amount] [int] NULL,
 CONSTRAINT [PK_Component_Material] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportExport]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportExport](
	[ImportExportId] [int] IDENTITY(1,1) NOT NULL,
	[SectionId] [int] NULL,
	[CreatedDate] [date] NULL,
	[ItemType] [char](1) NULL,
	[IsImport] [bit] NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_ImportExport] PRIMARY KEY CLUSTERED 
(
	[ImportExportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportExportDetail]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportExportDetail](
	[ImportExportDetailId] [int] IDENTITY(1,1) NOT NULL,
	[ImportExportId] [int] NULL,
	[ProcessDetailId] [int] NULL,
	[ItemId] [varchar](20) NULL,
	[Amount] [int] NULL,
 CONSTRAINT [PK_ImportExportDetail] PRIMARY KEY CLUSTERED 
(
	[ImportExportDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemType]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemType](
	[TypeId] [char](1) NOT NULL,
	[TypeName] [varchar](10) NULL,
 CONSTRAINT [PK_Type] PRIMARY KEY CLUSTERED 
(
	[TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material](
	[MaterialId] [varchar](20) NOT NULL,
	[MaterialName] [nvarchar](100) NULL,
	[Amount] [int] NULL,
	[Unit] [nvarchar](50) NULL,
	[ImageUrl] [varchar](100) NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_Matrial] PRIMARY KEY CLUSTERED 
(
	[MaterialId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NULL,
	[TotalPrice] [float] NULL,
	[ExpiryDate] [date] NULL,
	[Status] [nvarchar](100) NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[OrderDetailId] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NULL,
	[ProductId] [varchar](20) NULL,
	[Amount] [int] NULL,
	[Price] [float] NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_OrderDetailId] PRIMARY KEY CLUSTERED 
(
	[OrderDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Process]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Process](
	[ProcessId] [int] IDENTITY(1,1) NOT NULL,
	[OrderDetailId] [int] NULL,
	[TotalAmount] [int] NULL,
	[FinishedAmount] [int] NULL,
	[CreatedDate] [date] NULL,
	[ExpiryDate] [date] NULL,
	[FinishedDate] [date] NULL,
	[ExpectedFinishDate] [date] NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_Process] PRIMARY KEY CLUSTERED 
(
	[ProcessId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProcessDetail]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProcessDetail](
	[ProcessDetailId] [int] IDENTITY(1,1) NOT NULL,
	[ProcessId] [int] NULL,
	[SectionId] [int] NULL,
	[TotalAmount] [int] NULL,
	[FinishedAmount] [int] NULL,
	[AverageAmount] [int] NULL,
	[ExpiryDate] [date] NULL,
	[FinishedDate] [date] NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_ProcessDetail] PRIMARY KEY CLUSTERED 
(
	[ProcessDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [varchar](20) NOT NULL,
	[ProductName] [nvarchar](100) NULL,
	[Amount] [int] NULL,
	[Price] [float] NULL,
	[ImageUrl] [varchar](100) NULL,
	[ManufacturingDate] [date] NULL,
	[ExpiryDate] [date] NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Component]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Component](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [varchar](20) NULL,
	[ComponentId] [varchar](20) NULL,
	[Amount] [int] NULL,
 CONSTRAINT [PK_Product_Component] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [char](3) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Status] [nvarchar](100) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Section]    Script Date: 01-Mar-22 9:39:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Section](
	[SectionId] [int] IDENTITY(1,1) NOT NULL,
	[SectionLeadId] [int] NULL,
	[ComponentId] [varchar](20) NULL,
	[WorkerAmount] [int] NULL,
	[IsAssemble] [bit] NULL,
 CONSTRAINT [PK_Section] PRIMARY KEY CLUSTERED 
(
	[SectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Role]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Section1] FOREIGN KEY([SectionId])
REFERENCES [dbo].[Section] ([SectionId])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Section1]
GO
ALTER TABLE [dbo].[AttendanceDetail]  WITH CHECK ADD  CONSTRAINT [FK_AttendanceDetail_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([AccountId])
GO
ALTER TABLE [dbo].[AttendanceDetail] CHECK CONSTRAINT [FK_AttendanceDetail_Account]
GO
ALTER TABLE [dbo].[AttendanceDetail]  WITH CHECK ADD  CONSTRAINT [FK_AttendanceDetail_Attendance] FOREIGN KEY([AttendanceId])
REFERENCES [dbo].[Attendance] ([AttendanceId])
GO
ALTER TABLE [dbo].[AttendanceDetail] CHECK CONSTRAINT [FK_AttendanceDetail_Attendance]
GO
ALTER TABLE [dbo].[Component_Material]  WITH CHECK ADD  CONSTRAINT [FK_Component_Material_Component] FOREIGN KEY([ComponentId])
REFERENCES [dbo].[Component] ([ComponentId])
GO
ALTER TABLE [dbo].[Component_Material] CHECK CONSTRAINT [FK_Component_Material_Component]
GO
ALTER TABLE [dbo].[Component_Material]  WITH CHECK ADD  CONSTRAINT [FK_Component_Material_Material] FOREIGN KEY([MaterialId])
REFERENCES [dbo].[Material] ([MaterialId])
GO
ALTER TABLE [dbo].[Component_Material] CHECK CONSTRAINT [FK_Component_Material_Material]
GO
ALTER TABLE [dbo].[ImportExport]  WITH CHECK ADD  CONSTRAINT [FK_ImportExport_Types] FOREIGN KEY([ItemType])
REFERENCES [dbo].[ItemType] ([TypeId])
GO
ALTER TABLE [dbo].[ImportExport] CHECK CONSTRAINT [FK_ImportExport_Types]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_Component1] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Component] ([ComponentId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_Component1]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_ImportExport] FOREIGN KEY([ImportExportId])
REFERENCES [dbo].[ImportExport] ([ImportExportId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_ImportExport]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_Material1] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Material] ([MaterialId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_Material1]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_Product] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Product] ([ProductId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_Product]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([AccountId])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Account]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([OrderId])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Order]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([ProductId])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Product]
GO
ALTER TABLE [dbo].[Process]  WITH CHECK ADD  CONSTRAINT [FK_Process_OrderDetail] FOREIGN KEY([OrderDetailId])
REFERENCES [dbo].[OrderDetail] ([OrderDetailId])
GO
ALTER TABLE [dbo].[Process] CHECK CONSTRAINT [FK_Process_OrderDetail]
GO
ALTER TABLE [dbo].[ProcessDetail]  WITH CHECK ADD  CONSTRAINT [FK_ProcessDetail_Process] FOREIGN KEY([ProcessId])
REFERENCES [dbo].[Process] ([ProcessId])
GO
ALTER TABLE [dbo].[ProcessDetail] CHECK CONSTRAINT [FK_ProcessDetail_Process]
GO
ALTER TABLE [dbo].[ProcessDetail]  WITH CHECK ADD  CONSTRAINT [FK_ProcessDetail_Section] FOREIGN KEY([SectionId])
REFERENCES [dbo].[Section] ([SectionId])
GO
ALTER TABLE [dbo].[ProcessDetail] CHECK CONSTRAINT [FK_ProcessDetail_Section]
GO
ALTER TABLE [dbo].[Product_Component]  WITH CHECK ADD  CONSTRAINT [FK_Product_Component_Component] FOREIGN KEY([ComponentId])
REFERENCES [dbo].[Component] ([ComponentId])
GO
ALTER TABLE [dbo].[Product_Component] CHECK CONSTRAINT [FK_Product_Component_Component]
GO
ALTER TABLE [dbo].[Product_Component]  WITH CHECK ADD  CONSTRAINT [FK_Product_Component_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([ProductId])
GO
ALTER TABLE [dbo].[Product_Component] CHECK CONSTRAINT [FK_Product_Component_Product]
GO
ALTER TABLE [dbo].[Section]  WITH CHECK ADD  CONSTRAINT [FK_Section_Account2] FOREIGN KEY([SectionLeadId])
REFERENCES [dbo].[Account] ([AccountId])
GO
ALTER TABLE [dbo].[Section] CHECK CONSTRAINT [FK_Section_Account2]
GO
ALTER TABLE [dbo].[Section]  WITH CHECK ADD  CONSTRAINT [FK_Section_Component] FOREIGN KEY([ComponentId])
REFERENCES [dbo].[Component] ([ComponentId])
GO
ALTER TABLE [dbo].[Section] CHECK CONSTRAINT [FK_Section_Component]
GO
