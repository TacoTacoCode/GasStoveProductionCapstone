using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Excel;
namespace GSP_API.Business.Extensions
{
    public class Excel
    {
		public static List<T> ImportExcel<T>(string excelFilePath)
		{
			List<T> list = new List<T>();
			Type typeOfObject = typeof(T);
			using (IXLWorkbook workbook = new XLWorkbook(excelFilePath))
			{
				var worksheet = workbook.Worksheets.First();
				var properties = typeOfObject.GetProperties();
				//header column texts
				var columns = worksheet.FirstRow().Cells().Select((v, i) => new { Value = v.Value, Index = i + 1 });//indexing in closedxml starts with 1 not from 0

				foreach (IXLRow row in worksheet.RowsUsed().Skip(1))//Skip first row which is used for column header texts
				{
					T obj = (T)Activator.CreateInstance(typeOfObject);

					foreach (var prop in properties)
					{
						var col = columns.SingleOrDefault(c => c.Value.ToString() == prop.Name.ToString());
						if(col == null)
                        {
							continue;
                        }
						int colIndex = col.Index;
						var val = row.Cell(colIndex).Value;
						if (String.IsNullOrEmpty(val.ToString()))
						{
							continue;
						}
						var type = prop.PropertyType;
						if (type.FullName.Contains("Null"))
						{
							type = Nullable.GetUnderlyingType(type);

						}
						prop.SetValue(obj, Convert.ChangeType(val, type));

					}

					list.Add(obj);
				}

			}

			return list;
		}
	}
}
