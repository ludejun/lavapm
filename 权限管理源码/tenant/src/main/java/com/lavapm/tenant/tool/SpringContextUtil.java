package com.lavapm.tenant.tool;

import java.io.File;
import java.util.Locale;
import javax.servlet.ServletContext;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;



public class SpringContextUtil
  implements ApplicationContextAware
{
  public SpringContextUtil() {}
  
  public void setApplicationContext(ApplicationContext ac)
    throws BeansException
  {
    context = ac;
  }
  
  public static <T> T getBean(String name, Class<T> clazz)
  {
    return StringUtils.isNotBlank(name) ? getApplicationContext().getBean(name, clazz) : getApplicationContext().getBean(clazz);
  }
  
  public static <T> T getBean(Class<T> clazz)
  {
    return getBean(null, clazz);
  }
  
  private static ApplicationContext context = null;
  
  public static Object getBean(String name) {
    return getApplicationContext().getBean(name);
  }
  
  protected static ApplicationContext getApplicationContext()
  {
    return context;
  }
  
  public static String getRealPath(String file) {
    ApplicationContext ac = getApplicationContext();
    
    if ((ac instanceof WebApplicationContext)) {
      WebApplicationContext wc = (WebApplicationContext)getApplicationContext();
      
      if (wc == null) {
        return file;
      }
      return wc.getServletContext().getRealPath(file);
    }
    String path = System.getProperty("user.dir");
    
    if (!path.endsWith(File.separator)) {
      path = path + File.separator;
    }
    return path + file;
  }
  
  public static String getMessage(String key, Object[] args, Locale locale) {
    return context.getMessage(key, args, locale);
  }
}
