package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Partner;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;








public class PartnerFrame
{
  public PartnerFrame() {}
  
  public String getPartnerSelect(List<Partner> partnerList)
  {
    String info = "";
    Map<String, Object> map = new HashMap();
    map.put("partnerselet", partnerList);
    try
    {
      info = JSONUtils.writeValueAsString(map);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  






  public String getPartnerIsUserInfo(List<Partner> partnerList)
  {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    Partner partner = null;
    for (int i = 0; i < partnerList.size(); i++) {
      partner = (Partner)partnerList.get(i);
      tmpvalue = Util.getTimeToStr(partner.getRegistertime()) + "," + partner.getPartneruser() + "," + partner.getPartnerpassword() + "," + partner.getPartnername() + "," + Util.getTimeToStr(partner.getLastlogin()) + "," + partner.getPartnerid();
      




      if (i < partnerList.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    Map<String, Object> map = new HashMap();
    
    map.put("partnerissuer", sbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  


  public String getPartnerManagerInfo(List<Partner> partnerList)
  {
    String info = "";
    

    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    Partner partner = null;
    for (int i = 0; (partnerList != null) && (i < partnerList.size()); i++) {
      partner = (Partner)partnerList.get(i);
      tmpvalue = partner.getPartnername() + "*!" + partner.getPartnerid() + "*!" + (partner.getChannelstr() != null ? 1 : 2) + "," + ((partner.getDisplayname() == null) || (partner.getDisplayname().trim().equals("")) ? "---" : partner.getDisplayname()) + "*!" + partner.getPartnerid() + "," + Util.getTimeToStr(partner.getRegistertime()) + "," + (partner.getChannelstr() != null ? 2 : (partner.getGroupid() == null) || (partner.getGroupid().intValue() == 0) ? 1 : 3) + "*!" + partner.getPartnerid() + "," + partner.getIsdisplay() + "*!" + partner.getPartnerid() + "," + partner.getPartnerid().intValue() + "*!" + partner.getIscreate() + "*!" + partner.getIsuser();
      

















      if (i < partnerList.size() - 1) {
        sbuffer.append(tmpvalue + "^&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("partnerselet", partnerList);
    try {
      info = JSONUtils.writeValueAsString(map);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
