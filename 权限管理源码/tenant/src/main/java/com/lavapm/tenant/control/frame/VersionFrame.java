package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Version;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;





public class VersionFrame
{
  public VersionFrame() {}
  
  public String getVersionSelect(List<Version> VersionList)
  {
    String info = "";
    Map<String, Object> map = new HashMap();
    map.put("Versionselet", VersionList);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  
  public String getVersionInfo(List<Version> VersionList) {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    Version versioninfo = null;
    for (int i = 0; i < VersionList.size(); i++) {
      versioninfo = (Version)VersionList.get(i);
      tmpvalue = versioninfo.getPlatformid() + "," + versioninfo.getVersionname() + "," + versioninfo.getSdkversion() + "," + Util.getTimeToStr(versioninfo.getTime()) + "," + versioninfo.getHideversion();
      



      if (i < VersionList.size() - 1) {
        sbuffer.append(tmpvalue + "^");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    Map<String, Object> map = new HashMap();
    try
    {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    map.put("versionInfo", sbuffer.toString());
    info = map.toString();
    return info;
  }
}
