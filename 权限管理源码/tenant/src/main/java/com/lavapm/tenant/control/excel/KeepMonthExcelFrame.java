package com.lavapm.tenant.control.excel;



public class KeepMonthExcelFrame
{
  public KeepMonthExcelFrame() {}
  

  public Object[][] getKeepMonth(String sbufferKeepdistMonth)
  {
    Object[][] data = (Object[][])null;
    String[] row = null;
    String[] cell = null;
    

    if ((sbufferKeepdistMonth != null) && (!"".equals(sbufferKeepdistMonth))) {
      row = sbufferKeepdistMonth.split("&");
      if (row != null) {
        data = new Object[row.length + 1][2];
        data[0][0] = "月份";
        data[0][1] = "回访用户比例";
        for (int i = 0; i < row.length; i++) {
          if (row[i] != null) {
            cell = row[i].split(",");
            if (cell != null) {
              data[(i + 1)][0] = cell[0];
              data[(i + 1)][1] = (cell[1] + "%");
            }
          }
        }
      }
    }
    return data;
  }
}
