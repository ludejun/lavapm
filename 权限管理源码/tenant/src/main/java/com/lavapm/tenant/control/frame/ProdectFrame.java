package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Product;
import com.lavapm.tenant.bean.ProductList;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.io.PrintStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.codehaus.jackson.map.ObjectMapper;















public class ProdectFrame
{
  public ProdectFrame() {}
  
  public String initProdectPlatformFrame(List<Product> listProduct, List<Product> listSessionProduct, int productid, String platformid, String sequencenumber)
  {
    String info = "";
    ObjectMapper mapper = new ObjectMapper();
    try {
      Map<String, Object> map = new HashMap();
      map.put("productList", listSessionProduct);
      map.put("platformlist", listProduct);
      map.put("productid", Integer.valueOf(productid));
      map.put("platformid", platformid);
      map.put("sequencenumber", sequencenumber);
      info = mapper.writeValueAsString(map);
    } catch (Exception e) {
      System.out.println(e);
    }
    return info;
  }
  
  public String getProductList(List<ProductList> listProduct) {
    String info = "";
    ProductList prdList = null;
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    int allSumnewuser = 0;int allOdnewuser = 0;int allOdactiveuser = 0;int allNdnewuser = 0;int allNdactiveuser = 0;
    float oavg = 0.0F;
    for (int i = 0; i < listProduct.size(); i++) {
      prdList = (ProductList)listProduct.get(i);
      tmpvalue = prdList.getProductname() + "," + prdList.getPlatformid() + "," + prdList.getSumnewuser() + "," + prdList.getNdnewuser() + " | " + prdList.getNdactiveuser() + "," + prdList.getOdnewuser() + " | " + prdList.getOdactiveuser() + "," + prdList.getProductid() + "/" + prdList.getPlatformid();
      



      allSumnewuser += prdList.getSumnewuser();
      allOdnewuser += prdList.getOdnewuser();
      allOdactiveuser += prdList.getOdactiveuser();
      allNdnewuser += prdList.getNdnewuser();
      allNdactiveuser += prdList.getNdactiveuser();
      if (i < listProduct.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    Map<String, Object> map = new HashMap();
    

    map.put("allSumnewuser", Integer.valueOf(allSumnewuser));
    map.put("allOdnewuser", Integer.valueOf(allOdnewuser));
    map.put("allOdactiveuser", Integer.valueOf(allOdactiveuser));
    map.put("allNdnewuser", Integer.valueOf(allNdnewuser));
    map.put("allNdactiveuser", Integer.valueOf(allNdactiveuser));
    oavg = Util.getPercentage(Float.valueOf(allOdactiveuser), Float.valueOf(allSumnewuser - allNdnewuser), ConstString.DECIMALFLAGTWO);
    map.put("oavg", Float.valueOf(oavg));
    map.put("tableinfo", sbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    
    return info;
  }
  




  public String getProductObj(List<Product> listProduct)
  {
    String info = "";
    String proname = "";
    String prouuid = "";
    String protype = "";
    String platforms = "";
    String productmemo = "";
    String dominUrl = "";
    int iscompensate = 0;
    int protypeid = 0;
    Product product = null;
    for (int i = 0; i < listProduct.size(); i++) {
      product = (Product)listProduct.get(i);
      if (i == 0) {
        proname = product.getProductname();
        
        productmemo = product.getProductmemo();
        protype = product.getProductypename();
        protypeid = product.getProductype();
        iscompensate = product.getIscompensate();
        dominUrl = product.getDomain();
      }
      if (i < listProduct.size() - 1) {
        prouuid = prouuid + product.getSequencenumber() + ",";
        platforms = platforms + product.getPlatformname() + ",";
      } else {
        prouuid = prouuid + product.getSequencenumber();
        platforms = platforms + product.getPlatformname();
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("proname", proname);
    map.put("prouuid", prouuid);
    map.put("protype", protype);
    map.put("productmemo", productmemo);
    map.put("platforms", platforms);
    map.put("protypeid", Integer.valueOf(protypeid));
    map.put("dominUrl", dominUrl);
    map.put("iscompensate", Integer.valueOf(iscompensate));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    
    return info;
  }
}
