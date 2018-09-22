package com.lavapm.tenant.tool;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.SerializerProvider;

public class JacksonCustomDateSerializer extends org.codehaus.jackson.map.JsonSerializer<Date>
{
  public JacksonCustomDateSerializer() {}
  
  public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException, org.codehaus.jackson.JsonProcessingException
  {
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    String formattedDate = formatter.format(value);
    jgen.writeString(formattedDate);
  }
}
