package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.CustomEventDictionary;
import com.lavapm.tenant.entity.Department;
import com.lavapm.tenant.entity.Resource;
import com.lavapm.tenant.entity.Role;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.User;
import com.lavapm.tenant.tool.JSONUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;





public class CustomEventDictionaryFrame
{
  public CustomEventDictionaryFrame() {}
  
  public String getCustomEventDictionaryFrame(List<CustomEventDictionary> cedList)
  {
    String info = "";
    
    Map<String, List<CustomEventDictionary>> map = new HashMap();
    if ((cedList != null) && (cedList.size() > 0))
    {







      map.put("customEventDictionaryList", cedList);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("customEventDictionaryList", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getRuleFrame(List<Resource> cedList)
  {
    String info = "";
    Map<String, List<Resource>> map = new HashMap();
    if ((cedList != null) && (cedList.size() > 0)) {
      map.put("ruleList", cedList);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("ruleList", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  







  public String getStopedEventFrame(List<CustomEventDictionary> cedList)
  {
    String info = "";
    
    Map<String, Object> map = new HashMap();
    if ((cedList != null) && (cedList.size() > 0))
    {






      map.put("stopedEventList", cedList);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("stopedEventList", "");
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getresourcesFrame(List<Resource> resources)
  {
    String info = "";
    
    Map<String, List<Resource>> map = new HashMap();
    if ((resources != null) && (resources.size() > 0))
    {







      map.put("resources", resources);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("resources", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getDepartmentFrame(List<Department> resources) {
    String info = "";
    
    Map<String, List<Department>> map = new HashMap();
    if ((resources != null) && (resources.size() > 0))
    {







      map.put("list", resources);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("list", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getTempletmanageFrame(List<Templetmanage> list)
  {
    String info = "";
    
    Map<String, List<Templetmanage>> map = new HashMap();
    if ((list != null) && (list.size() > 0))
    {







      map.put("list", list);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("list", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getRoleFrame(List<Role> list) { String info = "";
    
    Map<String, List<Role>> map = new HashMap();
    if ((list != null) && (list.size() > 0))
    {







      map.put("list", list);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("list", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getUserFrame(List<User> list)
  {
    String info = "";
    Map<String, List<User>> map = new HashMap();
    if ((list != null) && (list.size() > 0)) {
      map.put("list", list);
      try {
        info = JSONUtils.writeValueAsString(map);
      } catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("list", new ArrayList());
      try {
        info = JSONUtils.writeValueAsString(map);
      } catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
}
