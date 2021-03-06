/****** Object:  Database [GSP_DB_test1]    Script Date: 23-Apr-22 12:35:43 AM ******/
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
ALTER DATABASE [GSP_DB_test1] SET QUERY_STORE = OFF
GO
USE [GSP_DB_test1]
/****** Object:  Table [dbo].[Account]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[Attendance]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attendance](
	[AttendanceId] [int] IDENTITY(1,1) NOT NULL,
	[CheckDate] [date] NULL,
	[AccountId] [int] NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_Attendance] PRIMARY KEY CLUSTERED 
(
	[AttendanceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttendanceDetail]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttendanceDetail](
	[AttendanceDetailId] [int] IDENTITY(1,1) NOT NULL,
	[AttendanceId] [int] NULL,
	[CheckDate] [date] NULL,
	[IsPresented] [bit] NULL,
	[Note] [nvarchar](100) NULL,
 CONSTRAINT [PK_AttendanceDetail] PRIMARY KEY CLUSTERED 
(
	[AttendanceDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[CartId] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NULL,
	[CartInfo] [nvarchar](max) NULL,
	[TotalPrice] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[CartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Component]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Component](
	[ComponentId] [varchar](20) NOT NULL,
	[ComponentName] [nvarchar](100) NULL,
	[Amount] [int] NULL,
	[ImageUrl] [varchar](100) NULL,
	[Status] [nvarchar](100) NULL,
	[Substance] [nvarchar](50) NULL,
	[Size] [varchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[Weight] [float] NULL,
	[Description] [nvarchar](max) NULL,
	[ItemId] [varchar](21) NULL,
	[Average] [int] NULL,
 CONSTRAINT [PK_Component] PRIMARY KEY CLUSTERED 
(
	[ComponentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Component_Material]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[ImExItem]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImExItem](
	[Id] [varchar](21) NOT NULL,
	[ItemType] [char](1) NULL,
	[ItemId] [varchar](20) NULL,
 CONSTRAINT [PK_ImExItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportExport]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[ImportExportDetail]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportExportDetail](
	[ImportExportDetailId] [int] IDENTITY(1,1) NOT NULL,
	[ImportExportId] [int] NULL,
	[ProcessDetailId] [int] NULL,
	[ItemId] [varchar](21) NULL,
	[Amount] [int] NULL,
	[ExportedAmount] [int] NULL,
 CONSTRAINT [PK_ImportExportDetail] PRIMARY KEY CLUSTERED 
(
	[ImportExportDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemType]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[Material]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
	[Description] [nvarchar](max) NULL,
	[ItemId] [varchar](21) NULL,
 CONSTRAINT [PK_Matrial] PRIMARY KEY CLUSTERED 
(
	[MaterialId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
	[IsShorTerm] [bit] NULL,
	[CustomerName] [nvarchar](100) NULL,
	[CustomerAddress] [nvarchar](100) NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[Process]    Script Date: 23-Apr-22 12:35:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Process](
	[ProcessId] [int] IDENTITY(1,1) NOT NULL,
	[OrderDetailId] [int] NULL,
	[NeededAmount] [int] NULL,
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
/****** Object:  Table [dbo].[ProcessDetail]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
	[ExpectedFinishDate] [date] NULL,
	[FirstExportDate] [date] NULL,
 CONSTRAINT [PK_ProcessDetail] PRIMARY KEY CLUSTERED 
(
	[ProcessDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
	[Status] [nvarchar](100) NULL,
	[Description] [nvarchar](max) NULL,
	[ItemId] [varchar](21) NULL,
	[Average] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Component]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
/****** Object:  Table [dbo].[Section]    Script Date: 23-Apr-22 12:35:44 AM ******/
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
	[Status] [varchar](50) NULL,
 CONSTRAINT [PK_Section] PRIMARY KEY CLUSTERED 
(
	[SectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (1, N'8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', N'admin@admin', N'Nguyen Duc Trung', 1, CAST(N'2022-08-25' AS Date), N'admin street, admin, admin', N'0123456789', N'trung.jpg?alt=media&token=04c5c09e-20bc-49b4-94ce-9ba0c4f98c14', N'ADM', NULL, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (2, N'3eeb7e96e59ce40f9cb1a089daba079fd699f6867a30f6634af8570967b2375a', N'order@order', N'Le Hung Thinh', 1, CAST(N'2022-03-16' AS Date), N'order, order, order', N'0147258369', N'thinh.jpg?alt=media&token=52f0a0dd-e1c4-42ee-a42b-4708d283ef93', N'ORD', NULL, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (3, N'dbde6e431edd7f4672f039680c58d4a0b59bff2dacfa25d63a228ba2ce392bd1', N'manu@manu', N'Dinh Nhu Hieu', 1, CAST(N'2022-03-20' AS Date), N'manu, manu, manu', N'0246813579', N'hieu.jpg?alt=media&token=1ae02a7d-0e12-4b43-ad09-d3cd6325b4df', N'MAN', NULL, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (6, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Truong Quoc Lap', 1, CAST(N'2022-03-19' AS Date), N'section, section, section', N'0987654321', N'lap.jpg?alt=media&token=1c226783-caa7-42ee-b2a7-d8a5277a32d0', N'SEC', 1, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (14, N'b6c45863875e34487ca3c155ed145efe12a74581e27befec5aa661b8ee8ca6dd', N'customer@customer', N'Pham Cong Thanh', 1, CAST(N'2022-03-25' AS Date), N'customer, customer, customer', N'0369258147', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'CUS', NULL, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (15, N'87ef750941e58e6f717de45f24b924bf22b06893938166f4e4991a608e588df3', N'laptq@gmail.com', N'Truong Quoc Lap1', 1, CAST(N'2000-08-30' AS Date), N'Ton Dan P15 Q4 TPHCM', N'0776914234', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 1, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (16, N'c58d0501450ea42048671b7a295bfb2ee1c7e62fbf3943e22b127999d1fa88a8', N'hieudn@gmail.com', N'Dinh Nhu Hieu1', 1, CAST(N'2000-03-31' AS Date), N'Pham The Hien Q8 TPHCM', N'033365325', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 1, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (17, N'bb088c22e0a72fa105a9d7ef14418459241ead64f5b086e4318cbabc3750db50', N'trungnd@gmail.com', N'Nguyen Duc Trung1', 1, CAST(N'2000-01-01' AS Date), N'Hoc Mon, TPHCM', N'0159753456', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 1, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (18, N'87ef750941e58e6f717de45f24b924bf22b06893938166f4e4991a608e588df3', N'laptq@gmail.com', N'Truong Quoc Lap2', 1, CAST(N'2000-08-30' AS Date), N'Ton Dan P15 Q4 TPHCM', N'0776914235', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 2, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (19, N'c58d0501450ea42048671b7a295bfb2ee1c7e62fbf3943e22b127999d1fa88a8', N'hieudn@gmail.com', N'Dinh Nhu Hieu2', 1, CAST(N'2000-03-31' AS Date), N'Pham The Hien Q8 TPHCM', N'033365326', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 2, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (20, N'bb088c22e0a72fa105a9d7ef14418459241ead64f5b086e4318cbabc3750db50', N'trungnd@gmail.com', N'Nguyen Duc Trung2', 1, CAST(N'2000-01-01' AS Date), N'Hoc Mon, TPHCM', N'0159753457', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 2, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (21, N'87ef750941e58e6f717de45f24b924bf22b06893938166f4e4991a608e588df3', N'laptq@gmail.com', N'Truong Quoc Lap3', 1, CAST(N'2000-08-30' AS Date), N'Ton Dan P15 Q4 TPHCM', N'0776914236', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 3, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (22, N'c58d0501450ea42048671b7a295bfb2ee1c7e62fbf3943e22b127999d1fa88a8', N'hieudn@gmail.com', N'Dinh Nhu Hieu3', 1, CAST(N'2000-03-31' AS Date), N'Pham The Hien Q8 TPHCM', N'033365327', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 3, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (23, N'bb088c22e0a72fa105a9d7ef14418459241ead64f5b086e4318cbabc3750db50', N'trungnd@gmail.com', N'Nguyen Duc Trung3', 1, CAST(N'2000-01-01' AS Date), N'Hoc Mon, TPHCM', N'0159753458', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 3, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (24, N'87ef750941e58e6f717de45f24b924bf22b06893938166f4e4991a608e588df3', N'laptq@gmail.com', N'Truong Quoc Lap4', 1, CAST(N'2000-08-30' AS Date), N'Ton Dan P15 Q4 TPHCM', N'0776914237', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 4, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (25, N'c58d0501450ea42048671b7a295bfb2ee1c7e62fbf3943e22b127999d1fa88a8', N'hieudn@gmail.com', N'Dinh Nhu Hieu4', 1, CAST(N'2000-03-31' AS Date), N'Pham The Hien Q8 TPHCM', N'033365328', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 4, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (26, N'bb088c22e0a72fa105a9d7ef14418459241ead64f5b086e4318cbabc3750db50', N'trungnd@gmail.com', N'Nguyen Duc Trung4', 1, CAST(N'2000-01-01' AS Date), N'Hoc Mon, TPHCM', N'0159753459', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'WOR', 4, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (27, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Section2', 1, CAST(N'2022-03-24' AS Date), N'section, section, section', N'0987654322', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 2, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (28, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Section3', 1, CAST(N'2022-03-24' AS Date), N'section, section, section', N'0987654323', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 3, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (31, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Section4', 1, CAST(N'2022-03-23' AS Date), N'section, section, section', N'0987654326', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 4, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (93, N'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', N'galaxysp.gs@gmail.com', N'Le hung ', 1, CAST(N'2000-07-19' AS Date), N'customer, customer, customer', N'0904739703', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'CUS', NULL, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (172, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Huynh Anh Tuan', 1, CAST(N'2022-03-24' AS Date), N'section, section, section', N'0987654326', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 5, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (173, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Nguyen Hoang Hai', 1, CAST(N'2022-03-24' AS Date), N'section, section, section', N'0987654327', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e7', N'SEC', 6, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (174, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'section@section', N'Ha Van Hoai', 1, CAST(N'2022-03-23' AS Date), N'section, section, section', N'0987654328', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e8', N'SEC', 7, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (178, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'sec@sec', N'test3', 1, CAST(N'2022-04-28' AS Date), N'secsecsec', N'0123456780', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 10, 1)
INSERT [dbo].[Account] ([AccountId], [Password], [Email], [Name], [Gender], [DateOfBirth], [Address], [Phone], [AvatarUrl], [RoleId], [SectionId], [IsActive]) VALUES (179, N'3fb45623cb3075a8af9a2f81ef3beaa4038541cd71f08e4bf6c79c088f7a4026', N'sec@secsec', N'test4', 1, CAST(N'1969-12-31' AS Date), N'secsecsec', N'0123123123', N'no-face.png?alt=media&token=83eda3a8-5787-4f09-af2b-473462ada9e6', N'SEC', 11, 1)
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Cart] ON 

INSERT [dbo].[Cart] ([CartId], [AccountId], [CartInfo], [TotalPrice]) VALUES (1, 14, N'[{"productId":"PRO1", "amount": 5},{"productId":"PRO2", "amount":10}]', 0)
INSERT [dbo].[Cart] ([CartId], [AccountId], [CartInfo], [TotalPrice]) VALUES (2, 93, N'[{"productId":"PRO1", "amount": 5},{"productId":"PRO2", "amount":10}]', 0)
SET IDENTITY_INSERT [dbo].[Cart] OFF
GO
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'BBG01', N'Bas bắt góc', 200, N'bbg.jpg?alt=media&token=f0e40e7e-6164-423b-9b20-63717a3f95a3', N'Active', N'Tôn', N'20x30x40', N'Đen', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'BCU01', N'Bas chữ U', 500, N'bcu.png?alt=media&token=de0a2f71-5865-4afe-8950-6fc3eee23362', N'Active', N'Tôn', N'21x31x41', N'Vàng', 100, N'Tôn', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'BDL01', N'Bộ đánh lửa', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Sắt', N'20x30x41', N'Xám', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'CCS01', N'Chân cao su', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Cao su', N'22x32x43', N'Nâu', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'CD01', N'Chén đồng', 300, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Đồng', N'20x30x42', N'Vàng', 100, N'Đồng', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'D01', N'Dĩa', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Gang', N'20x30x43', N'Nhám', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'DD01', N'Đầu đốt', 500, N'dd.png?alt=media&token=2e9757c7-dc21-4e87-aec3-d58ba8e99620', N'Active', N'Sắt', N'22x32x44', N'Vàng', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'DDG01', N'Đường dẫn gas', 500, N'og.png?alt=media&token=fa284dfe-ffbd-4da1-8ad8-6a86005bb5e3', N'Active', N'Đồng', N'22x32x45', N'Bạc', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'DDL01', N'Đĩa lồi', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Tôn', N'21x31x44', N'Xám', 100, N'Tôn, Inox', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'K01', N'Kiềng', 500, N'kieng.jpg?alt=media&token=7c15841c-237c-409d-945b-0bd017cc771f', N'Active', N'Sắt', N'21x31x45', N'Trắng', 100, N'Sắt, Thép', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'KB01', N'Khung bếp', 500, N'khungbep.jpg?alt=media&token=fd05c644-1ab5-4fd7-a958-5a743e64b938', N'Active', N'Thép', N'20x30x44', N'Nâu', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'MK01', N'Mặt Kính', 500, N'matkinh.png?alt=media&token=13e7fcec-8df9-48ab-9bc4-f42c3138eedc', N'Active', N'Kính', N'22x32x46', N'Đen', 100, N'Kính', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'NB01', N'Nhãn bếp', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Giấy', N'21x31x46', N'Nhám', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'NK01', N'Nép kính', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Kính', N'20x30x45', N'Vàng', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'NV01', N'Nút vặn', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Nhựa', N'22x32x47', N'Xám', 100, N'Nhập', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'OD01', N'Ống điếu', 500, N'dieu.png?alt=media&token=52aa4ac4-312f-4aac-af02-5dbb3a2bf67a', N'Active', N'Gang', N'20x30x46', N'Bạc', 100, N'Inox, Gang, Tôn', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'OG01', N'Ống gas', 500, N'og.png?alt=media&token=15432391-0c56-4100-b0a7-b454c52520ac', N'Active', N'Ông Sắt', N'22x32x48', N'Trắng', 100, N'Ống sắt', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'RCS01', N'Ron cao su', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Cao su', N'20x30x47', N'Đen', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'T3', N'TEST3', 400, N'thinh.jpg?alt=media&token=85d0ab9b-e304-4958-a5d4-e58bd4ed0aed', N'Active', N'te1', N'30x30x20', N'Yellow', 30, NULL, N'T3C', 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'T4', N'test4', 400, N'trung.jpg?alt=media&token=ec286238-ba77-4bd0-9614-ed274c6200fc', N'Active', N'nhom', N'30x30x30', N'vang', 20, NULL, N'T4C', 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'TB01', N'Thân bếp', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Inox', N'22x32x49', N'Nhám', 100, N'Tôn, Inox', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'TDM01', N'Thanh đỡ mặt', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Inox', N'20x30x48', N'Xám', 100, N'Tôn', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'TN01', N'Thanh ngang', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Inox', N'21x31x49', N'Bạc', 100, N'Tôn', NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'TH01', N'Tem hông', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Giấy', N'21x31x48', N'Vàng', 100, NULL, NULL, 50)
INSERT [dbo].[Component] ([ComponentId], [ComponentName], [Amount], [ImageUrl], [Status], [Substance], [Size], [Color], [Weight], [Description], [ItemId], [Average]) VALUES (N'V01', N'Vành', 500, N'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12', N'Active', N'Inox', N'22x32x50', N'Nâu', 100, NULL, NULL, 50)
GO
SET IDENTITY_INSERT [dbo].[Component_Material] ON 

INSERT [dbo].[Component_Material] ([Id], [ComponentId], [MaterialId], [Amount]) VALUES (46, N'CD01', N'D01', 20)
INSERT [dbo].[Component_Material] ([Id], [ComponentId], [MaterialId], [Amount]) VALUES (47, N'CD01', N'O415', 15)
INSERT [dbo].[Component_Material] ([Id], [ComponentId], [MaterialId], [Amount]) VALUES (48, N'CD01', N'O48', 10)
INSERT [dbo].[Component_Material] ([Id], [ComponentId], [MaterialId], [Amount]) VALUES (49, N'BBG01', N'I01', 4)
SET IDENTITY_INSERT [dbo].[Component_Material] OFF
GO
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BBG01C', N'C', N'BBG01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BCU01C', N'C', N'BCU01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BD01P', N'P', N'BD01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BD02P', N'P', N'BD02')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BDD01P', N'P', N'BDD01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'BDL01C', N'C', N'BDL01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'CCS01C', N'C', N'CCS01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'CD01C', N'C', N'CD01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'CS01M', N'M', N'CS01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'D01C', N'C', N'D01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'D01M', N'M', N'D01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'DD01C', N'C', N'DD01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'DDG01C', N'C', N'DDG01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'DDL01C', N'C', N'DDL01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'G01M', N'M', N'G01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'I01M', N'M', N'I01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'K01C', N'C', N'K01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'K01M', N'M', N'K01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'KB01C', N'C', N'KB01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'MK01C', N'C', N'MK01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'NB01C', N'C', N'NB01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'NK01C', N'C', N'NK01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'NV01C', N'C', N'NV01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'O415M', N'M', N'O415')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'O48M', N'M', N'O48')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'OD01C', N'C', N'OD01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'OG01C', N'C', N'OG01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'RCS01C', N'C', N'RCS01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'S01M', N'M', N'S01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'T01M', N'M', N'T01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'T1M', N'M', N'T1')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'T2M', N'M', N'T2')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'T3C', N'C', N'T3')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'T4C', N'C', N'T4')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N't6P', N'P', N't6')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'TB01C', N'C', N'TB01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'TDM01C', N'C', N'TDM01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'TN01C', N'C', N'TN01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'TH01C', N'C', N'TH01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'TH01M', N'M', N'TH01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'V01C', N'C', N'V01')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'V415M', N'M', N'V415')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'V450M', N'M', N'V450')
INSERT [dbo].[ImExItem] ([Id], [ItemType], [ItemId]) VALUES (N'V48M', N'M', N'V48')
GO
SET IDENTITY_INSERT [dbo].[ImportExport] ON 

INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1089, 1, CAST(N'2022-04-18' AS Date), N'C', 0, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1094, 1, CAST(N'2022-04-18' AS Date), N'P', 1, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1095, 1, CAST(N'2022-04-18' AS Date), N'C', 0, N'New')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1096, 1, CAST(N'2022-04-19' AS Date), N'P', 1, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1097, 1, CAST(N'2022-04-19' AS Date), N'P', 1, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1098, 1, CAST(N'2022-04-19' AS Date), N'C', 0, N'New')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1099, 1, CAST(N'2022-04-19' AS Date), N'P', 1, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1100, 1, CAST(N'2022-04-19' AS Date), N'P', 1, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1101, 1, CAST(N'2022-04-22' AS Date), N'C', 0, N'Done')
INSERT [dbo].[ImportExport] ([ImportExportId], [SectionId], [CreatedDate], [ItemType], [IsImport], [Status]) VALUES (1102, 1, CAST(N'2022-04-22' AS Date), N'P', 1, N'Done')
SET IDENTITY_INSERT [dbo].[ImportExport] OFF
GO
SET IDENTITY_INSERT [dbo].[ImportExportDetail] ON 

INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1138, 1089, 64, N'DD01C', 200, 200)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1139, 1089, 64, N'CD01C', 200, 200)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1144, 1094, 64, N'BDD01P', 100, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1145, 1095, 64, N'CD01C', 200, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1146, 1096, 64, N'CD01C', 50, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1147, 1097, 64, N'BDD01P', 20, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1148, 1098, 67, N'BBG01C', 400, 300)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1149, 1099, 64, N'BDD01P', 20, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1150, 1100, 67, N'BD01P', 150, NULL)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1151, 1101, 70, N'T3C', 100, 100)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1152, 1101, 70, N'T4C', 100, 100)
INSERT [dbo].[ImportExportDetail] ([ImportExportDetailId], [ImportExportId], [ProcessDetailId], [ItemId], [Amount], [ExportedAmount]) VALUES (1153, 1102, 70, N't6P', 18, NULL)
SET IDENTITY_INSERT [dbo].[ImportExportDetail] OFF
GO
INSERT [dbo].[ItemType] ([TypeId], [TypeName]) VALUES (N'C', N'Component')
INSERT [dbo].[ItemType] ([TypeId], [TypeName]) VALUES (N'M', N'Material')
INSERT [dbo].[ItemType] ([TypeId], [TypeName]) VALUES (N'P', N'Product')
GO
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'CS01', N'Cao su', 100, N'Tấm', N'caosu.jpg?alt=media&token=b5189393-d86e-4077-b8f8-bfcb4187bafd', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'D01', N'Đồng', 100, N'Cây', N'bronze.jpg?alt=media&token=9973efb9-9092-4ac3-8eb2-fd82cedc2eeb', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'G01', N'Gang', 100, N'Miếng', N'gang.jpg?alt=media&token=7da15a96-5ce3-4abd-b918-c9b0d48992b8', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'I01', N'Inox', 100, N'Miếng', N'inox.jpg?alt=media&token=de81d07f-1c56-42ca-8fbd-d9ffc6dd225c', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'K01', N'Kính', 100, N'Tấm', N'kinh.jpg?alt=media&token=d25fb797-003d-401d-9043-d9e509a3d0d2', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'O415', N'Ốc 4x15', 500, N'Con', N'o415.jpg?alt=media&token=47acb5c6-18fb-48aa-9b14-89c78e990175', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'O48', N'Ốc 4x8', 500, N'Con', N'o415.jpg?alt=media&token=b5b098c5-7936-4a0a-8825-1eab342688ad', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'S01', N'Sắt', 100, N'Ống', N'iron.jpg?alt=media&token=08c6b1c3-2cef-4be9-ba0c-8a4a2ea4729d', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'T01', N'Tôn', 100, N'Cuộn', N'ton.jpg?alt=media&token=c1fa8005-ec4e-4b08-b86b-7d6489c35c14', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'T1', N'TEST1', 20, N'test', N'lap.jpg?alt=media&token=43d9fa88-0690-4126-8363-a45168d29c0b', N'Active', NULL, N'T1M')
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'T2', N'TEST2', 21, N'test', N'hieu.jpg?alt=media&token=8c892b12-333d-4f5e-b681-1b6db53d6109', N'Active', NULL, N'T2M')
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'TH01', N'Thép', 100, N'Tấm', N'thep.jpg?alt=media&token=3543c338-5c4d-4ac8-954b-b8ca25ca5047', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'V415', N'Vít 4x15', 500, N'Con', N'v415.jpg?alt=media&token=a1847a92-f326-482e-8b27-1f59e996efd5', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'V450', N'Vít 4x50', 500, N'Con', N'v415.jpg?alt=media&token=13db1d89-9872-4dd8-a130-9846691d2e38', N'Active', NULL, NULL)
INSERT [dbo].[Material] ([MaterialId], [MaterialName], [Amount], [Unit], [ImageUrl], [Status], [Description], [ItemId]) VALUES (N'V48', N'Vít 4x8', 500, N'Con', N'v415.jpg?alt=media&token=d74c9401-6d72-4651-bbf5-54b87cd80054', N'Active', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (29, 14, 460000, CAST(N'2022-04-30' AS Date), N'Waiting', N'Waiting order', 1, N'Pham Cong Thanh', N'customer, customer, customer')
INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (30, 93, 19999800, CAST(N'2022-05-30' AS Date), N'Delivery', N'Completed order', 1, N'Pham Cong Thanh', NULL)
INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (31, 14, 4000000, CAST(N'2022-06-30' AS Date), N'Processing', N'Test order', 1, N'Pham Cong Thanh', N'customer, customer, customer')
INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (33, 14, 3000000, CAST(N'2022-05-28' AS Date), N'Processing', N'', 1, N'Pham Cong Thanh', N'customer, customer, customer')
INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (35, 93, 360000, CAST(N'2022-05-31' AS Date), N'Processing', N'', 1, N'Le hung ', N'customer, customer, customer')
INSERT [dbo].[Order] ([OrderId], [AccountId], [TotalPrice], [ExpiryDate], [Status], [Note], [IsShorTerm], [CustomerName], [CustomerAddress]) VALUES (36, 93, 280000, CAST(N'2022-05-28' AS Date), N'Processing', N'', 1, N'Le hung ', N'customer, customer, customer')
SET IDENTITY_INSERT [dbo].[Order] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (36, 29, N'BD01', 23, 20000, N'')
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (37, 30, N'BD01', 200, 99999, N'')
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (38, 31, N'BDD01', 200, 20000, N'')
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (40, 33, N'BD01', 150, 20000, N'')
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (42, 35, N't6', 18, 20000, N'')
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Amount], [Price], [Note]) VALUES (52, 36, N't6', 14, 20000, N'2222')
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Process] ON 

INSERT [dbo].[Process] ([ProcessId], [OrderDetailId], [NeededAmount], [TotalAmount], [FinishedAmount], [CreatedDate], [ExpiryDate], [FinishedDate], [ExpectedFinishDate], [Status]) VALUES (26, 38, 200, 200, 190, CAST(N'2022-04-18' AS Date), CAST(N'2022-05-31' AS Date), NULL, CAST(N'2022-04-20' AS Date), N'Processing')
INSERT [dbo].[Process] ([ProcessId], [OrderDetailId], [NeededAmount], [TotalAmount], [FinishedAmount], [CreatedDate], [ExpiryDate], [FinishedDate], [ExpectedFinishDate], [Status]) VALUES (27, 40, 150, 150, 150, CAST(N'2022-04-19' AS Date), CAST(N'2022-06-30' AS Date), CAST(N'2022-04-19' AS Date), CAST(N'2022-05-28' AS Date), N'Done')
INSERT [dbo].[Process] ([ProcessId], [OrderDetailId], [NeededAmount], [TotalAmount], [FinishedAmount], [CreatedDate], [ExpiryDate], [FinishedDate], [ExpectedFinishDate], [Status]) VALUES (28, 42, 18, 18, 18, CAST(N'2022-04-22' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'2022-04-22' AS Date), CAST(N'2022-05-26' AS Date), N'Done')
INSERT [dbo].[Process] ([ProcessId], [OrderDetailId], [NeededAmount], [TotalAmount], [FinishedAmount], [CreatedDate], [ExpiryDate], [FinishedDate], [ExpectedFinishDate], [Status]) VALUES (29, 52, 14, 14, 0, CAST(N'2022-04-23' AS Date), CAST(N'2022-05-30' AS Date), NULL, CAST(N'2022-04-23' AS Date), N'New')
SET IDENTITY_INSERT [dbo].[Process] OFF
GO
SET IDENTITY_INSERT [dbo].[ProcessDetail] ON 

INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (62, 26, 5, 400, 0, NULL, CAST(N'2022-04-30' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (63, 26, 4, 400, 0, NULL, CAST(N'2022-04-28' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (64, 26, 1, 200, 190, 95, CAST(N'2022-05-28' AS Date), NULL, N'Processing', CAST(N'2022-04-20' AS Date), CAST(N'2022-04-18' AS Date))
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (65, 27, 2, 600, 0, NULL, CAST(N'2022-04-30' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (66, 27, 3, 150, 0, NULL, CAST(N'2022-05-27' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (67, 27, 1, 150, 150, 150, CAST(N'2022-04-28' AS Date), CAST(N'2022-04-19' AS Date), N'Inactive', CAST(N'2022-04-20' AS Date), CAST(N'2022-04-19' AS Date))
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (68, 28, 10, 216, 0, NULL, CAST(N'2022-04-30' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (69, 28, 11, 216, 0, NULL, CAST(N'2022-05-28' AS Date), NULL, N'New', NULL, NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (70, 28, 1, 18, 18, 18, CAST(N'2022-05-31' AS Date), CAST(N'2022-04-22' AS Date), N'Done', CAST(N'2022-04-23' AS Date), CAST(N'2022-04-22' AS Date))
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (71, 29, 11, 168, 0, 50, CAST(N'2022-04-29' AS Date), NULL, N'New', CAST(N'2022-04-26' AS Date), NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (72, 29, 10, 168, 0, 50, CAST(N'2022-04-30' AS Date), NULL, N'New', CAST(N'2022-04-26' AS Date), NULL)
INSERT [dbo].[ProcessDetail] ([ProcessDetailId], [ProcessId], [SectionId], [TotalAmount], [FinishedAmount], [AverageAmount], [ExpiryDate], [FinishedDate], [Status], [ExpectedFinishDate], [FirstExportDate]) VALUES (73, 29, 1, 14, 0, 50, CAST(N'2022-05-28' AS Date), NULL, N'New', CAST(N'2022-04-23' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[ProcessDetail] OFF
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [Amount], [Price], [ImageUrl], [Status], [Description], [ItemId], [Average]) VALUES (N'BD01', N'Bếp Đơn', 100, 200000, N'bd.png?alt=media&token=42d6b6d5-af40-4d97-8763-2f4199e4f060', N'Active', N'Day la mot cai bep don', NULL, 50)
INSERT [dbo].[Product] ([ProductId], [ProductName], [Amount], [Price], [ImageUrl], [Status], [Description], [ItemId], [Average]) VALUES (N'BD02', N'Bep Am', 200, 500000, N'bepam.jfif?alt=media&token=3bb6c866-fd27-463b-bb6a-9118f964d597', N'Active', N'Day la mot cai bep am', NULL, 50)
INSERT [dbo].[Product] ([ProductId], [ProductName], [Amount], [Price], [ImageUrl], [Status], [Description], [ItemId], [Average]) VALUES (N'BDD01', N'Bếp Đôi', 100, 400000, N'bddd.jpg?alt=media&token=6b96fb11-51e9-4f21-bd4f-b15ad15fafa5', N'Active', N'Day la mot cai bep doi', NULL, 50)
INSERT [dbo].[Product] ([ProductId], [ProductName], [Amount], [Price], [ImageUrl], [Status], [Description], [ItemId], [Average]) VALUES (N't6', N'test6', 32, 2432423, N'lap.jpg?alt=media&token=81b20d64-74e7-4a6b-bf35-69cbfa1d97eb', N'Active', N'te', NULL, 50)
GO
SET IDENTITY_INSERT [dbo].[Product_Component] ON 

INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (76, N'BDD01', N'DD01', 2)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (77, N'BDD01', N'CD01', 2)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (82, N'BD02', N'BBG01', 2)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (83, N'BD02', N'TDM01', 2)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (84, N'BD02', N'NV01', 2)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (85, N'BD01', N'BBG01', 4)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (86, N'BD01', N'CCS01', 4)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (89, N't6', N'T4', 12)
INSERT [dbo].[Product_Component] ([Id], [ProductId], [ComponentId], [Amount]) VALUES (90, N't6', N'T3', 12)
SET IDENTITY_INSERT [dbo].[Product_Component] OFF
GO
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'ADM', N'Admin', N'Active')
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'CUS', N'Customer', N'Active')
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'MAN', N'Manufacturer Department', N'Active')
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'ORD', N'Order Department', N'Active')
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'SEC', N'Section Department', N'Active')
INSERT [dbo].[Role] ([RoleId], [Name], [Status]) VALUES (N'WOR', N'Worker', N'Active')
GO
SET IDENTITY_INSERT [dbo].[Section] ON 

INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (1, 6, NULL, 4, 1, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (2, 27, N'BBG01', 4, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (3, 28, N'BDL01', 4, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (4, 31, N'CD01', 4, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (5, 172, N'DD01', 1, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (6, 173, N'DDG01', 1, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (7, 174, N'K01', 1, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (10, 178, N'T3', 1, 0, N'Active')
INSERT [dbo].[Section] ([SectionId], [SectionLeadId], [ComponentId], [WorkerAmount], [IsAssemble], [Status]) VALUES (11, 179, N'T4', 1, 0, N'Active')
SET IDENTITY_INSERT [dbo].[Section] OFF
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
ALTER TABLE [dbo].[Attendance]  WITH CHECK ADD  CONSTRAINT [FK_Attendance_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([AccountId])
GO
ALTER TABLE [dbo].[Attendance] CHECK CONSTRAINT [FK_Attendance_Account]
GO
ALTER TABLE [dbo].[AttendanceDetail]  WITH CHECK ADD  CONSTRAINT [FK_AttendanceDetail_Attendance] FOREIGN KEY([AttendanceId])
REFERENCES [dbo].[Attendance] ([AttendanceId])
GO
ALTER TABLE [dbo].[AttendanceDetail] CHECK CONSTRAINT [FK_AttendanceDetail_Attendance]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [FK_Account_Cart] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([AccountId])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [FK_Account_Cart]
GO
ALTER TABLE [dbo].[Component]  WITH CHECK ADD  CONSTRAINT [FK_Component_ImExItem] FOREIGN KEY([ItemId])
REFERENCES [dbo].[ImExItem] ([Id])
GO
ALTER TABLE [dbo].[Component] CHECK CONSTRAINT [FK_Component_ImExItem]
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
ALTER TABLE [dbo].[ImportExportDetail]  WITH NOCHECK ADD  CONSTRAINT [FK_ImportExportDetail_ImExItem] FOREIGN KEY([ItemId])
REFERENCES [dbo].[ImExItem] ([Id])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_ImExItem]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_ImportExport] FOREIGN KEY([ImportExportId])
REFERENCES [dbo].[ImportExport] ([ImportExportId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_ImportExport]
GO
ALTER TABLE [dbo].[ImportExportDetail]  WITH CHECK ADD  CONSTRAINT [FK_ImportExportDetail_ProcessDetail] FOREIGN KEY([ProcessDetailId])
REFERENCES [dbo].[ProcessDetail] ([ProcessDetailId])
GO
ALTER TABLE [dbo].[ImportExportDetail] CHECK CONSTRAINT [FK_ImportExportDetail_ProcessDetail]
GO
ALTER TABLE [dbo].[Material]  WITH CHECK ADD  CONSTRAINT [FK_Material_ImExItem] FOREIGN KEY([ItemId])
REFERENCES [dbo].[ImExItem] ([Id])
GO
ALTER TABLE [dbo].[Material] CHECK CONSTRAINT [FK_Material_ImExItem]
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
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ImExItem] FOREIGN KEY([ItemId])
REFERENCES [dbo].[ImExItem] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ImExItem]
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
ALTER DATABASE [GSP_DB_test1] SET  READ_WRITE 
GO
