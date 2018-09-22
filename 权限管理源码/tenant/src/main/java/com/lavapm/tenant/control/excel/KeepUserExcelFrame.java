package com.lavapm.tenant.control.excel;




public class KeepUserExcelFrame
{
  public KeepUserExcelFrame() {}
  



  public Object[][] getKeepInfoData(String sbuffer)
  {
    Object[][] data = (Object[][])null;
    String[] row = null;
    String[] cell = null;
    if ((sbuffer != null) && (!"".equals(sbuffer))) {
      row = sbuffer.split("&");
      if (row != null) {
        data = new Object[row.length + 1][4];
        data[0][0] = "日期";
        data[0][1] = "新增用户";
        data[0][2] = "7日回访用户";
        data[0][3] = "回访率";
        for (int i = 0; i < row.length; i++) {
          if (row[i] != null) {
            cell = row[i].split(",");
            if (cell != null) {
              data[(i + 1)][0] = cell[0];
              data[(i + 1)][1] = cell[1];
              data[(i + 1)][2] = cell[2];
              data[(i + 1)][3] = cell[3];
            }
          }
        }
      }
    }
    
    return data;
  }
}
