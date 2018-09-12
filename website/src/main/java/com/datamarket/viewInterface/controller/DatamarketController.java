package com.datamarket.viewInterface.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.datamarket.viewInterface.client.RestClientBuilder;
import com.datamarket.viewInterface.entity.AccountEntity;
import com.datamarket.viewInterface.entity.AccountLogoutEntity;
import com.datamarket.viewInterface.entity.GetQuotaEntity;
import com.datamarket.viewInterface.entity.OrderEntity;
import com.datamarket.viewInterface.entity.QuotaEntity;
import com.datamarket.viewInterface.entity.Response;
import com.datamarket.viewInterface.entity.ResponseEntity;
import com.datamarket.viewInterface.entity.ServiceEntity;
import com.datamarket.viewInterface.service.CustomerService;
import com.datamarket.viewInterface.service.DMPService;
import com.datamarket.viewInterface.service.Service;
import com.datamarket.viewInterface.util.EMailSenderUtil;
import com.datamarket.viewInterface.util.MailServiceSingleton;
import com.datamarket.viewInterface.util.serviceUtil;

@Controller
@RequestMapping({ "datamarket" })
public class DatamarketController {
	private static Logger log = LoggerFactory.getLogger(DatamarketController.class);
	private String urlFile = serviceUtil.getInstance().getValue("url.file");
	@Resource(name = "service")
	private Service service;
	@Resource
	private DMPService dmpService;
	@Resource
	private CustomerService customerService;

	@ResponseBody
	@RequestMapping(value = { "/login" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public AccountEntity login(@RequestParam("userName") String userName,@RequestParam("password") String password) throws Exception {
		AccountEntity accountEntity = new AccountEntity();
		try {
			String tdppt = this.customerService.login(userName, password);
			if (StringUtils.isNotEmpty(tdppt)) {
				accountEntity.setStatus(Integer.valueOf(200));
				accountEntity.setMsg("OK");

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("tdppt", tdppt);
				map.put("email", new String(Base64.getDecoder().decode(userName), "UTF-8"));
				map.put("login", Boolean.valueOf(true));
				accountEntity.setData(map);
				return accountEntity;
			}
		} catch (Exception ex) {
			log.error("", ex);
		}
		AccountEntity error = new AccountEntity();
		error.setStatus(Integer.valueOf(401));
		error.setMsg("The email or password error.");
		return error;
	}

	@ResponseBody
	@RequestMapping(value = { "/logout" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public AccountLogoutEntity logout(@RequestParam("token") String token,	@RequestParam("from") String from) {
		Response<AccountLogoutEntity> response = RestClientBuilder.restClient().sendRequest(this.service.buildAdminLogoutRequest(token, from),	AccountLogoutEntity.class);
		return (AccountLogoutEntity) response.getData();
	}

	@ResponseBody
	@RequestMapping(value = { "/getAdminEmail" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity getAdminEmail(HttpServletRequest request,	@RequestParam("token") String token, @RequestParam("from") String from) {
		String showEmail = this.service.getShowEmail(token, from);
		AccountEntity ae = new AccountEntity();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("email", showEmail);
		ae.setData(map);
		ae.setMsg("Ok");
		ae.setStatus(Integer.valueOf(200));
		return ae;
	}

	@ResponseBody
	@RequestMapping(value = { "/dataProduct" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity dataProduct(
			HttpServletRequest request,
			@RequestParam(value = "keyWord", required = false) String keyword,
			@RequestParam(value = "accountId", required = false) String accountId,
			@RequestParam(value = "owner", required = false) String owner,
			@RequestParam(value = "recommend", required = false) Integer recommend,
			@RequestParam(value = "newest", required = false) Boolean newest,
			@RequestParam(value = "type", required = false) Double type,
			@RequestParam("token") String token,
			@RequestParam("from") String from) {
		String email = null;
		if (from.equals("1")) {
			email = token;
		} else if ((from.equals("2")) && (null != accountId) && (accountId != "")) {
			email = this.service.getEmailByAccountId(accountId, token, from);
			if (email.equals("error")) {
				AccountEntity ae = new AccountEntity();
				ae.setStatus(Integer.valueOf(407));
				ae.setMsg("No accountId");
				ae.setData(new HashMap<String, Object>());
				return ae;
			}
		}
		Response<OrderEntity> response1 = RestClientBuilder.restClient().sendRequest(this.service.buildOrderRequest(email, token, from),OrderEntity.class);

		Response<QuotaEntity> response2 = RestClientBuilder.restClient().sendRequest(this.service.buildServicesRequest(keyword, owner, type,recommend, newest, token, from),QuotaEntity.class);
		if ((response2.getStatus().intValue() == 200)
				&& (response2.getData() != null)
				&& (((QuotaEntity) response2.getData()).getData() != null)
				&& (((QuotaEntity) response2.getData()).getData().size() > 0)) {
			JSONArray serviceArray = ((QuotaEntity) response2.getData()).getData();
			for (int i = 0; i < serviceArray.size(); i++) {
				Map<String, Object> map = (Map) serviceArray.get(i);
				if (map.containsKey("logoUrl")) {
					String logoUrl = (String) map.get("logoUrl");
					if (StringUtils.isNotEmpty(logoUrl)) {
						map.put("logoUrl", this.urlFile + logoUrl);
					}
				}
			}
		}
		Response<QuotaEntity> response3 = RestClientBuilder.restClient().sendRequest(this.service.buildProviderListRequest(token, from), QuotaEntity.class);
		if (((QuotaEntity) response3.getData()).getStatus().intValue() != 200) {
			AccountEntity ae = new AccountEntity();
			ae.setStatus(((QuotaEntity) response3.getData()).getStatus());
			ae.setMsg(((QuotaEntity) response3.getData()).getMsg());
			ae.setData(new HashMap<String, Object>());
			return ae;
		}
		Response<QuotaEntity> response4 = RestClientBuilder.restClient().sendRequest(this.service.buildServiceTypeListRequest(token, from),	QuotaEntity.class);
		if (((QuotaEntity) response4.getData()).getStatus().intValue() != 200) {
			AccountEntity ae = new AccountEntity();
			ae.setStatus(((QuotaEntity) response4.getData()).getStatus());
			ae.setMsg(((QuotaEntity) response4.getData()).getMsg());
			ae.setData(new HashMap<String, Object>());
			return ae;
		}
		return this.service.dataProduct((QuotaEntity) response2.getData(),
				(OrderEntity) response1.getData(),
				(QuotaEntity) response3.getData(),
				(QuotaEntity) response4.getData(), email);
	}

	private static final Map<Integer, Integer> LATEST_DAY_MAP = new HashMap<Integer, Integer>(3);

	static {
		LATEST_DAY_MAP.put(Integer.valueOf(1), Integer.valueOf(7));
		LATEST_DAY_MAP.put(Integer.valueOf(2), Integer.valueOf(30));
		LATEST_DAY_MAP.put(Integer.valueOf(3), Integer.valueOf(90));
	}

	@ResponseBody
	@RequestMapping(value = { "/myData" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity myData(
			HttpServletRequest request,
			@RequestParam(value = "accountId", required = false) String accountId,
			@RequestParam(value = "keyWord", required = false) String keyword,
			@RequestParam(value = "historyType", required = false) Integer historyType,
			@RequestParam("token") String token,
			@RequestParam("from") String from) {
		String email = null;
		if (from.equals("1")) {
			email = token;
		} else if ((from.equals("2")) && (null != accountId) && (accountId != "")) {
			email = this.service.getEmailByAccountId(accountId, token, from);
			if (email.equals("error")) {
				AccountEntity ae = new AccountEntity();
				ae.setStatus(Integer.valueOf(407));
				ae.setMsg("No accountId");
				ae.setData(new HashMap<String, Object>());
				return ae;
			}
		}
		String[] serviceOfOrder = getOrders(token, from, email);

		Integer beforeDays = (Integer) LATEST_DAY_MAP.get(historyType);

		String endTime = null;
		String startTime = null;
		if (beforeDays != null) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar now = Calendar.getInstance();
			endTime = format.format(now.getTime());

			now.add(5, 1 - beforeDays.intValue());
			now.set(11, 0);
			now.set(12, 0);
			now.set(13, 0);
			startTime = format.format(now.getTime());
		}
		Response<ResponseEntity> statisticRes = RestClientBuilder.restClient().sendRequest(this.service.buildReportRequest(email, null, startTime,endTime, token, from), ResponseEntity.class);

		QuotaEntity o = null;
		Response<QuotaEntity> serviceRes = null;

		Response<AccountEntity> userRes = RestClientBuilder.restClient().sendRequest(this.service.buildAppkeyRequest(email, token, from),AccountEntity.class);
		if (serviceOfOrder.length > 0) {
			if (from.equals("1")) {
				serviceRes = RestClientBuilder.restClient().sendRequest(this.service.buildOfficialServicesOfIdsRequest(serviceOfOrder, token, from),QuotaEntity.class);
			} else {
				serviceRes = RestClientBuilder.restClient().sendRequest(this.service.buildServicesOfIdsRequest(serviceOfOrder, token, from), QuotaEntity.class);
			}
			if ((serviceRes == null)
					|| (serviceRes.getData() == null)
					|| (((QuotaEntity) serviceRes.getData()).getStatus().intValue() != 200)
					|| (((QuotaEntity) serviceRes.getData()).getData() == null)) {
				return getEmptyAccountEntity(410, "获取服务失败");
			}
			for (int i = 0; i < ((QuotaEntity) serviceRes.getData()).getData().size(); i++) {
				this.service.modifyStatus((Map) ((QuotaEntity) serviceRes.getData()).getData().get(i));
			}
		} else {
			serviceRes = new Response<QuotaEntity>();
		}
		Map<String, Object> statistic = new HashedMap();
		o = this.service.getServiceDetail(email, statistic,	(QuotaEntity) serviceRes.getData(),	(ResponseEntity) statisticRes.getData(),(AccountEntity) userRes.getData(), token, from);

		AccountEntity reEntity = this.service.addResponse(o, statistic, email,accountId, token, from);
		return reEntity;
	}

	private AccountEntity getEmptyAccountEntity(int status, String msg) {
		AccountEntity ae = new AccountEntity();
		ae.setStatus(Integer.valueOf(status));
		ae.setData(Collections.EMPTY_MAP);
		ae.setMsg(msg);
		return ae;
	}

	private String[] getOrders(String token, String from, String email) {
		Response<OrderEntity> ordersRes = RestClientBuilder.restClient().sendRequest(this.service.buildOrderRequest(email, token, from),OrderEntity.class);
		return ((OrderEntity) ordersRes.getData()).getData();
	}

	@ResponseBody
	@RequestMapping(value = { "/myData/{serviceId}" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity myDataDetail(
			HttpServletRequest request,
			@PathVariable("serviceId") String serviceId,
			@RequestParam(value = "beforeDays", required = false) Integer beforeDays,
			@RequestParam("token") String token,
			@RequestParam("from") String from) throws Exception {
		String email = null;
	    if (from.equals("1"))
	    {
	      email = token;
	    }
		boolean flag = false;

		Response<OrderEntity> order = RestClientBuilder.restClient().sendRequest(this.service.buildOrderRequest(email, token, from),OrderEntity.class);

		Response<ServiceEntity> official = RestClientBuilder.restClient().sendRequest(this.service.buildSingleServicesRequestOfOfficial(serviceId, token, from), ServiceEntity.class);
		if ((null != official.getData()) && (null != ((ServiceEntity) official.getData()).getDatas())) {
			this.service.modifyStatus(((ServiceEntity) official.getData()).getDatas());
		} else {
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(200));
			ae.setMsg("No Service");
			ae.setData(new HashMap<String, Object>());
			return ae;
		}
		Map<String, Object> headerMap = ((ServiceEntity) official.getData()).getDatas();

		Response<ServiceEntity> descRequest = RestClientBuilder.restClient().sendRequest(this.service.buildDescRequest(serviceId, token, from),ServiceEntity.class);
		for (int i = 0; i < ((OrderEntity) order.getData()).getData().length; i++) {
			if (((OrderEntity) order.getData()).getData()[i].equals(serviceId)) {
				flag = true;
				break;
			}
		}
		String startTime = null;
		String endTime = null;
		if (beforeDays != null) {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar now = Calendar.getInstance();
			endTime = simpleDateFormat.format(now.getTime());

			now.add(5, 1 - beforeDays.intValue());
			now.set(11, 0);
			now.set(12, 0);
			now.set(13, 0);
			startTime = simpleDateFormat.format(now.getTime());
		}
		Response<ServiceEntity> APIRequest = RestClientBuilder.restClient().sendRequest(this.service.buildInterfaceRequest(serviceId, "api",token, from), ServiceEntity.class);

		Response<ServiceEntity> exampleRequest = RestClientBuilder.restClient().sendRequest(this.service.buildInterfaceRequest(serviceId,"example", token, from), ServiceEntity.class);

		Response<ServiceEntity> statusRequest = RestClientBuilder.restClient().sendRequest(this.service.buildInterfaceRequest(serviceId, "status",token, from), ServiceEntity.class);

		Response<AccountEntity> response3 = RestClientBuilder.restClient().sendRequest(this.service.buildAppkeyRequest(email, token, from),AccountEntity.class);
		if ((response3.getData() != null) && (((AccountEntity) response3.getData()).getData() != null)) {
			List appkeys = (ArrayList) ((AccountEntity) response3.getData()).getData().get("appList");
			Map<String, Object> jo = (Map) appkeys.get(0);
			Response<GetQuotaEntity> response4 = RestClientBuilder.restClient().sendRequest(this.service.buildQuotaRequest((String) jo.get("appKey"), serviceId, token, from), GetQuotaEntity.class);
			Response<ResponseEntity> reportResponse = RestClientBuilder	.restClient().sendRequest(this.service.buildReportRequest(email, serviceId, startTime, endTime, token, from),ResponseEntity.class);
			Response<QuotaEntity> rrResponse = RestClientBuilder.restClient().sendRequest(this.service.buildRecentReportRequest(email, serviceId, beforeDays, token, from),QuotaEntity.class);
			Map<String, Object> simpleContent = this.service.simpleContent(
					(ServiceEntity) descRequest.getData(),
					(ServiceEntity) APIRequest.getData(),
					(ServiceEntity) exampleRequest.getData(),
					(ServiceEntity) statusRequest.getData(), flag);
			AccountEntity oldReturn = this.service.dataIntegration(headerMap,
					simpleContent, (GetQuotaEntity) response4.getData(),
					(ResponseEntity) reportResponse.getData(),
					(QuotaEntity) rrResponse.getData(), flag);
			AccountEntity re = this.service.changeReturnStyle(oldReturn, email,	Boolean.valueOf(flag));
			return re;
		}
		AccountEntity noAppkeys = new AccountEntity();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("email", email);
		noAppkeys.setStatus(Integer.valueOf(400));
		noAppkeys.setMsg("No Appkeys");
		noAppkeys.setData(map);
		return noAppkeys;
	}

	@ResponseBody
	@RequestMapping(value = { "/sendEmail" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public AccountEntity sendEmail(HttpServletRequest request,@RequestParam("service") String serviceD, @RequestParam("token") String token) {
		String email = token;
		Response<AccountEntity> account = RestClientBuilder.restClient().sendRequest(this.service.buildGetAccountRequest(token, "1"),AccountEntity.class);
		if ((null != email) && (email != "")) {
			String sendTo = MailServiceSingleton.getInstance().getValue("mail.service.sendto");
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("email", sendTo);
			model.put("superEmail", email);
			model.put("name", ((AccountEntity) account.getData()).getData().get("contacts"));
			model.put("company", ((AccountEntity) account.getData()).getData().get("compName"));
			model.put("tel",((AccountEntity) account.getData()).getData().get("tel"));
			model.put("service", serviceD);
			new EMailSenderUtil().sendBuyServiceEmail(model);
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(200));
			ae.setMsg("Ok");
			return ae;
		}
		AccountEntity ae = new AccountEntity();
		ae.setStatus(Integer.valueOf(403));
		ae.setMsg("Invalid Token");
		return ae;
	}

	@ResponseBody
	@RequestMapping(value = { "/account" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity getAccount(HttpServletRequest request,	@RequestParam("token") String token) {
		Response<AccountEntity> account = RestClientBuilder.restClient().sendRequest(this.service.buildGetAccountRequest(token, "1"),AccountEntity.class);
		return (AccountEntity) account.getData();
	}

	@ResponseBody
	@RequestMapping(value = { "/callDemo" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity callDemo(HttpServletRequest request,
			@RequestParam("APIKey") String APIKey,
			@RequestParam("APIToken") String APIToken,
			@RequestParam("token") String token,
			@RequestParam("from") String from) {
		Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.appkeyAthen(APIKey, APIToken, token, from),AccountEntity.class);
		return (AccountEntity) csr.getData();
	}

	@ResponseBody
	@RequestMapping(value = { "/getService/{serviceId}" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	public AccountEntity getService(HttpServletRequest request,
			@PathVariable("serviceId") String serviceId,
			@RequestParam("token") String token,
			@RequestParam("from") String from) {
		Response<AccountEntity> csr = RestClientBuilder.restClient().sendRequest(this.service.buildGetServiceDemoRequest(serviceId,token, from), AccountEntity.class);
		AccountEntity oldData = (AccountEntity) csr.getData();
		if (oldData.getStatus().intValue() == 200) {
			Map<String, Object> map = oldData.getData();
			map.put("email", token);
			return oldData;
		}
		return oldData;
	}
}
