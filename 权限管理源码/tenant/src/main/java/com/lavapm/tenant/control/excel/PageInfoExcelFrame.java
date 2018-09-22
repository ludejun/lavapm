package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.Pageinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;








public class PageInfoExcelFrame
{
  public PageInfoExcelFrame() {}
  
  public Object[][] getPageInfoData(List<Pageinfor> listPageinfor, Pageinfor allPageinfor)
  {
    Object[][] data = (Object[][])null;
    Pageinfor pageinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listPageinfor != null) && (listPageinfor.size() != 0)) {
      float pviewnum = 0.0F;
      float paveragestay = 0.0F;
      float averagestayavg = 0.0F;
      float pexitnum = 0.0F;
      data = new Object[listPageinfor.size() + 1][4];
      data[0][0] = "页面";
      data[0][1] = "页面访问次数(%)";
      data[0][2] = "平均停留秒数(%)";
      data[0][3] = "页面跳出率(%)";
      
      for (int i = 0; i < listPageinfor.size(); i++) {
        pageinfor = (Pageinfor)listPageinfor.get(i);
        
        pviewnum = Util.getPercentage(Integer.valueOf(pageinfor.getViewnum()), Integer.valueOf(allPageinfor.getAllviewnum()), ConstString.DECIMALFLAGTWO);
        averagestayavg = pageinfor.getAveragestay();
        paveragestay = Util.getPercentage(Integer.valueOf(pageinfor.getAveragestay()), Integer.valueOf(allPageinfor.getAllaveragestay()), ConstString.DECIMALFLAGTWO);
        pexitnum = Util.getPercentage(Integer.valueOf(pageinfor.getExitnum()), Integer.valueOf(pageinfor.getViewnum()), ConstString.DECIMALFLAGTWO);
        
        data[(i + 1)][0] = pageinfor.getPagename();
        data[(i + 1)][1] = (pageinfor.getViewnum() + "(" + pviewnum + "%)");
        data[(i + 1)][2] = ((int)averagestayavg + "(" + paveragestay + "%)");
        data[(i + 1)][3] = (pexitnum + "%");
      }
    }
    return data;
  }
}
