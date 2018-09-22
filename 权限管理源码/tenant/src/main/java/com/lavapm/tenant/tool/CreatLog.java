package com.lavapm.tenant.tool;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CreatLog
{
  private static final Log errorlog = LogFactory.getLog("Error");
  
  private static final Log infoLog = LogFactory.getLog("Info");
  private static final Log debugLog = LogFactory.getLog("Debug");
  
  private static final Log dzerrorlog = LogFactory.getLog("DzError");
  
  private static final Log dzdebugLog = LogFactory.getLog("DzDebug");
  
  private static final Log EfficiencyLog = LogFactory.getLog("Efficiency");
  
  public CreatLog() {}
  
  public static void setError(String className, String functionName, String Message) { errorlog.error(className + "-->" + functionName + "-->" + Message); }
  
  public static void setDebug(String className, String functionName, String Message)
  {
    debugLog.debug(className + "-->" + functionName + "-->" + Message);
  }
  
  public static void setInfo(String className, String functionName, String Message) {
    infoLog.info(className + "-->" + functionName + "-->" + Message);
  }
  
  public static void setDzDebug(String className, String functionName, String Message)
  {
    dzdebugLog.info(className + "-->" + functionName + "-->" + Message);
  }
  
  public static void setDzError(String className, String functionName, String Message)
  {
    dzerrorlog.info(className + "-->" + functionName + "-->" + Message);
  }
  
  public static void setEfficiency(String message)
  {
    EfficiencyLog.info(message);
  }
}
