package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Platform;
import com.lavapm.tenant.bean.Productype;
import com.lavapm.tenant.tool.JSONUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;




public class DictionaryFrame
{
  public DictionaryFrame() {}
  
  public String initFrame(List<Platform> platformList, List<Productype> productypeList)
  {
    String info = "";
    Map<String, Object> map = new HashMap();
    map.put("platforminfo", platformList);
    map.put("productypeinfo", platformList);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
