package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Keeplose;
import com.lavapm.tenant.bean.search.KeeploseSearch;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;










public class KeepLoseFrame
{
  public KeepLoseFrame() {}
  
  public String getKeepLoseFrame(int newuser, List<Keeplose> listKeepLost, List<String> dvalueName, List<Integer> dvalueList, KeeploseSearch keeploseSearch)
  {
    String info = "";
    List<Integer> valueList = new ArrayList();
    
    valueList.add(Integer.valueOf(newuser));
    boolean flag = false;
    Keeplose keeplose = null;
    for (int i = 0; i < dvalueList.size(); i++) {
      flag = false;
      for (int j = 0; j < listKeepLost.size(); j++) {
        keeplose = (Keeplose)listKeepLost.get(j);
        if (((Integer)dvalueList.get(i)).intValue() == keeplose.getDvalue()) {
          flag = true;
          break;
        }
      }
      if (flag) {
        valueList.add(Integer.valueOf(keeplose.getUsernum()));
      } else {
        valueList.add(Integer.valueOf(0));
      }
    }
    String title = "";
    if (keeploseSearch.getSearchType() == 1) {
      title = Util.getTimeToStr(Util.intTotime(keeploseSearch.getStartTime()), ConstString.RDATEFRAME) + "~" + Util.getTimeToStr(Util.intTotime(keeploseSearch.getYendTime()), ConstString.RDATEFRAME) + ConstString.TITLEINFO;
    } else {
      title = Util.getTimeToStr(Util.intTotime(keeploseSearch.getStartTime()), ConstString.RDATEFRAME) + ConstString.TITLEINFO;
    }
    Map<String, Object> map = new HashMap();
    map.put("newuserCategories", dvalueName);
    map.put("newuservalue", valueList);
    map.put("title", title);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
