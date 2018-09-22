package com.lavapm.tenant.tool;


public class MailServiceSingleton
{
  private static final MailServiceSingleton Instance = new MailServiceSingleton();
  

  public static MailServiceSingleton getInstance()
  {
    return Instance;
  }
  
  private MailServiceSingleton() {}
}
