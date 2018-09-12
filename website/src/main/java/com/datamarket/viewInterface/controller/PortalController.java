package com.datamarket.viewInterface.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PortalController
{
  @RequestMapping({"/admin.html"})
  public String admin()
  {
    return "admin";
  }
  
  @RequestMapping({"/app.html"})
  public String app()
  {
    return "app";
  }
}
