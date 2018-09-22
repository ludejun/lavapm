package com.lavapm.tenant.tool;

import java.util.HashMap;
import java.util.Map;

public class Msg
{
  public static final String SUCCESS = "success";
  public static final String MSG = "msg";
  public static final String DATA = "data";
  
  public Msg() {}
  
  public static Map<String, Object> getSuccessData(Object data)
  {
    Map resultMap = new HashMap();
    resultMap.put("success", Boolean.valueOf(true));
    resultMap.put("data", data);
    return resultMap;
  }
  
  public static Map<String, Object> getGridData(int total, Object rows) {
    Map resultMap = new HashMap();
    resultMap.put("total", Integer.valueOf(total));
    resultMap.put("rows", rows);
    return resultMap;
  }
  

  public static Map<String, Object> getSuccessMessage(String msg)
  {
    Map resultMap = new HashMap();
    resultMap.put("success", Boolean.valueOf(true));
    resultMap.put("msg", msg);
    return resultMap;
  }
  
  public static Map<String, Object> getSuccessMessage() {
    Map resultMap = new HashMap();
    resultMap.put("success", Boolean.valueOf(true));
    return resultMap;
  }
  
  public static Map<String, Object> getFailureMessage(String msg) {
    Map resultMap = new HashMap();
    resultMap.put("success", Boolean.valueOf(false));
    resultMap.put("msg", msg);
    return resultMap;
  }
}
