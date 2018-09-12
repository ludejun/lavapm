package com.datamarket.viewInterface.web;

import java.io.PrintStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.lang.StringUtils;
import org.springframework.core.convert.converter.Converter;

public class StringToDateConverter
  implements Converter<String, Date>
{
  private SimpleDateFormat dateFormatPattern = new SimpleDateFormat("yyyy-MM-dd");
  private SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  
  public void setDateFormatPattern(String dateFormatPattern)
  {
    this.dateFormatPattern = new SimpleDateFormat(dateFormatPattern);
  }
  
  public Date convert(String source)
  {
    if (StringUtils.isEmpty(source)) {
      return null;
    }
    Date resultDate = null;
    try
    {
      resultDate = this.dateTimeFormat.parse(source);
    }
    catch (ParseException e)
    {
      try
      {
        resultDate = this.dateFormatPattern.parse(source);
      }
      catch (ParseException e1)
      {
        e1.printStackTrace();
      }
    }
    return resultDate;
  }
  
  public static void main(String[] args)
  {
    try
    {
      StringToDateConverter converter = new StringToDateConverter();
      Date time = new Date(1481040000000L);
      System.out.printf(converter.dateTimeFormat.format(time), new Object[0]);
    }
    catch (Exception localException) {}
  }
}
