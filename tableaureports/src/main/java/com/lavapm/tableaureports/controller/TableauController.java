package com.lavapm.tableaureports.controller;

import com.lavapm.tableaureports.util.HttpRequest;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;

@RestController
@EnableAutoConfiguration
public class TableauController {

    @RequestMapping(value="/getTableauTicket",method = RequestMethod.GET)
    public String getTicket(HttpServletResponse response) {
     //   response.addHeader("x-frame-options","ALLOW-FROM http://101.81.88.205:8080");
        System.out.println("get ticket() !");
        //发送 POST 请求
        String sr=HttpRequest.sendPost("http://47.100.213.204:8012/trusted", "username=lavapm_tableau");
        System.out.println("get ticket() 返回值="+sr);
        return sr;
    }


}
