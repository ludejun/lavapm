package com.lavapm.tenant.tool;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.PrintStream;
import java.util.List;
import java.util.Map;

public class JSONUtils
{
  public JSONUtils() {}
  
  private static ObjectMapper mapper = new ObjectMapper();
  
  public static String writeValueAsString(Object obj) throws JsonProcessingException {
    return mapper.writeValueAsString(obj);
  }
  


  public static Map<String, Object> readValueToMap(String json) throws JsonParseException, JsonMappingException, IOException { return (Map)mapper.readValue(json, Map.class); }
  
  public static List<String> readValueToList(JsonNode node) throws JsonParseException, JsonMappingException, IOException {
    com.fasterxml.jackson.databind.JavaType javaType = mapper.getTypeFactory().constructParametricType(List.class, new Class[] { String.class });
    List<String> obj = null;
    if (node.isObject()) {
      obj = (List)mapper.readValue(node.traverse(), javaType);
    } else if (node.isTextual()) {
      obj = (List)mapper.readValue(node.asText(), javaType);
    }
    return obj;
  }
  
  public static Object readValue(JsonNode node, Class<?> clazz) throws JsonParseException, JsonMappingException, IOException { Object obj = null;
    if (clazz != null) {
      if (node.isObject()) {
        obj = mapper.readValue(node.traverse(), clazz);
      } else if (node.isTextual()) {
        obj = mapper.readValue(node.asText(), clazz);
      }
    }
    
    return obj;
  }
  

  public static JsonNode readTree(String json) throws JsonProcessingException, IOException { return mapper.readTree(json); }
  
  public static JsonNode readTree(String json, int index) throws JsonProcessingException, IOException {
    JsonNode node = mapper.readTree(json);
    return node.get(index);
  }
  
  public static JsonNode readTree(String json, String index) throws JsonProcessingException, IOException { JsonNode node = mapper.readTree(json);
    return node.get(index);
  }
  
  public static Object readValueToBean(String json, Class<?> clazz) throws JsonParseException, JsonMappingException, IOException {
    return mapper.readValue(json, clazz);
  }
  
  public static void main(String[] args)
    throws JsonParseException, JsonMappingException, IOException
  {
    Map<String, String> map = new java.util.HashMap();
    map.put("id", "11");
    map.put("age", "12");
    
    String aa = writeValueAsString(map);
    System.out.println(aa);
    Map map1 = readValueToMap(aa);
    System.out.println(map.toString());
  }
}
