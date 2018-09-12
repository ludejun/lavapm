package com.datamarket.viewInterface.util;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

public class MailServiceSingleton
{
  private static final MailServiceSingleton Instance = new MailServiceSingleton();
  private static PropertiesConfiguration config = null;
  
  public static MailServiceSingleton getInstance()
  {
    return Instance;
  }
  
  public String getValue(String property)
  {
    createSession();
    String value = config.getString(property);
    return value;
  }
  
  private void createSession()
  {
    try
    {
      if (config == null) {
        config = new PropertiesConfiguration("serviceHost.properties");
      }
    }
    catch (ConfigurationException e)
    {
      e.printStackTrace();
    }
  }
}
