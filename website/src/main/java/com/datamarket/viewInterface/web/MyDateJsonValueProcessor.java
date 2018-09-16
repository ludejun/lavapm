package com.datamarket.viewInterface.web;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class MyDateJsonValueProcessor
  implements JsonValueProcessor
{
  public Object processArrayValue(Object value, JsonConfig jsonConfig)
  {
    if (null == value) {
      return "";
    }
    if (((value instanceof java.util.Date)) || ((value instanceof java.sql.Date)) || ((value instanceof Timestamp)))
    {
      SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      return df.format(value);
    }
    return value.toString();
  }
  
  public Object processObjectValue(String s, Object object, JsonConfig jsonConfig)
  {
    if (null == object) {
      return "";
    }
    if (((object instanceof java.util.Date)) || ((object instanceof java.sql.Date)) || ((object instanceof Timestamp)))
    {
      SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      return df.format(object);
    }
    return object.toString();
  }
}
