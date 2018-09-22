package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Ispinfor;
import com.lavapm.tenant.bean.PieBean;
import com.lavapm.tenant.tool.AndriodVersion;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;








public class IspinExcelFrame
{
  public IspinExcelFrame() {}
  
  public Object[][] getIspinInfoData(List<Ispinfor> listIspinfor, long allSumnewuser)
  {
    Object[][] data = (Object[][])null;
    Ispinfor ispinfor = null;
    float sumnewuseravg = 0.0F;
    
    if ((listIspinfor != null) && (listIspinfor.size() != 0)) {
      data = new Object[listIspinfor.size() + 1][4];
      data[0][0] = "运营商";
      data[0][1] = "日期段新增用户";
      
      data[0][2] = "累计用户总量";
      data[0][3] = "累计用户比例";
      
      for (int i = 0; i < listIspinfor.size(); i++) {
        ispinfor = (Ispinfor)listIspinfor.get(i);
        
        sumnewuseravg = ispinfor.getSumnewuser() / (float)allSumnewuser;
        sumnewuseravg *= 100.0F;
        DecimalFormat df = new DecimalFormat("##.0");
        sumnewuseravg = Float.parseFloat(df.format(sumnewuseravg));
        
        data[(i + 1)][0] = ispinfor.getIspname();
        data[(i + 1)][1] = Integer.valueOf(ispinfor.getDnewuser());
        data[(i + 1)][2] = Integer.valueOf(ispinfor.getSumnewuser());
        data[(i + 1)][3] = (sumnewuseravg + "%");
      }
    }
    
    return data;
  }
  
  public Object[][] getChannelInfoData(List<PieBean> listIspinfor, long allSumnewuser) { Object[][] data = (Object[][])null;
    PieBean ispinfor = null;
    
    if ((listIspinfor != null) && (listIspinfor.size() != 0)) {
      data = new Object[listIspinfor.size() + 1][2];
      data[0][0] = "联网方式";
      data[0][1] = "累计用户比例";
      
      for (int i = 0; i < listIspinfor.size(); i++) {
        ispinfor = (PieBean)listIspinfor.get(i);
        String channelinfo = ispinfor.getName();
        
        float ispinfo = Util.getPercentage(Integer.valueOf((int)ispinfor.getY()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
        DecimalFormat df = new DecimalFormat("##.0");
        ispinfo = Float.parseFloat(df.format(ispinfo));
        
        data[(i + 1)][0] = AndriodVersion.getChanelInfo(channelinfo);
        data[(i + 1)][1] = (ispinfo + "%");
      }
    }
    
    return data;
  }
}
