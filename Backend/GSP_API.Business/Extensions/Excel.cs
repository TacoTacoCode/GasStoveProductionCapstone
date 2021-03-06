using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClosedXML.Excel;
using GSP_API.Domain.Repositories.Models;

namespace GSP_API.Business.Extensions
{
    public class Excel
    {
        public static List<T> ImportExcel<T>(Stream fileStream)
        {
            List<T> list = new List<T>();
            Type typeOfObject = typeof(T);
            using (IXLWorkbook workbook = new XLWorkbook(fileStream))
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
                        if (col == null)
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

        public static DataTable ToDataTable<T>(IDictionary<int, T> dictionary)
        {
            DataTable dt = new();
            //generate header, get field that isnot an collection.
            dt.Columns.Add("No");
            foreach (var prop in typeof(T).GetProperties())
            {
                if (!prop.PropertyType.Name.Equals("ICollection`1"))
                {
                    dt.Columns.Add(prop.Name);
                }
            }
            dt.Columns.Add("Error");
            IList<dynamic> tmp;
            foreach (var record in dictionary)
            {
                tmp = new List<dynamic>
                {
                    record.Key
                };
                foreach (var item in typeof(T).GetProperties())
                {
                    if (!item.PropertyType.Name.Equals("ICollection`1"))
                    {
                        tmp.Add(item.GetValue(record.Value));
                    }
                }
                tmp.Add("Duplicated ID");
                dt.Rows.Add(tmp.ToArray());
            }
            return dt;
        }

        public static string ExportExcel<T>(IDictionary<int, T> dictionary)
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                var dt = ToDataTable<T>(dictionary);
                wb.Worksheets.Add(dt, "ErrorRecord");
                wb.Worksheets.First().LastColumnUsed().Style.Font.FontColor = XLColor.Red;
                wb.Worksheet(1).Columns().AdjustToContents();
                if (!Directory.Exists("ErrorRecord"))
                {
                    Directory.CreateDirectory("ErrorRecord");
                }
                var fileName = "error" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx";
                wb.SaveAs("ErrorRecord/" + fileName);
                return fileName;
            }
        }

        /*public static List<Attendance> ReadAttendanceFile2(Stream fileStream)
        {
            string month = "B7";
            string year = "B6";
            List<Attendance> tmpList = new();
            using (var wb = new XLWorkbook(fileStream))
            {
                var ws = wb.Worksheet(1);
                var tmpDate = new DateTime(Convert.ToInt32(ws.Cell(year).Value), Convert.ToInt32(ws.Cell(month).Value), 1);
                for (int colIndex = 4; colIndex < 35; colIndex++)
                {
                    Attendance tmpAttendance = new()
                    {
                        CheckDate = tmpDate.Date
                    };
                    int count = 0;
                    var ids = ws.Column(3);
                    for (int rowIndex = 8; rowIndex < ids.LastCellUsed().Address.RowNumber + 1; rowIndex++)
                    {
                        int id = Convert.ToInt32(ids.Cell(rowIndex).Value);
                        bool isPresented = false;
                        if (double.TryParse(ws.Cell(rowIndex, colIndex).Value.ToString(), out double num))
                        {
                            isPresented = true;
                            count++;
                        }
                        tmpAttendance.AttendanceDetails.Add(new AttendanceDetail()
                        {
                            AccountId = id,
                            IsPresented = isPresented,
                        });
                    }
                    tmpAttendance.PresentedAmount = count;
                    tmpList.Add(tmpAttendance);

                    tmpDate = tmpDate.AddDays(1);
                }
            }
            return tmpList;
        }
        */
        public static List<Attendance> ReadAttendanceFile(Stream fileStream)
        {
            string month = "B7";
            string year = "B6";
            List<Attendance> tmpList = new();
            using (var wb = new XLWorkbook(fileStream))
            {
                var ws = wb.Worksheet(1);
                var ids = ws.Column(3);
                for (int rowIndex = 8; rowIndex < ids.LastCellUsed().Address.RowNumber + 1; rowIndex++)
                {
                    var tmpDate = new DateTime(Convert.ToInt32(ws.Cell(year).Value), Convert.ToInt32(ws.Cell(month).Value), 1);
                    Attendance tmpAttendance = new()
                    {
                        CheckDate = tmpDate.Date,
                        AccountId = Convert.ToInt32(ids.Cell(rowIndex).Value),
                    };
                    for (int colIndex = 4; colIndex < 35; colIndex++)
                    {
                        var cell = ws.Cell(rowIndex, colIndex);
                        var note = cell.Value.ToString();
                        bool isPresented = false;
                        if (double.TryParse(note, out double num))
                        {
                            isPresented = true;
                        }

                        else if (cell.IsMerged())
                        {
                            note = cell.MergedRange().FirstCell().Value.ToString();
                        }
                        ws.Cell(rowIndex, colIndex).IsMerged();
                        tmpAttendance.AttendanceDetails.Add(new AttendanceDetail()
                        {
                            CheckDate = tmpDate.Date,
                            IsPresented = isPresented,
                            Note = note,
                        });
                        tmpDate = tmpDate.AddDays(1);
                    }
                    tmpList.Add(tmpAttendance);
                }
            }
            return tmpList;

        }
    }
}
