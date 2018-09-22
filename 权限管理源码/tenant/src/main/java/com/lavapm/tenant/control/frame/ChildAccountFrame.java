package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.ChildAccount;
import com.lavapm.tenant.bean.Product;
import com.lavapm.tenant.tool.JSONUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChildAccountFrame
{
  public ChildAccountFrame() {}
  
  public String getAllDeveloperFrame(com.lavapm.tenant.bean.Developer dev, List<ChildAccount> childList)
  {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    Map<String, Object> map = new HashMap();
    if ((dev != null) && (childList != null)) {
      sbuffer.append(dev.getEmail()).append("^&").append("创建者").append("^&").append(dev.getRegistertime()).append("^&").append("--").append(",#");
      
      for (ChildAccount ca : childList) {
        sbuffer.append(ca.getEmail()).append("^&").append(ca.getAccounttype()).append("^&").append(ca.getRegistertime()).append("^&").append(ca.getChildid()).append(",#");
      }
      

      map.put("accountTable", sbuffer.substring(0, sbuffer.length() - 2).toString());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("accountTable", "");
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    return info;
  }
  
  public String getAllProductForDevFrame(List<Product> productList) {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    Map<String, Object> map = new HashMap();
    Map<String, String> productMap = new HashMap();
    if (productList != null) {
      String platform_para = null;
      for (int i = 0; i < productList.size(); i++)
      {
        if (productMap.get(((Product)productList.get(i)).getProductid() + ",^" + ((Product)productList.get(i)).getProductname()) == null) {
          productMap.put(((Product)productList.get(i)).getProductid() + ",^" + ((Product)productList.get(i)).getProductname(), ((Product)productList.get(i)).getPlatform() + "");
        } else {
          platform_para = (String)productMap.get(new StringBuilder().append(((Product)productList.get(i)).getProductid()).append(",^").append(((Product)productList.get(i)).getProductname()).toString()) + ",*" + ((Product)productList.get(i)).getPlatform();
          productMap.put(((Product)productList.get(i)).getProductid() + ",^" + ((Product)productList.get(i)).getProductname(), platform_para);
        }
      }
      
      System.err.println(productMap.toString());
      java.util.Iterator it = productMap.entrySet().iterator();
      

      while (it.hasNext()) {
        java.util.Map.Entry entry = (java.util.Map.Entry)it.next();
        String key = (String)entry.getKey();
        String value = (String)entry.getValue();
        sbuffer.append(key).append(",^").append(value).append(",#");
      }
      
      map.put("AllProductForDev", sbuffer.substring(0, sbuffer.length() - 2).toString());
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("AllProductForDev", "");
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    
    return info;
  }
  
  public String getChildAccountFrame(ChildAccount childaccount) {
    String info = "";
    Map<String, Object> map = new HashMap();
    if (childaccount != null) {
      map.put("ChildAccount", childaccount);
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    } else {
      map.put("ChildAccount", "");
      try {
        info = JSONUtils.writeValueAsString(map);
      }
      catch (JsonProcessingException e) {
        e.printStackTrace();
      }
    }
    
    return info;
  }
}
