package com.datamarket.viewInterface.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.datamarket.viewInterface.client.RestClient;
import com.datamarket.viewInterface.client.RestClientBuilder;
import com.datamarket.viewInterface.entity.AccountEntity;
import com.datamarket.viewInterface.entity.AccountLogoutEntity;
import com.datamarket.viewInterface.entity.FileDeleteType;
import com.datamarket.viewInterface.entity.GetQuotaEntity;
import com.datamarket.viewInterface.entity.QuotaEntity;
import com.datamarket.viewInterface.entity.Request;
import com.datamarket.viewInterface.entity.Response;
import com.datamarket.viewInterface.entity.ResponseEntity;
import com.datamarket.viewInterface.entity.ServiceEntity;
import com.datamarket.viewInterface.service.CustomerService;
import com.datamarket.viewInterface.service.FileService;
import com.datamarket.viewInterface.service.Service;
import com.datamarket.viewInterface.util.Util;
import com.datamarket.viewInterface.util.serviceUtil;
import com.google.gson.Gson;

@Controller
@RequestMapping({"admin"})
public class AdminController
{
  @Resource(name="service")
  private Service service;
  @Resource
  private FileService fileService;
  @Resource
  private CustomerService customerService;
  private static Logger log = LoggerFactory.getLogger(AdminController.class);
  private RestClient restClient = RestClientBuilder.restClient();
  private Gson gson = Util.gson;
  private String urlFile = serviceUtil.getInstance().getValue("url.file");
  
  @ResponseBody
  @RequestMapping(value={"/login"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public AccountEntity login(HttpServletRequest reques, HttpServletResponse httpServletResponse, @RequestParam("userName") String userName, @RequestParam("password") String password, @RequestParam("from") String from)
    throws Exception
  {
    if ((StringUtils.isEmpty(from)) || (!from.equals("2")))
    {
      try
      {
        AccountEntity accountEntity = new AccountEntity();
        
        String tdppt = this.customerService.login(userName, password);
        if (StringUtils.isNotEmpty(tdppt))
        {
          accountEntity.setStatus(200);
          accountEntity.setMsg("OK");
          
          Map<String, Object> map = new HashMap();
          map.put("tdppt", tdppt);
          map.put("email", new String(Base64.getDecoder().decode(userName), "UTF-8"));
          map.put("login", Boolean.valueOf(true));
          accountEntity.setData(map);
          return accountEntity;
        }
      }
      catch (Exception ex)
      {
        log.error("", ex);
      }
      AccountEntity error = new AccountEntity();
      error.setStatus(Integer.valueOf(401));
      error.setMsg("The email or password error.");
      return error;
    }
    Response<AccountEntity> response = this.restClient.sendRequest(this.service.buildAdminLoginRequest(userName, password, null, from), AccountEntity.class);
    if (null != response.getData())
    {
      if ((((AccountEntity)response.getData()).getStatus().intValue() == 200) && (((Boolean)((AccountEntity)response.getData()).getData().get("login")).booleanValue() == true))
      {
        String token = (String)((AccountEntity)response.getData()).getData().get("token");
        
        AccountEntity ae = (AccountEntity)response.getData();
        ae.getData().put("email", ((AccountEntity)response.getData()).getData().get("token"));
      }
      return (AccountEntity)response.getData();
    }
    AccountEntity error = new AccountEntity();
    error.setStatus(Integer.valueOf(500));
    error.setMsg("Account Service Error,Please infor administator");
    return error;
  }
  
  @ResponseBody
  @RequestMapping(value={"/logout"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public AccountLogoutEntity logout(HttpServletRequest request, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountLogoutEntity> response = this.restClient.sendRequest(this.service.buildAdminLogoutRequest(token, from), AccountLogoutEntity.class);
    
    return (AccountLogoutEntity)response.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/getAdminEmail"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity getAdminEmail(HttpServletRequest request, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    String showEmail = this.service.getShowEmail(token, from);
    AccountEntity ae = new AccountEntity();
    Map<String, Object> map = new HashMap();
    map.put("email", showEmail);
    ae.setData(map);
    ae.setMsg("Ok");
    ae.setStatus(Integer.valueOf(200));
    return ae;
  }
  
  @ResponseBody
  @RequestMapping(value={"/regist"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity regist(HttpServletRequest request, @RequestParam("email") String email, @RequestParam(value="tel", required=false) String tel, @RequestParam(value="qq", required=false) String qq, @RequestParam(value="contacts", required=false) String contacts, @RequestParam(value="compName", required=false) String compName, @RequestParam(value="department", required=false) String department, @RequestParam(value="production", required=false) String production, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountEntity> user = this.restClient.sendRequest(this.service.buildRegistRequest(email, email, tel, qq, contacts, compName, department, production, token, from), AccountEntity.class);
    
    return (AccountEntity)user.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/getUserList"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity getUserList(HttpServletRequest request, @RequestParam(value="keyword", required=false) String keyword, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    String showEmail = this.service.getShowEmail(token, from);
    
    Response<QuotaEntity> userList = this.restClient.sendRequest(this.service.buildUserListRequest(keyword, token, from), QuotaEntity.class);
    
    JSONArray ja = ((QuotaEntity)userList.getData()).getData();
    for (int i = 0; i < ja.size(); i++)
    {
      Map<String, Object> map = (Map)ja.get(i);
      map.put("orderNum", Integer.valueOf(i + 1));
      
      Response<QuotaEntity> order = this.restClient.sendRequest(this.service.buildOrderRequest((String)map.get("email"), token, from), QuotaEntity.class);
      Map<String, Object> reUserList = this.service.getUserList((Map)ja.get(i), (QuotaEntity)order.getData());
      ja.set(i, reUserList);
    }
    AccountEntity ae = new AccountEntity();
    Map<String, Object> map = new HashMap();
    Map<String, Object> page = new HashMap();
    page.put("pageNum", Integer.valueOf(1));
    page.put("pageSize", Integer.valueOf(10));
    page.put("count", Integer.valueOf(ja.size()));
    map.put("userList", ja);
    map.put("page", page);
    map.put("email", showEmail);
    ae.setData(map);
    ae.setMsg("Ok");
    ae.setStatus(Integer.valueOf(200));
    return ae;
  }
  
  @ResponseBody
  @RequestMapping(value={"/postQuota"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity quotaPost(HttpServletRequest request, @RequestParam("serviceId") String serviceId, @RequestParam("appkey") String appkey, @RequestParam(value="requests", required=false) String requests, @RequestParam(value="records", required=false) String records, @RequestParam(value="timeallow", required=false) String timeallow, @RequestParam(value="frequency", required=false) String frequency, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildPostQuotaRequest(appkey, serviceId, requests, records, timeallow, frequency, token, from), AccountEntity.class);
    
    AccountEntity result = (AccountEntity)csr.getData();
    if (result.getStatus().intValue() == 200)
    {
      Request bindAppRequest = this.service.buildBindAppRequest(appkey, serviceId, token);
      RestClientBuilder.restClient().sendRequest(bindAppRequest, Map.class);
      log.error("BindApp: appKey={}, serviceId={}, token={}", new Object[] { appkey, serviceId, token });
    }
    return result;
  }
  
  @ResponseBody
  @RequestMapping(value={"/getQuota"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public GetQuotaEntity quotaGet(HttpServletRequest request, @RequestParam(value="serviceId", required=false) String serviceId, @RequestParam("appkey") String appkey, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<GetQuotaEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildQuotaRequest(appkey, serviceId, token, from), GetQuotaEntity.class);
    return (GetQuotaEntity)csr.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/putQuota"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity quotaPut(HttpServletRequest request, @RequestParam("serviceId") String serviceId, @RequestParam("appkey") String appkey, @RequestParam("requests") String requests, @RequestParam("timeallow") String timeallow, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildPutQuotaRequest(appkey, serviceId, requests, timeallow, token, from), AccountEntity.class);
    return (AccountEntity)csr.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/deleteQuota"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity quotaDelete(HttpServletRequest request, @RequestParam("serviceId") String serviceId, @RequestParam("appkey") String appkey, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildDeleteQuotaRequest(appkey, serviceId, token, from), AccountEntity.class);
    
    return (AccountEntity)csr.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/serviceList"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity serviceList(HttpServletRequest request, @RequestParam(value="keyWord", required=false) String keyWord, @RequestParam(value="historyType", required=false) Integer historyType, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    String showEmail = this.service.getShowEmail(token, from);
    if ((null != showEmail) && (showEmail == ""))
    {
      AccountEntity ae = new AccountEntity();
      ae.setMsg("Invalid token");
      ae.setStatus(Integer.valueOf(403));
      ae.setData(new HashMap());
      return ae;
    }
    Response<QuotaEntity> serviceList = this.restClient.sendRequest(this.service.buildAdminServicesRequest(keyWord, historyType, token, from), QuotaEntity.class);
    if (((QuotaEntity)serviceList.getData()).getStatus().intValue() != 200)
    {
      AccountEntity ae = new AccountEntity();
      ae.setStatus(((QuotaEntity)serviceList.getData()).getStatus());
      ae.setData(new HashMap());
      ae.setMsg(((QuotaEntity)serviceList.getData()).getMsg());
      return ae;
    }
    if ((null != serviceList.getData()) && (null != ((QuotaEntity)serviceList.getData()).getData()))
    {
      for (int i = 0; i < ((QuotaEntity)serviceList.getData()).getData().size(); i++) {
        this.service.modifyStatus((Map)((QuotaEntity)serviceList.getData()).getData().get(i));
      }
      return this.service.PageServiceList((QuotaEntity)serviceList.getData(), token, from, showEmail);
    }
    AccountEntity ae = new AccountEntity();
    ae.setStatus(Integer.valueOf(200));
    ae.setData(new HashMap());
    ae.setMsg("No services");
    return ae;
  }
  
  @ResponseBody
  @RequestMapping(value={"/singleService/{serviceId}"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity singleService(HttpServletRequest request, @PathVariable("serviceId") String serviceId, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    String showEmail = this.service.getShowEmail(token, from);
    if ((null != showEmail) && (showEmail == ""))
    {
      AccountEntity ae = new AccountEntity();
      ae.setMsg("Invalid token");
      ae.setStatus(403);
      ae.setData(new HashMap());
      return ae;
    }
    Response<AccountEntity> sor = RestClientBuilder.restClient().sendRequest(this.service.buildServiceOrderRequest(serviceId, token, from), AccountEntity.class);
    List appListJA = (ArrayList)((AccountEntity)sor.getData()).getData().get("appList");
    String[] appList = new String[appListJA.size()];
    for (int i = 0; i < appListJA.size(); i++) {
      appList[i] = ((String)appListJA.get(i));
    }
    List table = new ArrayList();
    for (int i = 0; i < appList.length; i++)
    {
      Response<GetQuotaEntity> quota = RestClientBuilder.restClient().sendRequest(this.service.buildQuotaRequest(appList[i], serviceId, token, from), GetQuotaEntity.class);
      if (null != ((GetQuotaEntity)quota.getData()).getData())
      {
        Map<String, Object> map = (Map)((GetQuotaEntity)quota.getData()).getData().get(0);
        double timeallow = ((Double)map.get("timeallow")).doubleValue();
        if ((timeallow != -1.0D) && (timeallow * 1000.0D < System.currentTimeMillis())) {
          map.put("status", Integer.valueOf(2));
        } else if (!((GetQuotaEntity)quota.getData()).getAccess_allow().booleanValue()) {
          map.put("status", Integer.valueOf(3));
        } else {
          map.put("status", Integer.valueOf(1));
        }
      }
      if (null != ((GetQuotaEntity)quota.getData()).getData().get(0)) {
        table.add(((GetQuotaEntity)quota.getData()).getData().get(0));
      }
    }
    Response<QuotaEntity> appkeyUser = RestClientBuilder.restClient().sendRequest(this.service.buildAppkeyUserListReport(appList, token, from), QuotaEntity.class);
    for (int i = 0; i < appList.length; i++)
    {
      List appJA = ((QuotaEntity)appkeyUser.getData()).getData();
      for (int j = 0; j < appJA.size(); j++)
      {
        Map<String, Object> appMap = (Map)appJA.get(j);
        JSONArray appJAInner = (JSONArray)appMap.get("appList");
        Map<String, Object> appListMap = (Map)appJAInner.get(0);
        if (appList[i].equals(appListMap.get("appKey")))
        {
          Map<String, Object> info = (Map)table.get(i);
          List<Map<String, Object>> appkeyList = ((QuotaEntity)appkeyUser.getData()).getData();
          info.putAll((Map)appkeyList.get(j));
          break;
        }
      }
    }
    for (int i = 0; i < table.size(); i++) {
      ((Map)table.get(i)).put("orderNum", Integer.valueOf(i + 1));
    }
    Map<String, Object> data = new HashMap();
    for (int i = 0; i < table.size(); i++)
    {
      Map<String, Object> tableMap = (Map)table.get(i);
      tableMap.put("contact", tableMap.get("contacts"));
      tableMap.put("companyName", tableMap.get("compName"));
      Long timeallow = Long.valueOf(((Double)tableMap.get("timeallow")).longValue());
      if (timeallow.longValue() > 0L) {
        tableMap.put("timeallow", timeallow);
      }
      tableMap.remove("contacts");
      tableMap.remove("compName");
    }
    data.put("table", table);
    data.put("count", Integer.valueOf(table.size()));
    data.put("pageSize", Integer.valueOf(10));
    data.put("pageNum", Integer.valueOf(2));
    data.put("email", showEmail);
    
    AccountEntity re = new AccountEntity();
    re.setMsg("Ok");
    re.setStatus(Integer.valueOf(200));
    re.setData(data);
    return re;
  }
  
  @ResponseBody
  @RequestMapping(value={"/changeStatus"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity changeStatus(HttpServletRequest request, @RequestParam("status") String status, @RequestParam("serviceId") String serviceId, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildChangeStatusRequest(serviceId, status, token, from), AccountEntity.class);
    return (AccountEntity)csr.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/addService"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public AccountEntity addService(HttpServletRequest request, @RequestParam("token") String token, @RequestParam("from") String from, @RequestParam("data") String data, @RequestParam(value="logoUrl", required=false) MultipartFile logoUrl, @RequestParam(value="request", required=false) MultipartFile requestD, @RequestParam(value="response", required=false) MultipartFile response, @RequestParam(value="status", required=false) MultipartFile status)
    throws Exception
  {
    Gson gson = new Gson();
    HashMap jsonData = (HashMap)gson.fromJson(data, HashMap.class);
    
    String jsonStr = null;
    if (logoUrl != null) {
      jsonData.put("logoUrl", this.fileService.upload(logoUrl));
    }
    if (requestD != null) {
      jsonData.put("request", this.service.requestExcel(requestD).toString());
    }
    if (response != null) {
      jsonData.put("response", this.service.responseExcel(response).toString());
    }
    if (status != null) {
      jsonData.put("statusDesc", this.service.serviceExcel(status).toString());
    }
    jsonStr = gson.toJson(jsonData);
    log.error("jsonStr : " + jsonStr);
    
    Response<AccountEntity> csr = this.restClient.sendRequest(this.service.buildAddServiceRequest(jsonStr, token, from), AccountEntity.class);
    if (null != csr.getData()) {
      return (AccountEntity)csr.getData();
    }
    AccountEntity ae = new AccountEntity();
    ae.setMsg(csr.getMessage());
    ae.setStatus(csr.getStatus());
    ae.setData(new HashMap());
    return ae;
  }
  
  @ResponseBody
  @RequestMapping(value={"/getAddService"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity getAddService(HttpServletRequest request, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<QuotaEntity> types = RestClientBuilder.restClient().sendRequest(this.service.buildServiceTypeListAdminRequest(token, from), QuotaEntity.class);
    if ((((QuotaEntity)types.getData()).getStatus().intValue() == 401) || (((QuotaEntity)types.getData()).getStatus().intValue() == 403))
    {
      AccountEntity invalidToken = new AccountEntity();
      invalidToken.setStatus(Integer.valueOf(403));
      invalidToken.setMsg("Invalid Token");
      invalidToken.setData(new HashMap());
      return invalidToken;
    }
    Response<QuotaEntity> providers = RestClientBuilder.restClient().sendRequest(this.service.buildProviderListAdminRequest(token, from), QuotaEntity.class);
    
    AccountEntity ae = new AccountEntity();
    ae.setStatus(Integer.valueOf(200));
    ae.setMsg("Ok");
    ae.setData(new HashMap());
    return this.service.serviceIntegration((QuotaEntity)types.getData(), (QuotaEntity)providers.getData(), ae);
  }
  
  @ResponseBody
  @RequestMapping(value={"/getService/{serviceId}"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity getService(HttpServletRequest request, @PathVariable("serviceId") String serviceId, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    Response<QuotaEntity> types = null;
    Response<QuotaEntity> providers = null;
    if (from.equals("2"))
    {
      types = RestClientBuilder.restClient().sendRequest(this.service.buildServiceTypeListAdminRequest(token, from), QuotaEntity.class);
      if ((((QuotaEntity)types.getData()).getStatus().intValue() == 401) || (((QuotaEntity)types.getData()).getStatus().intValue() == 403))
      {
        AccountEntity invalidToken = new AccountEntity();
        invalidToken.setStatus(Integer.valueOf(403));
        invalidToken.setMsg("Invalid Token");
        invalidToken.setData(new HashMap());
        return invalidToken;
      }
      providers = RestClientBuilder.restClient().sendRequest(this.service.buildProviderListAdminRequest(token, from), QuotaEntity.class);
    }
    String showEmail = this.service.getShowEmail(token, from);
    if ((null != showEmail) && (showEmail == ""))
    {
      AccountEntity ae = new AccountEntity();
      ae.setMsg("Invalid token");
      ae.setStatus(Integer.valueOf(403));
      ae.setData(new HashMap());
      return ae;
    }
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildSingleServicesRequest(serviceId, token, from), AccountEntity.class);
    AccountEntity oldData = (AccountEntity)csr.getData();
    if (oldData.getStatus().intValue() == 200)
    {
      Map<String, Object> map = oldData.getData();
      if (map.containsKey("logoUrl"))
      {
        String logoUrl = (String)map.get("logoUrl");
        if (StringUtils.isNotEmpty(logoUrl)) {
          map.put("logoUrl", this.urlFile + logoUrl);
        }
      }
      map.put("email", showEmail);
      if (null != types) {
        map.put("types", ((QuotaEntity)types.getData()).getData());
      }
      if (null != providers) {
        map.put("providers", ((QuotaEntity)providers.getData()).getData());
      }
      return oldData;
    }
    return oldData;
  }
  
  @ResponseBody
  @RequestMapping(value={"/modifyService/{serviceId}"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  public AccountEntity modifyService(HttpServletRequest request, @PathVariable("serviceId") String serviceId, @RequestParam("token") String token, @RequestParam("from") String from, @RequestParam("data") String data, @RequestParam(value="fileDeleteType", required=false) Integer fileDeleteType, @RequestParam(value="logoUrl", required=false) MultipartFile logoUrl, @RequestParam(value="request", required=false) MultipartFile requestD, @RequestParam(value="response", required=false) MultipartFile response, @RequestParam(value="status", required=false) MultipartFile status)
    throws Exception
  {
    Gson gson = new Gson();
    HashMap jsonData = (HashMap)gson.fromJson(data, HashMap.class);
    if (fileDeleteType != null)
    {
      if ((FileDeleteType.Request.getValue() & fileDeleteType.intValue()) == FileDeleteType.Request.getValue()) {
        jsonData.put(FileDeleteType.Request.getName(), " ");
      }
      if ((FileDeleteType.StatusDesc.getValue() & fileDeleteType.intValue()) == FileDeleteType.StatusDesc.getValue()) {
        jsonData.put(FileDeleteType.StatusDesc.getName(), " ");
      }
    }
    if (null != logoUrl) {
      jsonData.put("logoUrl", this.fileService.upload(logoUrl));
    }
    if (null != requestD) {
      jsonData.put("request", this.service.requestExcel(requestD).toString());
    }
    if (null != response) {
      jsonData.put("response", this.service.responseExcel(response).toString());
    }
    if (null != status) {
      jsonData.put("statusDesc", this.service.serviceExcel(status).toString());
    }
    log.error(gson.toJson(jsonData));
    Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildModifyServiceRequest(gson.toJson(jsonData), serviceId, token, from), AccountEntity.class);
    return (AccountEntity)csr.getData();
  }
  
  @ResponseBody
  @RequestMapping(value={"/myData/{serviceId}"}, method={org.springframework.web.bind.annotation.RequestMethod.GET})
  public AccountEntity myDataDetail(HttpServletRequest request, @PathVariable("serviceId") String serviceId, @RequestParam(value="beforeDays", required=false) Integer beforeDays, @RequestParam(value="accountId", required=false) String accountId, @RequestParam("token") String token, @RequestParam("from") String from)
  {
    String showEmail = this.service.getShowEmail(token, from);
    if ((null != showEmail) && (showEmail == ""))
    {
      AccountEntity ae = new AccountEntity();
      ae.setMsg("Invalid token");
      ae.setStatus(Integer.valueOf(403));
      ae.setData(new HashMap());
      return ae;
    }
    String email = null;
    if ((null != accountId) && (accountId != "")) {
      email = this.service.getEmailByAccountId(accountId, token, from);
    }
    if ((null != email) && (email.equals("error")))
    {
      AccountEntity ae = new AccountEntity();
      ae.setStatus(Integer.valueOf(407));
      ae.setMsg("Invalid accountId");
      ae.setData(new HashMap());
      return ae;
    }
    boolean flag = true;
    
    Response<ServiceEntity> official = RestClientBuilder.restClient().sendRequest(this.service.buildGetServiceSummaryRequest(serviceId, token, from), ServiceEntity.class);
    if ((null != official.getData()) && (null != ((ServiceEntity)official.getData()).getDatas()))
    {
      this.service.modifyStatus(((ServiceEntity)official.getData()).getDatas());
    }
    else
    {
      AccountEntity ae = new AccountEntity();
      ae.setStatus(Integer.valueOf(200));
      ae.setMsg("No Service");
      ae.setData(new HashMap());
      return ae;
    }
    Map<String, Object> headerMap = ((ServiceEntity)official.getData()).getDatas();
    
    Response<ServiceEntity> descRequest = RestClientBuilder.restClient().sendRequest(this.service.buildAdminDescRequest(serviceId, token, from), ServiceEntity.class);
    
    Response<ServiceEntity> APIRequest = RestClientBuilder.restClient().sendRequest(this.service.buildAdminInterfaceRequest(serviceId, "api", token, from), ServiceEntity.class);
    
    Response<ServiceEntity> exampleRequest = RestClientBuilder.restClient().sendRequest(this.service.buildAdminInterfaceRequest(serviceId, "example", token, from), ServiceEntity.class);
    
    Response<ServiceEntity> statusRequest = RestClientBuilder.restClient().sendRequest(this.service.buildAdminInterfaceRequest(serviceId, "status", token, from), ServiceEntity.class);
    Response<AccountEntity> response3 = null;
    if ((null != email) && (email != "")) {
      response3 = this.restClient.sendRequest(this.service.buildAppkeyRequest(email, token, from), AccountEntity.class);
    }
    AccountEntity oldReturn = null;
    if ((null != response3) && (response3.getData() != null) && (((AccountEntity)response3.getData()).getData() != null))
    {
      List appkeys = (ArrayList)((AccountEntity)response3.getData()).getData().get("appList");
      Map<String, Object> jo = (Map)appkeys.get(0);
      if ((null != email) && (email != ""))
      {
        Response<GetQuotaEntity> response4 = RestClientBuilder.restClient().sendRequest(this.service.buildQuotaRequest((String)jo.get("appKey"), serviceId, token, from), GetQuotaEntity.class);
        
        Response<ResponseEntity> reportResponse = RestClientBuilder.restClient().sendRequest(this.service.buildReportRequest(email, serviceId, null, null, token, from), ResponseEntity.class);
        Response<QuotaEntity> rrResponse = RestClientBuilder.restClient().sendRequest(this.service.buildRecentReportRequest(email, serviceId, beforeDays, token, from), QuotaEntity.class);
        Map<String, Object> simpleContent = this.service.simpleContent((ServiceEntity)descRequest.getData(), (ServiceEntity)APIRequest.getData(), 
          (ServiceEntity)exampleRequest.getData(), (ServiceEntity)statusRequest.getData(), flag);
        oldReturn = this.service.dataIntegration(headerMap, simpleContent, (GetQuotaEntity)response4.getData(), 
          (ResponseEntity)reportResponse.getData(), (QuotaEntity)rrResponse.getData(), flag);
      }
    }
    else
    {
      Map<String, Object> simpleContent = this.service.simpleContent((ServiceEntity)descRequest.getData(), (ServiceEntity)APIRequest.getData(), 
        (ServiceEntity)exampleRequest.getData(), (ServiceEntity)statusRequest.getData(), flag);
      oldReturn = this.service.dataIntegration(headerMap, simpleContent, null, null, null, flag);
    }
    AccountEntity re = this.service.changeReturnStyle(oldReturn, showEmail, Boolean.valueOf(flag));
    if ((null != email) && (email != ""))
    {
      Map<String, Object> map = re.getData();
      
      Response<AccountEntity> accountInfo = RestClientBuilder.restClient().sendRequest(this.service.buildInformationOfAccountRequest(accountId, token, from), AccountEntity.class);
      map.put("accountInfo", ((AccountEntity)accountInfo.getData()).getData());
      Map<String, Object> reSC = (Map)map.get("simpleContent");
      reSC.put("desc", new HashMap());
      reSC.put("api", new HashMap());
      reSC.put("example", new HashMap());
      reSC.put("status", new HashMap());
    }
    else
    {
      re.getData().remove("buy");
      Map<String, Object> map = (Map)re.getData().get("simpleContent");
      map.put("statistics", new HashMap());
    }
    return re;
  }
}
