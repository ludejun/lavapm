package com.lavapm.enterprise.common.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.UUID;
import org.apache.commons.lang.StringUtils;












public class CommonUtil
{
  public CommonUtil() {}
  
  public static String transformContent(String content, Map map)
  {
    StringBuffer str = new StringBuffer();
    if ((content != null) && (!content.equals(""))) {
      String[] strs = StringUtils.split(content, "{$");
      boolean isFirst = true;
      for (String string : strs) {
        int index = StringUtils.indexOf(string, "}");
        if (isFirst) {
          str.append(string);
          isFirst = false;
        }
        if (index != -1) {
          String var = string.substring(0, index);
          str.append(map.get(var));
          String s = string.substring(index + 1);
          str.append(s);
        }
      }
    }
    return str.toString();
  }
  
  public static boolean isEmpty(String s) {
    if ((s == null) || (s.length() == 0))
      return true;
    return false;
  }
  
  public static boolean isNullOrEmpty(String s)
  {
    if ((s == null) || ("".equals(s.trim())))
      return true;
    return false;
  }
  
  public static String ldapFilterTransfer(Object obj) {
    if (obj == null)
      return "*";
    return "".equals(String.valueOf(obj).trim()) ? "*" : String.valueOf(obj).trim();
  }
  




  public static String getUUID()
  {
    return UUID.randomUUID().toString().replace("-", "").toUpperCase();
  }
  









  public static void Copy(Object source, Object dest)
    throws Exception
  {
    BeanInfo sourceBean = Introspector.getBeanInfo(source.getClass(), Object.class);
    PropertyDescriptor[] sourceProperty = sourceBean.getPropertyDescriptors();
    
    BeanInfo destBean = Introspector.getBeanInfo(dest.getClass(), Object.class);
    PropertyDescriptor[] destProperty = destBean.getPropertyDescriptors();
    try
    {
      for (int i = 0; i < sourceProperty.length; i++) {
        for (int j = 0; j < destProperty.length; j++)
        {
          if (sourceProperty[i].getName().equals(destProperty[j].getName()))
          {
            destProperty[j].getWriteMethod().invoke(dest, new Object[] { sourceProperty[i].getReadMethod().invoke(source, new Object[0]) });
            break;
          }
        }
      }
    } catch (Exception e) {
      throw new Exception("属性复制失败:" + e.getMessage());
    }
  }
}
