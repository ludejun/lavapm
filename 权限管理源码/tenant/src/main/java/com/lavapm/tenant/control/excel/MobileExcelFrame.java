package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Mobileinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;







public class MobileExcelFrame
{
  public MobileExcelFrame() {}
  
  public Object[][] getMobileInfoData(List<Mobileinfor> listMobileinfo, long allSumnewuser)
  {
    Object[][] data = (Object[][])null;
    Mobileinfor mobileinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listMobileinfo != null) && (listMobileinfo.size() != 0)) {
      data = new Object[listMobileinfo.size() + 1][5];
      data[0][0] = "机型";
      data[0][1] = "日期段新增用户";
      
      data[0][2] = "累计用户总量";
      data[0][3] = "累计用户比例";
      
      for (int i = 0; i < listMobileinfo.size(); i++) {
        mobileinfor = (Mobileinfor)listMobileinfo.get(i);
        
        sumnewuseravg = Util.getPercentage(Integer.valueOf(mobileinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
        

        DecimalFormat df = new DecimalFormat("##.0");
        sumnewuseravg = Float.parseFloat(df.format(sumnewuseravg));
        
        data[(i + 1)][0] = mobileinfor.getMobilename();
        data[(i + 1)][1] = Integer.valueOf(mobileinfor.getDnewuser());
        data[(i + 1)][2] = Integer.valueOf(mobileinfor.getSumnewuser());
        data[(i + 1)][3] = (sumnewuseravg + "%");
      }
    }
    
    return data;
  }
}
