package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Gisinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;







public class GisInfoExcelFrame
{
  public GisInfoExcelFrame() {}
  
  public Object[][] getGisInfoData(List<Gisinfor> listGisInfo, long allSumnewuser)
  {
    Object[][] data = (Object[][])null;
    Gisinfor gisinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listGisInfo != null) && (listGisInfo.size() != 0)) {
      data = new Object[listGisInfo.size() + 1][5];
      data[0][0] = "地区";
      data[0][1] = "日期段新增用户";
      
      data[0][2] = "累计用户总量";
      data[0][3] = "累计用户比例";
      
      for (int i = 0; i < listGisInfo.size(); i++) {
        gisinfor = (Gisinfor)listGisInfo.get(i);
        
        sumnewuseravg = Util.getPercentage(Integer.valueOf(gisinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
        DecimalFormat df = new DecimalFormat("##.0");
        sumnewuseravg = Float.parseFloat(df.format(sumnewuseravg));
        
        data[(i + 1)][0] = gisinfor.getProvincename();
        data[(i + 1)][1] = Integer.valueOf(gisinfor.getDnewuser());
        data[(i + 1)][2] = Integer.valueOf(gisinfor.getSumnewuser());
        data[(i + 1)][3] = (sumnewuseravg + "%");
      }
    }
    
    return data;
  }
}
