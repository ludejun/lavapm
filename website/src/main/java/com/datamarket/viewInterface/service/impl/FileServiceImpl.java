package com.datamarket.viewInterface.service.impl;

import com.datamarket.viewInterface.service.FileService;
import com.datamarket.viewInterface.util.serviceUtil;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl
  implements FileService
{
  private String urlFileUpload = serviceUtil.getInstance().getValue("url.file.upload");
  private String fileServerLocalPath = serviceUtil.getInstance().getValue("file.server.local.path");
  
  public String upload(MultipartFile source)
    throws IOException
  {
    if (!isFileServer()) {
      return uploadRemoteFile(source);
    }
    File home = new File(this.fileServerLocalPath);
    if (!home.exists()) {
      FileUtils.forceMkdir(home);
    }
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    String today = simpleDateFormat.format(new Date());
    String fileName = today + ".file";
    
    File file = new File(home, fileName);
    FileUtils.copyInputStreamToFile(source.getInputStream(), file);
    
    return fileName;
  }
  
  public void download(HttpServletResponse response, String path)
    throws IOException
  {
    if (!isFileServer())
    {
      downloadRemote(response, path);
      return;
    }
    FileInputStream is = new FileInputStream(this.fileServerLocalPath + path);
    try
    {
      response.setContentType("image/jpeg");
      IOUtils.copy(is, response.getOutputStream());
    }
    finally
    {
      IOUtils.closeQuietly(is);
    }
  }
  
  private void downloadRemote(HttpServletResponse response, String path)
    throws IOException
  {
    CloseableHttpClient httpclient = HttpClients.createDefault();
    HttpGet httpget = new HttpGet(this.urlFileUpload + path);
    CloseableHttpResponse removeResponse = httpclient.execute(httpget);
    try
    {
      HttpEntity entity = removeResponse.getEntity();
      if (entity != null) {
        IOUtils.copy(entity.getContent(), response.getOutputStream());
      }
    }
    finally
    {
      removeResponse.close();
    }
  }
  
  private String uploadRemoteFile(MultipartFile source)
    throws IOException
  {
    File temp = File.createTempFile("tempFile", ".tmp");
    FileUtils.copyInputStreamToFile(source.getInputStream(), temp);
    
    CloseableHttpClient httpclient = HttpClients.createDefault();
    
    String fileName = null;
    try
    {
      HttpPost httppost = new HttpPost(this.urlFileUpload);
      
      HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("file", new FileBody(temp)).build();
      
      httppost.setEntity(reqEntity);
      CloseableHttpResponse response = httpclient.execute(httppost);
      try
      {
        HttpEntity resEntity = response.getEntity();
        if (resEntity != null)
        {
          String str1 = EntityUtils.toString(response.getEntity(), "UTF-8");
          
          response.close();
          
          return str1;
        }
      }
      finally
      {
        response.close();
      }
    }
    finally
    {
      httpclient.close();
    }
    return fileName;
  }
  
  private boolean isFileServer()
  {
    try
    {
      if (this.urlFileUpload.contains(InetAddress.getLocalHost().getHostAddress())) {
        return true;
      }
    }
    catch (Exception localException) {}
    try
    {
      Enumeration<NetworkInterface> n = NetworkInterface.getNetworkInterfaces();
      while (n.hasMoreElements())
      {
        NetworkInterface e = (NetworkInterface)n.nextElement();
        
        Enumeration<InetAddress> a = e.getInetAddresses();
        while (a.hasMoreElements())
        {
          InetAddress addr = (InetAddress)a.nextElement();
          if (this.urlFileUpload.contains(addr.getHostAddress())) {
            return true;
          }
        }
      }
    }
    catch (Exception localException1) {}
    return false;
  }
}
