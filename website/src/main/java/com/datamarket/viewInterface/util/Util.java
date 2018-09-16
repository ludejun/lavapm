package com.datamarket.viewInterface.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.SimpleDateFormat;

public class Util
{
  public static final Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
  
  public static String dateUtil(long unixTime)
  {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
    return sdf.format(Long.valueOf(unixTime));
  }
  
  public static Long getDaysToNow(long unixTime)
  {
    return Long.valueOf((System.currentTimeMillis() / 1000L - unixTime) / 86400L + 1L);
  }
}
