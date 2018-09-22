package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Osinfor;
import com.lavapm.tenant.tool.AndriodVersion;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;







public class OsExcelFrame
{
  public OsExcelFrame() {}
  
  public Object[][] getOsInfoData(List<Osinfor> listOsinfo, long allSumnewuser)
  {
    Object[][] data = (Object[][])null;
    Osinfor osinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listOsinfo != null) && (listOsinfo.size() != 0)) {
      data = new Object[listOsinfo.size() + 1][5];
      data[0][0] = "系统";
      data[0][1] = "日期段新增用户";
      
      data[0][2] = "累计用户总量";
      data[0][3] = "累计用户比例";
      
      for (int i = 0; i < listOsinfo.size(); i++) {
        osinfor = (Osinfor)listOsinfo.get(i);
        
        sumnewuseravg = Util.getPercentage(Integer.valueOf(osinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
        

        DecimalFormat df = new DecimalFormat("##.0");
        sumnewuseravg = Float.parseFloat(df.format(sumnewuseravg));
        
        String osname = osinfor.getOsname();
        data[(i + 1)][0] = AndriodVersion.getAndriodVersion(osname);
        data[(i + 1)][1] = Integer.valueOf(osinfor.getDnewuser());
        data[(i + 1)][2] = Integer.valueOf(osinfor.getSumnewuser());
        data[(i + 1)][3] = (sumnewuseravg + "%");
      }
    }
    
    return data;
  }
}
