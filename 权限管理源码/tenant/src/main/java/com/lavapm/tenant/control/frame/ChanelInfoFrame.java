package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.PieBean;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;








public class ChanelInfoFrame
{
  public ChanelInfoFrame() {}
  
  public String getPieInfo(List<PieBean> dactiveuserPieTop, List<PieBean> dactiveuserPie, int allDactiveuser)
  {
    String info = "";
    float dactiveuseravg = 0.0F;
    PieBean dactiveuserPieBean = null;
    List<PieBean> dactiveuserTmpPie = new ArrayList();
    StringBuffer dactiveusersbuffer = new StringBuffer();
    String tmpvalue = "";
    List<String> dactiveuserCategories = new ArrayList();
    List<String> dactiveuserSecCategories = new ArrayList();
    List<Integer> dactiveuserValue = new ArrayList();
    for (int i = 0; i < dactiveuserPieTop.size(); i++) {
      dactiveuserPieBean = (PieBean)dactiveuserPie.get(i);
      dactiveuseravg = Util.getPercentage(Integer.valueOf((int)dactiveuserPieBean.getY()), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
      dactiveuserCategories.add(dactiveuserPieBean.getName());
      dactiveuserSecCategories.add(String.valueOf(dactiveuseravg));
      dactiveuserValue.add(Integer.valueOf((int)dactiveuserPieBean.getY()));
    }
    
    for (int j = 0; j < dactiveuserPie.size(); j++) {
      dactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
      dactiveuseravg = Util.getPercentage(Integer.valueOf((int)dactiveuserPieBean.getY()), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
      dactiveuserPieBean.setY(dactiveuseravg);
      dactiveuserTmpPie.add(dactiveuserPieBean);
      tmpvalue = dactiveuserPieBean.getName() + "," + dactiveuserPieBean.getY() + "%";
      if (j == 0) {
        dactiveusersbuffer.append(tmpvalue);
      } else {
        dactiveusersbuffer.append("&" + tmpvalue);
      }
    }
    

    Map<String, Object> map = new HashMap();
    map.put("dactiveuserPie", dactiveuserTmpPie);
    map.put("dactiveuserCategories", dactiveuserCategories);
    map.put("dactiveuserSecCategories", dactiveuserSecCategories);
    map.put("dactiveuseravg", dactiveuserValue);
    map.put("dactiveusergridinfo", dactiveusersbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
