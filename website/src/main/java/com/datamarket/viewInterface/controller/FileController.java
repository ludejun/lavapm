package com.datamarket.viewInterface.controller;

import com.datamarket.viewInterface.service.FileService;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping({"file"})
public class FileController
{
  private static Logger logger = LoggerFactory.getLogger(FileController.class);
  @Autowired
  private FileService fileService;
  
  @ResponseBody
  @RequestMapping(value={"/upload"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public Map<String, Object> upload(@RequestParam("file") MultipartFile file)
  {
    Map<String, Object> result = new HashMap<String, Object>();
    try
    {
      String pathUploaded = this.fileService.upload(file);
      result.put("data", pathUploaded);
      result.put("status", Integer.valueOf(200));
      result.put("msg", "OK");
      logger.info("UploadFile: result=", pathUploaded);
    }
    catch (Exception ex)
    {
      logger.error("", ex);
      result.put("status", Integer.valueOf(500));
      result.put("msg", ex.getMessage());
    }
    return result;
  }
  
  @ResponseBody
  @RequestMapping(value={"/{file:.*}"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public void upload(HttpServletResponse response, @PathVariable("file") String file)
  {
    try
    {
      this.fileService.download(response, file);
    }
    catch (Exception ex)
    {
      logger.error("", ex);
    }
  }
}
