package com.datamarket.viewInterface.service.impl;

import com.datamarket.viewInterface.service.CustomerService;
import com.datamarket.viewInterface.util.serviceUtil;
import java.io.PrintStream;
import java.util.Base64;
import java.util.Base64.Decoder;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl
  implements CustomerService
{
  private static Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);
  private static final String URL_LOGIN = "http://10.213.128.86:8090/api/v1/login";
  private static final String URL_LOGOUT = "http://10.213.128.86:8090/api/v1/logout?backurl=xxxx";
  private String tdaaHost = serviceUtil.getInstance().getValue("tdaa.host");
  
  public String login(String email, String password)
    throws Exception
  {
    CloseableHttpClient httpclient = HttpClients.createDefault();
    HttpPost httpPost = new HttpPost("http://10.213.128.86:8090/api/v1/login");
    httpPost.addHeader("Content-Type", "application/json;charset=UTF-8");
    
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("email", email);
    jsonObject.put("password", password);
    
    httpPost.setEntity(new StringEntity(jsonObject.toString()));
    CloseableHttpResponse response = httpclient.execute(httpPost);
    try
    {
      HttpEntity entity = response.getEntity();
      if (entity != null)
      {
        String jsonResult = EntityUtils.toString(response.getEntity(), "UTF-8");
        log.error("LoginByCustomer: email={}, password={}, result={}", new Object[] { email, password, jsonResult });
        JSONObject result = JSONObject.fromObject(jsonResult);
        return result.getString("tdppt");
      }
    }
    finally
    {
      response.close();
    }
    return null;
  }
  
  public String login(String tdppt)
    throws Exception
  {
    String url = this.tdaaHost + "/tdmkaccount/app/login?tdppt=" + tdppt;
    
    CloseableHttpClient httpclient = HttpClients.createDefault();
    HttpGet httpGet = new HttpGet(url);
    CloseableHttpResponse response = httpclient.execute(httpGet);
    try
    {
      HttpEntity entity = response.getEntity();
      if (entity != null)
      {
        String jsonResult = EntityUtils.toString(response.getEntity(), "UTF-8");
        log.error("LoginUseTdppt: tdppt={}, result={}", tdppt, jsonResult);
        JSONObject result = JSONObject.fromObject(jsonResult);
        if (result.containsKey("data"))
        {
          JSONObject data = result.getJSONObject("data");
          if ((data != null) && (data.containsKey("token"))) {
            return data.getString("token");
          }
        }
      }
    }
    finally
    {
      response.close();
    }
    return null;
  }
  
  public static void main(String[] args)
    throws Exception
  {
    System.out.println(new String(Base64.getDecoder().decode("YmluZ3hpbi5saUB0ZW5kY2xvdWQuY29t"), "UTF-8"));
  }
}
