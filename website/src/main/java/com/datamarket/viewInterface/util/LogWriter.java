package com.datamarket.viewInterface.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogWriter
{
  private static final Logger adminLog = LoggerFactory.getLogger("admin");
  private static final Logger errorLog = LoggerFactory.getLogger("error");
  
  public static Logger getAdminLog()
  {
    return adminLog;
  }
  
  public static Logger getErrorLog()
  {
    return errorLog;
  }
}
