package com.enterprise.common.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.log4j.Logger;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

public class DmpWebCustomDateConverter implements Converter<String, Date>
{
  private static final Logger logger = Logger.getLogger(DmpWebCustomDateConverter.class);
  private SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
  
  public Date convert(String source)
  {
    logger.debug("时间字段处理器=====" + source);
    if (StringUtils.hasText(source)) {
      try
      {
        if ((source.indexOf(":") == -1) && (source.length() == 10)) {
          return dateFormat.parse(source);
        }
        if ((source.indexOf(":") > 0) && (source.length() == 19)) {
          return datetimeFormat.parse(source);
        }
        if (source.matches("[0-9]+")) {
          return dateFormat.parse(dateFormat.format(new Date(Long.valueOf(source).longValue())));
        }
        throw new IllegalArgumentException("Could not parse date, date format is error ");
      }
      catch (ParseException ex)
      {
        IllegalArgumentException iae = new IllegalArgumentException("Could not parse date: " + ex.getMessage());
        iae.initCause(ex);
        throw iae;
      }
    }
    return null;
  }
  
  public static void main(String[] args)
  {
    String source = "1457625600000";
    Date dd = new Date(Long.valueOf(source).longValue());
    System.out.println(dd);
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println(sdf.format(dd));
  }
}
