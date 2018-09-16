package com.datamarket.viewInterface.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionController
{
  private static Logger log = LoggerFactory.getLogger(GlobalExceptionController.class);
  
  @ResponseBody
  @ExceptionHandler({Exception.class})
  public void handleAllException(Exception ex)
  {
    log.error("error message:{},error stacktrace:{}", ex.getMessage(), getTrace(ex));
    
    log.error("------------------------");
  }
  
  public static String getTrace(Throwable t)
  {
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    t.printStackTrace(writer);
    StringBuffer buffer = stringWriter.getBuffer();
    return buffer.toString();
  }
}
