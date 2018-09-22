package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.MailInfo;
import com.lavapm.tenant.tool.JSONUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;






public class MailInfoFrame
{
  public MailInfoFrame() {}
  
  public String getMailInfoListFrame(List<MailInfo> listMailInfo)
  {
    String info = "";
    String tmpvalue = "";
    Map<String, Object> map = new HashMap();
    MailInfo tmpMailInfo = null;
    StringBuffer tablebuffer = new StringBuffer();
    for (int i = 0; i < listMailInfo.size(); i++) {
      tmpMailInfo = (MailInfo)listMailInfo.get(i);
      tmpvalue = tmpMailInfo.getEmail() + "," + tmpMailInfo.getInfotype() + "," + tmpMailInfo.getSubscribetype() + "," + tmpMailInfo.getId();
      
      if (i < listMailInfo.size() - 1) {
        tablebuffer.append(tmpvalue + "&");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    map.put("tableinfo", tablebuffer.toString());
    map.put("tablesize", Integer.valueOf(listMailInfo.size()));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
