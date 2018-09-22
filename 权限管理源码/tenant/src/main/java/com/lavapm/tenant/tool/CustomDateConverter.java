package com.lavapm.tenant.tool;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.log4j.Logger;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

public class CustomDateConverter
  implements Converter<String, Date>
{
  private static final Logger logger = Logger.getLogger(CustomDateConverter.class);
  
  private SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  
  private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
  
  public CustomDateConverter() {}
  
  public Date convert(String source) { logger.debug("时间字段处理器=====" + source);
    if (StringUtils.hasText(source)) {
      try {
        if ((source.indexOf(":") == -1) && (source.length() == 10))
          return dateFormat.parse(source);
        if ((source.indexOf(":") > 0) && (source.length() == 19)) {
          return datetimeFormat.parse(source);
        }
        throw new IllegalArgumentException("Could not parse date, date format is error ");
      }
      catch (ParseException ex) {
        IllegalArgumentException iae = new IllegalArgumentException("Could not parse date: " + ex.getMessage());
        iae.initCause(ex);
        throw iae;
      }
    }
    return null;
  }
}
