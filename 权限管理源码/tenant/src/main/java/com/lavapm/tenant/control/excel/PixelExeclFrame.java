package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Pixelinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;






public class PixelExeclFrame
{
  public PixelExeclFrame() {}
  
  public Object[][] getPixelInfoData(List<Pixelinfor> listPixelinfo, long allSumnewuser)
  {
    Object[][] data = (Object[][])null;
    Pixelinfor pixelinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listPixelinfo != null) && (listPixelinfo.size() != 0)) {
      data = new Object[listPixelinfo.size() + 1][5];
      data[0][0] = "分辨率";
      data[0][1] = "日期段新增用户";
      
      data[0][2] = "累计用户总量";
      data[0][3] = "累计用户比例";
      
      for (int i = 0; i < listPixelinfo.size(); i++) {
        pixelinfor = (Pixelinfor)listPixelinfo.get(i);
        
        sumnewuseravg = Util.getPercentage(Integer.valueOf(pixelinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
        DecimalFormat df = new DecimalFormat("##.0");
        sumnewuseravg = Float.parseFloat(df.format(sumnewuseravg));
        
        data[(i + 1)][0] = pixelinfor.getPixelname();
        data[(i + 1)][1] = Integer.valueOf(pixelinfor.getDnewuser());
        data[(i + 1)][2] = Integer.valueOf(pixelinfor.getSumnewuser());
        data[(i + 1)][3] = (sumnewuseravg + "%");
      }
    }
    
    return data;
  }
}
