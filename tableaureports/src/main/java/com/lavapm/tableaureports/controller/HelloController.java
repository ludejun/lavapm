package com.lavapm.tableaureports.controller;

import com.lavapm.tableaureports.util.HttpRequest;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMethod;



@Controller
public class HelloController {
    @RequestMapping("/tableau")
    private String index(Map<String,Object> map){
        map.put("param1","点击量展示图：");
        return "index";
    }


}
