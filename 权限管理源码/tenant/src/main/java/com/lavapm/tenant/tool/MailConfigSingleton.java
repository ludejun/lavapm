package com.lavapm.tenant.tool;

public class MailConfigSingleton
{
  private static final MailConfigSingleton Instance = new MailConfigSingleton();
  

  public static MailConfigSingleton getInstance()
  {
    return Instance;
  }
  
  private MailConfigSingleton() {}
}
