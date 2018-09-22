package com.lavapm.tenant.entity;

import java.util.Date;



































































public class Product
  extends ProductKey
{
  private String sequencenumber;
  private Integer developerid;
  private Integer productype;
  private String productname;
  private String productmemo;
  private Date registertime;
  private Integer isdeleted;
  private Integer iscompensate;
  private String domain;
  private String tenantcode;
  
  public String getSequencenumber()
  {
    return sequencenumber;
  }
  


  public Product() {}
  


  public Product(String sequencenumber, Integer developerid, String productname, String productmemo)
  {
    this.sequencenumber = sequencenumber;
    this.developerid = developerid;
    this.productname = productname;
    this.productmemo = productmemo;
  }
  







  public void setSequencenumber(String sequencenumber)
  {
    this.sequencenumber = sequencenumber;
  }
  







  public Integer getDeveloperid()
  {
    return developerid;
  }
  







  public void setDeveloperid(Integer developerid)
  {
    this.developerid = developerid;
  }
  







  public Integer getProductype()
  {
    return productype;
  }
  







  public void setProductype(Integer productype)
  {
    this.productype = productype;
  }
  







  public String getProductname()
  {
    return productname;
  }
  







  public void setProductname(String productname)
  {
    this.productname = productname;
  }
  







  public String getProductmemo()
  {
    return productmemo;
  }
  







  public void setProductmemo(String productmemo)
  {
    this.productmemo = productmemo;
  }
  







  public Date getRegistertime()
  {
    return registertime;
  }
  







  public void setRegistertime(Date registertime)
  {
    this.registertime = registertime;
  }
  







  public Integer getIsdeleted()
  {
    return isdeleted;
  }
  







  public void setIsdeleted(Integer isdeleted)
  {
    this.isdeleted = isdeleted;
  }
  







  public Integer getIscompensate()
  {
    return iscompensate;
  }
  







  public void setIscompensate(Integer iscompensate)
  {
    this.iscompensate = iscompensate;
  }
  







  public String getDomain()
  {
    return domain;
  }
  







  public void setDomain(String domain)
  {
    this.domain = domain;
  }
  


  public String getTenantcode()
  {
    return tenantcode;
  }
  
  public void setTenantcode(String tenantcode) {
    this.tenantcode = tenantcode;
  }
}
