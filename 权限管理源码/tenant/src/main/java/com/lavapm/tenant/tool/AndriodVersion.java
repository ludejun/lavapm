package com.lavapm.tenant.tool;

public class AndriodVersion { public AndriodVersion() {}
  
  public static String getAndriodVersion(String num) { int version = 0;
    
    if ((num != null) && (!"".equals(num))) {
      if ("default".equals(num)) {
        return num;
      }
      version = Integer.parseInt(num);
    }
    
    String versionstr = "";
    switch (version) {
    case 1: 
      versionstr = "Android 1.0";
      break;
    case 2: 
      versionstr = "Android 1.1";
      break;
    case 3: 
      versionstr = "Android 1.3";
      break;
    case 4: 
      versionstr = "Android 1.6";
      break;
    case 5: 
      versionstr = "Android 2.0";
      break;
    case 6: 
      versionstr = "Android 2.0.1";
      break;
    case 7: 
      versionstr = "Android 2.1.x";
      break;
    case 8:  versionstr = "Android 2.2.x";
      break;
    case 9: 
      versionstr = "Android 2.3, 2.3.1, 2.3.2";
      break;
    case 10: 
      versionstr = "Android 2.3.3, 2.3.4";
      break;
    case 11: 
      versionstr = "Android 3.0.x";
      break;
    case 12: 
      versionstr = "Android 3.1.x";
      break;
    case 13: 
      versionstr = "Android 3.2";
      break;
    case 14: 
      versionstr = "Android 4.0, 4.0.1, 4.0.2";
      break;
    case 15: 
      versionstr = "Android 4.0.3";
      break;
    default: 
      versionstr = num;
    }
    
    return versionstr;
  }
  
  public static String getChanelInfo(String num) {
    int version = 0;
    if ((num != null) && (!"".equals(num))) {
      if ((!"0".equals(num)) && (!"1".equals(num))) {
        return num;
      }
      version = Integer.parseInt(num);
    }
    
    String channelstr = "";
    switch (version) {
    case 0: 
      channelstr = "WIFI";
      break;
    case 1: 
      channelstr = "2G/3G";
      break;
    default: 
      channelstr = "default";
    }
    
    return channelstr;
  }
}
