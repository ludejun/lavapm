package com.lavapm.tenant.tool;

import org.apache.commons.lang.StringUtils;

public class BasePage
{
  private Integer page = Integer.valueOf(1);
  
  private Integer rows = Integer.valueOf(10);
  
  private String sort;
  
  private String order;
  

  public BasePage() {}
  
  private Pager pager = new Pager();
  
  public Pager getPager() {
    pager.setPageId(getPage().intValue());
    pager.setPageSize(getRows().intValue());
    String orderField = "";
    if (StringUtils.isNotBlank(sort)) {
      orderField = sort;
    }
    if ((StringUtils.isNotBlank(orderField)) && (StringUtils.isNotBlank(order))) {
      orderField = orderField + " " + order;
    }
    pager.setOrderField(orderField);
    return pager;
  }
  
  public void setPager(Pager pager) {
    this.pager = pager;
  }
  
  public Integer getPage() {
    return page;
  }
  
  public void setPage(Integer page) {
    this.page = page;
  }
  
  public Integer getRows() {
    return rows;
  }
  
  public void setRows(Integer rows) {
    this.rows = rows;
  }
  
  public String getSort() {
    return sort;
  }
  
  public void setSort(String sort) {
    this.sort = sort;
  }
  
  public String getOrder() {
    return order;
  }
  
  public void setOrder(String order) {
    this.order = order;
  }
}
