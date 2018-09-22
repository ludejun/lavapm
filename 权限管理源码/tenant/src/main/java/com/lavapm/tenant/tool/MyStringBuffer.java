package com.lavapm.tenant.tool;

import java.io.PrintStream;




public class MyStringBuffer
{
  private static final String splitter = " | ";
  private StringBuffer sb;
  
  public MyStringBuffer()
  {
    sb = new StringBuffer();
  }
  
  public MyStringBuffer append(String... s) {
    for (String string : s) {
      string = string.replace("\n", "\\n");
      string = string.replace("\r", "\\r");
      string = string.trim();
      sb.append(string + " | ");
    }
    return this;
  }
  
  public String toString()
  {
    return sb != null ? sb.substring(0, sb.length() - " | ".length()) : null;
  }
  
  public static void main(String[] args)
  {
    MyStringBuffer sb = new MyStringBuffer();
    String r = sb.append(new String[] { "a         ", "b", "c" }).append(new String[] { "\nd", "e" }).toString();
    System.out.println(r);
    
    Object result = null;
    System.out.println(String.valueOf(result));
  }
}
