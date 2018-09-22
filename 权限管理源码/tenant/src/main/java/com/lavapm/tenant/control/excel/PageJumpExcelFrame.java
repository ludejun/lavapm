package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.Pagejump;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;







public class PageJumpExcelFrame
{
  public PageJumpExcelFrame() {}
  
  public Object[][] getPageJumpData(List<Pagejump> listPagejump, int allPageJump)
  {
    Object[][] data = (Object[][])null;
    Pagejump pagejump = null;
    float sumnewuseravg = 0.0F;
    
    if ((listPagejump != null) && (listPagejump.size() != 0)) {
      float pnum = 0.0F;
      data = new Object[listPagejump.size() + 1][3];
      data[0][0] = "转向页面";
      data[0][1] = "次数";
      data[0][2] = "比例(%)";
      
      for (int i = 0; i < listPagejump.size(); i++) {
        pagejump = (Pagejump)listPagejump.get(i);
        
        pnum = Util.getPercentage(Integer.valueOf(pagejump.getNum()), Integer.valueOf(allPageJump), ConstString.DECIMALFLAGTWO);
        
        data[(i + 1)][0] = pagejump.getLink();
        data[(i + 1)][1] = Integer.valueOf(pagejump.getNum());
        data[(i + 1)][2] = (pnum + "%");
      }
    }
    return data;
  }
}
