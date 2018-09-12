package com.datamarket.viewInterface.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.datamarket.viewInterface.client.RestClientBuilder;
import com.datamarket.viewInterface.controller.DatamarketController;
import com.datamarket.viewInterface.entity.AccountEntity;
import com.datamarket.viewInterface.entity.GetQuotaEntity;
import com.datamarket.viewInterface.entity.OrderEntity;
import com.datamarket.viewInterface.entity.QuotaEntity;
import com.datamarket.viewInterface.entity.Request;
import com.datamarket.viewInterface.entity.Response;
import com.datamarket.viewInterface.entity.ResponseEntity;
import com.datamarket.viewInterface.entity.ServiceEntity;
import com.datamarket.viewInterface.util.ExcelReader;
import com.datamarket.viewInterface.util.serviceUtil;

@org.springframework.stereotype.Service
public class Service {
	private static Logger log = LoggerFactory.getLogger(DatamarketController.class);
	private String tdaaHost = serviceUtil.getInstance().getValue("tdaa.host");
	private String quotaHost = serviceUtil.getInstance().getValue("quota.host");
	private String reportHost = serviceUtil.getInstance().getValue("report.host");
	private String SMHost = serviceUtil.getInstance().getValue("serviceManagement.host");
	@Resource
	private DMPService dmpService;

	public Request buildQuotaRequest(String appkey, String serviceid,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap();
		if ((null != serviceid) && (serviceid != "")) {
			queryParams.put("serviceid",Arrays.asList(new String[] { serviceid }));
		}
		queryParams.put("appkey", Arrays.asList(new String[] { appkey }));
		Request rt = new Request(this.quotaHost + "/charging/quota",queryParams, "GET", token, from);
		return rt;
	}

	public Request buildQuotaDetailRequest(String email, String serviceid,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap();
		queryParams.put("serviceid", Arrays.asList(new String[] { serviceid }));
		queryParams.put("email", Arrays.asList(new String[] { email }));
		Request rt = new Request(this.quotaHost + "/charging/detail",
				queryParams, "GET", token, from);
		return rt;
	}

	public Request buildReportRequest(String userId, String serviceId, String startTime, String endTime, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		if ((null != startTime) && (startTime != "")) {
			queryParams.put("startTime",Arrays.asList(new String[] { startTime }));
		}
		if ((null != endTime) && (endTime != "")) {
			queryParams.put("endTime", Arrays.asList(new String[] { endTime }));
		}
		queryParams.put("userId", Arrays.asList(new String[] { userId }));
		if ((null != serviceId) && (serviceId != "")) {
			queryParams.put("serviceId",Arrays.asList(new String[] { serviceId }));
		}
		Request rt = new Request(this.reportHost + "/api/myAccount/getServicesByUserId", queryParams, "GET",token, from);
		return rt;
	}

	public Request buildServicesRequest(String keyword, String owner,Double type, Integer recommend, Boolean newest, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		if ((null != keyword) && (keyword != "")) {
			queryParams.put("keyWord", Arrays.asList(new String[] { keyword }));
		}
		if ((null != owner) && (owner != "")) {
			queryParams.put("owner", Arrays.asList(new String[] { owner }));
		}
		if (null != type) {
			queryParams.put("type",	Arrays.asList(new String[] { type.toString() }));
		}
		if (null != recommend) {
			queryParams.put("recommend",Arrays.asList(new String[] { recommend.toString() }));
		}
		if (null != newest) {
			queryParams.put("newest", Arrays.asList(new String[] { Boolean.toString(newest.booleanValue()) }));
		}
		Request rt = new Request(this.SMHost + "/official/services/summary",queryParams, "GET", token, from);
		return rt;
	}

	public Request buildOrderRequest(String email, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("email", Arrays.asList(new String[] { email }));
		Request rt = new Request(this.quotaHost + "/charging/order", queryParams, "GET", token, from);
		return rt;
	}

	public AccountEntity addResponse(QuotaEntity re1,Map<String, Object> statistics, String email, String accountId,String token, String from) {
		Map<String, Object> accountInfo = new HashMap<String, Object>();
		if ((null != accountId) && (accountId != "") && (from.equals("2"))) {
			Response<AccountEntity> accountInfoAE = RestClientBuilder.restClient().sendRequest(buildInformationOfAccountRequest(accountId, token, from), AccountEntity.class);
			accountInfo = ((AccountEntity) accountInfoAE.getData()).getData();
		}
		AccountEntity se = new AccountEntity();
		se.setStatus(Integer.valueOf(200));
		se.setMsg("Ok");
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> table = new HashMap<String, Object>();
		for (int i = 0; i < re1.getData().size(); i++) {
			((JSONObject) re1.getData().get(i)).put("orderNum",Integer.valueOf(i + 1));
		}
		table.put("data", re1.getData());
		table.put("count", Integer.valueOf(re1.getData().size()));
		table.put("pageSize", Integer.valueOf(10));
		table.put("pageNum", Integer.valueOf(1));
		map.put("table", table);
		map.put("header", statistics);
		map.put("accountInfo", accountInfo);
		map.put("email", email);
		se.setData(map);
		return se;
	}

	public ServiceEntity addResponse(ServiceEntity re1, ServiceEntity re2) {
		if ((null != re2.getStatus()) && (re2.getStatus().intValue() != 200)) {
			return re2;
		}
		if ((null != re1.getStatus()) && (re1.getStatus().intValue() != 200)) {
			return re1;
		}
		ServiceEntity se = new ServiceEntity();
		se.setStatus(Integer.valueOf(200));
		se.setMsg("Ok");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("table", re1.getDatas());
		map.put("header", re2.getDatas().get(Integer.valueOf(0)));
		se.setDatas(map);
		return se;
	}

	public AccountEntity dataProduct(QuotaEntity re1, OrderEntity re2, QuotaEntity provider, QuotaEntity types, String email) {
		AccountEntity ae = new AccountEntity();
		JSONArray jsonarray = new JSONArray();
		if ((re1 != null) && (re1.getData() != null)) {
			for (int i = 0; i < re1.getData().size(); i++) {
				Map<String, String> map = (Map) re1.getData().get(i);
				map.put("buy", "0");
				List serviceId = new ArrayList();
				serviceId.add(((Map) re1.getData().get(i)).get("serviceId"));
				if (re2.getData() != null) {
					for (int j = 0; j < re2.getData().length; j++) {
						if (serviceId.get(0).equals(re2.getData()[j])) {
							map.put("buy", "1");
							break;
						}
					}
				}
				jsonarray.add(map);
			}
		}
		Map<String, Object> data = new HashMap<String, Object>();
		Map<String, Object> table = new HashMap<String, Object>();
		table.put("data", jsonarray);
		table.put("count", Integer.valueOf(jsonarray.size()));
		table.put("pageSize", Integer.valueOf(10));
		table.put("pageNum", Integer.valueOf(1));
		data.put("table", table);
		data.put("email", email);
		data.put("types", types.getData());
		data.put("owners", provider.getData());
		ae.setMsg("Ok");
		ae.setStatus(Integer.valueOf(200));
		ae.setData(data);
		return ae;
	}

	public Request buildGetAccountRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("token", Arrays.asList(new String[] { token }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getAccountInfoByToken", queryParams,	"GET", token, from);

		return rt;
	}

	public Request buildSingleServicesRequest(String serviceId, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/services/" + serviceId, queryParams, "GET", token, from);
		return rt;
	}

	public Request buildSingleServicesRequestOfOfficial(String serviceId, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/official/services/" + serviceId, queryParams, "GET", token, from);
		return rt;
	}

	public Map<String, Object> callSum(ResponseEntity re) {
		Map<String, Object> map = new HashMap<String, Object>();
		Integer sumAccessRequest = Integer.valueOf(0);
		Integer sumSuccessRequest = Integer.valueOf(0);
		Integer sumInputCount = Integer.valueOf(0);
		Integer sumOutputCount = Integer.valueOf(0);
		Integer sumValidRequestCount = Integer.valueOf(0);
		if (re.getData() != null) {
			for (int i = 0; i < re.getData().size(); i++) {
				map = (Map) re.getData().get(i);
				sumAccessRequest = Integer.valueOf(sumAccessRequest.intValue() + ((Double) map.get("accessRequest")).intValue());
				sumSuccessRequest = Integer.valueOf(sumSuccessRequest.intValue() + ((Double) map.get("successRequest")).intValue());
				sumInputCount = Integer.valueOf(sumInputCount.intValue() + ((Double) map.get("inputCount")).intValue());
				sumOutputCount = Integer.valueOf(sumOutputCount.intValue() + ((Double) map.get("oututCount")).intValue());
				if (map.containsKey("validRequest")) {
					sumValidRequestCount = Integer.valueOf(sumValidRequestCount.intValue() + ((Double) map.get("validRequest")).intValue());
				}
			}
		}
		Map<String, Object> sumData = new HashMap<String, Object>();
		sumData.put("sumAccessRequest", sumAccessRequest);
		sumData.put("sumSuccessRequest", sumSuccessRequest);
		sumData.put("sumInputCount", sumInputCount);
		sumData.put("sumOutputCount", sumOutputCount);
		sumData.put("sumValidRequest", sumValidRequestCount);
		return sumData;
	}

	public QuotaEntity replaceMapToEntity(Map<String, Object> map) {
		QuotaEntity qe = new QuotaEntity();
		qe.setMsg("Ok");
		qe.setStatus(Integer.valueOf(200));
		JSONArray json = new JSONArray();
		json.add(map);
		qe.setData(json);
		return qe;
	}

	public Request buildAppkeyRequest(String email, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("email", Arrays.asList(new String[] { email }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getAppkeys", queryParams, "GET", token, from);
		return rt;
	}

	public QuotaEntity getServiceDetail(String email, Map<String, Object> statistic, QuotaEntity service, ResponseEntity reportEntity, AccountEntity account, String token,	String from) {
		Map<String, Map<String, Object>> reportMap = new HashMap();
		if ((reportEntity != null) && (reportEntity.getData() != null)) {
			for (int i = 0; i < reportEntity.getData().size(); i++) {
				Map<String, Object> reportItem = (Map) reportEntity.getData().get(i);
				reportMap.put((String) reportItem.get("serviceId"), reportItem);
			}
		}
		Map<String, Map<String, Object>> serviceMap = new HashMap();
		if ((service != null) && (service.getData() != null)) {
			for (int i = 0; i < service.getData().size(); i++) {
				Map<String, Object> serviceItem = (Map) service.getData().get(i);
				serviceMap.put((String) serviceItem.get("serviceId"),serviceItem);
			}
		}
		Response<QuotaEntity> quotaResponse = RestClientBuilder.restClient().sendRequest(buildQuotaDetailRequest(email, null, token, from), QuotaEntity.class);
		JSONArray quotaArray = null;
		if ((quotaResponse != null) && (quotaResponse.getData() != null)) {
			quotaArray = ((QuotaEntity) quotaResponse.getData()).getData();
		}
		if (quotaArray == null) {
			quotaArray = new JSONArray();
		}
		long sumAccessRequest = 0L;
		long sumSuccessRequest = 0L;
		long sumInputCount = 0L;
		long sumOutputCount = 0L;
		long sumValidRequest = 0L;
		long sumRequests = 0L;

		JSONArray result = new JSONArray();
		for (int i = 0; i < quotaArray.size(); i++) {
			long accessRequest = 0L;
			long successRequest = 0L;
			long inputCount = 0L;
			long outputCount = 0L;
			long validRequest = 0L;

			Map<String, Object> quotaItem = (Map) quotaArray.get(i);
			String serviceId = (String) quotaItem.get("serviceid");
			quotaItem.putAll((Map) serviceMap.get(serviceId));
			Map<String, Object> reportItem = (Map) reportMap.get(serviceId);
			if (reportItem != null) {
				if (reportItem.containsKey("accessRequest")) {
					accessRequest = ((Double) reportItem.get("accessRequest")).longValue();
				}
				sumAccessRequest += accessRequest;
				if (reportItem.containsKey("successRequest")) {
					successRequest = ((Double) reportItem.get("successRequest")).longValue();
				}
				sumSuccessRequest += successRequest;
				if (reportItem.containsKey("inputCount")) {
					inputCount = ((Double) reportItem.get("inputCount")).longValue();
				}
				sumInputCount += inputCount;
				if (reportItem.containsKey("oututCount")) {
					outputCount = ((Double) reportItem.get("oututCount")).longValue();
				}
				sumOutputCount += outputCount;
				if (reportItem.containsKey("validRequest")) {
					validRequest = ((Double) reportItem.get("validRequest")).longValue();
				}
				sumValidRequest += validRequest;
			}
			if (quotaItem.containsKey("requests")) {
				sumRequests += ((Double) quotaItem.get("requests")).longValue();
			}
			quotaItem.put("accessRequest", Long.valueOf(accessRequest));
			quotaItem.put("successRequest", Long.valueOf(successRequest));
			quotaItem.put("inputCount", Long.valueOf(inputCount));
			quotaItem.put("oututCount", Long.valueOf(outputCount));
			quotaItem.put("validRequest", Long.valueOf(validRequest));
			result.add(quotaItem);
		}
		statistic.put("sumAccessRequest", Long.valueOf(sumAccessRequest));
		statistic.put("sumSuccessRequest", Long.valueOf(sumSuccessRequest));
		statistic.put("sumInputCount", Long.valueOf(sumInputCount));
		statistic.put("sumOutputCount", Long.valueOf(sumOutputCount));
		statistic.put("sumValidRequest", Long.valueOf(sumValidRequest));
		statistic.put("sumRequests", Long.valueOf(sumRequests));

		QuotaEntity reNew = new QuotaEntity();
		reNew.setMsg("Ok");
		reNew.setStatus(Integer.valueOf(200));
		reNew.setData(result);
		return reNew;
	}

	public String[] getServiceIds(OrderEntity oe) {
		return oe.getData();
	}

	public QuotaEntity calRestRequestNum(QuotaEntity re) {
		JSONArray json = re.getData();
		if (json != null) {
			for (int i = 0; i < json.size(); i++) {
				Map<String, Object> map = (Map) re.getData().get(i);
				Integer requests = (Integer) map.get("requests");
				Integer requests_used = (Integer) map.get("requests_used");
				map.put("requests_rest",Integer.valueOf(requests.intValue()	- requests_used.intValue()));
				json.add(map);
				re.setData(json);
			}
		}
		return re;
	}

	public Map<String, Object> getSingleServiceInformation(ServiceEntity official, ServiceEntity admin) {
		Map<String, Object> map = new HashMap<String, Object>();
		if ((null != official) && (null != official.getDatas())) {
			map.put("type", official.getDatas().get("types"));
		} else {
			map.put("type", null);
		}
		if ((null != official) && (official.getDatas() != null)) {
			map.putAll(official.getDatas());
		}
		return map;
	}

	public Request buildDescRequest(String serviceId, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/official/services/" + serviceId + "/description", queryParams, "GET", token, from);
		return rt;
	}

	public Request buildAdminDescRequest(String serviceId, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/services/" + serviceId	+ "/description", queryParams, "GET", token, from);
		return rt;
	}

	public Request buildInterfaceRequest(String serviceId, String filter,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("filter", Arrays.asList(new String[] { filter }));
		Request rt = new Request(this.SMHost + "/official/services/" + serviceId + "/interface", queryParams, "GET", token, from);
		return rt;
	}

	public Request buildAdminInterfaceRequest(String serviceId, String filter,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("filter", Arrays.asList(new String[] { filter }));
		Request rt = new Request(this.SMHost + "/services/" + serviceId	+ "/interface", queryParams, "GET", token, from);
		return rt;
	}

	public Request buildRecentReportRequest(String userId, String serviceId,Integer beforeDays, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("userId", Arrays.asList(new String[] { userId }));
		queryParams.put("serviceId", Arrays.asList(new String[] { serviceId }));
		if (null != beforeDays) {
			queryParams.put("beforeDays",Arrays.asList(new String[] { beforeDays.toString() }));
		}
		Request rt = new Request(this.reportHost + "/api/myAccount/getGraphData", queryParams, "GET", token, from);
		return rt;
	}

	public AccountEntity dataIntegration(Map<String, Object> headerMap,Map<String, Object> simpleContent, GetQuotaEntity quota,	ResponseEntity re, QuotaEntity rre, boolean flag) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (headerMap.size() < 2) {
			map.put("headerMap", new JSONObject());
		} else {
			map.put("headerMap", headerMap);
		}
		if (simpleContent != null) {
			if (flag) {
				Map<String, Object> map2 = new HashMap<String, Object>();
				if ((null != quota) && (null != quota.getData())) {
					map2 = (Map) quota.getData().get(0);
					Double requests = (Double) map2.get("requests");
					Double requests_used = (Double) map2.get("requests_used");
					Double requests_rest = Double.valueOf(requests.doubleValue() - requests_used.doubleValue());
					map2.put("requests_rest", requests_rest);
				}
				Map<String, Object> reportMap = new HashMap<String, Object>();
				if ((null != re) && (null != re.getData())) {
					JSONArray report = re.getData();
					if ((null != report) && (report.size() != 0)) {
						reportMap = (Map) report.get(0);
					}
				}
				JSONArray rrJA = new JSONArray();
				if ((null != rre) && (null != rre.getData())) {
					rrJA = rre.getData();
				}
				JSONArray byOrder = new JSONArray();
				for (int i = rrJA.size() - 1; i > 0; i--) {
					byOrder.add(rrJA.get(i));
				}
				Map<String, Object> statistics = new HashMap<String, Object>();
				Map<String, Object> table = new HashMap<String, Object>();
				table.put("byOrder", byOrder);
				table.put("data", rrJA);
				table.put("count", Integer.valueOf(rrJA.size()));
				table.put("pageSize", Integer.valueOf(10));
				table.put("pageNum", Integer.valueOf(1));
				map2.putAll(reportMap);
				statistics.putAll(map2);
				statistics.putAll(reportMap);
				statistics.put("table", table);
				simpleContent.put("statistics", statistics);
			} else {
				simpleContent.put("statistics", new JSONObject());
			}
		}
		map.put("simpleContent", simpleContent);

		AccountEntity se = new AccountEntity();
		se.setStatus(Integer.valueOf(200));
		se.setMsg("Ok");
		se.setData(map);
		return se;
	}

	public Map<String, Object> simpleContent(ServiceEntity desc,ServiceEntity api, ServiceEntity example, ServiceEntity status,	boolean flag) {
		Map<String, Object> simpleContent = new HashMap<String, Object>();
		simpleContent.put("desc", desc.getDatas());
		if (flag) {
			simpleContent.put("api", api.getDatas());
			simpleContent.put("example", example.getDatas());
			simpleContent.put("status", status.getDatas());
		} else {
			simpleContent.put("api", new JSONObject());
			simpleContent.put("example", new JSONObject());
			simpleContent.put("status", new JSONObject());
		}
		return simpleContent;
	}

	public Request buildAdminLoginRequest(String userName, String password,	String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("userName", Arrays.asList(new String[] { userName }));
		queryParams.put("password", Arrays.asList(new String[] { password }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/sys/login",queryParams, "GET", token, from);
		return rt;
	}

	public Request buildAdminLogoutRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("token", Arrays.asList(new String[] { token }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/sys/logout",	queryParams, "GET", token, from);
		return rt;
	}

	public Request buildUserListRequest(String keyword, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		if ((null != keyword) && (keyword != "")) {
			queryParams.put("keyword", Arrays.asList(new String[] { keyword }));
		} else {
			queryParams.put("keyword", Arrays.asList(new String[] { "" }));
		}
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getUserList", queryParams, "GET", token, from);
		return rt;
	}

	public Request buildRegistRequest(String accountName, String email,
			String tel, String qq, String contacts, String compName, String department, String production, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("accountName",Arrays.asList(new String[] { accountName }));
		queryParams.put("email", Arrays.asList(new String[] { email }));
		if ((null != tel) && (tel != "")) {
			queryParams.put("tel", Arrays.asList(new String[] { tel }));
		}
		if ((null != qq) && (qq != "")) {
			queryParams.put("qq", Arrays.asList(new String[] { qq }));
		}
		if ((null != contacts) && (contacts != "")) {
			queryParams.put("contacts",	Arrays.asList(new String[] { contacts }));
		}
		if ((null != compName) && (compName != "")) {
			queryParams.put("compName",	Arrays.asList(new String[] { compName }));
		}
		if (StringUtils.isNotEmpty(department)) {
			queryParams.put("department",Arrays.asList(new String[] { department }));
		}
		if (StringUtils.isNotEmpty(production)) {
			queryParams.put("production",Arrays.asList(new String[] { production }));
		}
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/regist",	queryParams, "POST", token, from);
		return rt;
	}

	public Request buildBindAppRequest(String appKey, String serviceId,String token) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("appKey", Arrays.asList(new String[] { appKey }));
		queryParams.put("serviceId", Arrays.asList(new String[] { serviceId }));
		queryParams.put("token", Arrays.asList(new String[] { token }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/app/bindApp",queryParams, "POST", token);
		return rt;
	}

	public Request buildInformationOfAccountRequest(String accountId,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("accountId", Arrays.asList(new String[] { accountId }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getAccountInfo", queryParams, "GET",	token, from);
		return rt;
	}

	public Request buildProviderListRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/official/providers",queryParams, "GET", token, from);
		return rt;
	}

	public Request buildProviderListAdminRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/providers", queryParams,"GET", token, from);
		return rt;
	}

	public Request buildServiceTypeListRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/official/catalog",	queryParams, "GET", token, from);
		return rt;
	}

	public Request buildServiceTypeListAdminRequest(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/catalog", queryParams, "GET",token, from);
		return rt;
	}

	public Map<String, Object> getUserList(Map<String, Object> userList, QuotaEntity order) {
		if ((null != order) && (null != order.getData()) && (order.getData().size() != 0)) {
			userList.put("serviceNum", Integer.valueOf(order.getData().size()));
		} else {
			userList.put("serviceNum", Integer.valueOf(0));
		}
		return userList;
	}

	public Request buildAdminServicesRequest(String keyword,Integer historyType, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		if ((null != keyword) && (keyword != "")) {
			queryParams.put("keyWord", Arrays.asList(new String[] { keyword }));
		}
		if (null != historyType) {
			queryParams.put("historyType",Arrays.asList(new String[] { historyType.toString() }));
		}
		Request rt = new Request(this.SMHost + "/services/summary",	queryParams, "GET", token, from);
		return rt;
	}

	public Date changeDate(Date date, int historyType) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		if (historyType == 1) {
			calendar.add(4, -1);
		} else if (historyType == 2) {
			calendar.add(2, -1);
		} else if (historyType == 3) {
			calendar.add(2, -3);
		} else if (historyType == 4) {
			calendar.add(1, -1);
		}
		date = calendar.getTime();
		return date;
	}

	public AccountEntity changeReturnStyle(AccountEntity ae, String email, Boolean flag) {
		Map<String, Object> map = ae.getData();
		Map<String, Object> simpleContent = (Map) map.get("simpleContent");

		Map<String, Object> desc = new HashMap<String, Object>();
		desc.put("name", "desc");
		desc.put("desc", simpleContent.get("desc"));

		Map<String, Object> api = new HashMap<String, Object>();
		api.put("name", "api");
		if (null != simpleContent.get("api")) {
			api.put("api", simpleContent.get("api"));
		} else {
			api.put("api", new JSONObject());
		}
		Map<String, Object> example = new HashMap<String, Object>();
		example.put("name", "example");
		if (null != simpleContent.get("example")) {
			example.put("example", simpleContent.get("example"));
		} else {
			example.put("example", new JSONObject());
		}
		Map<String, Object> status = new HashMap<String, Object>();
		status.put("name", "status");
		if (null != simpleContent.get("status")) {
			status.put("status", simpleContent.get("status"));
		} else {
			status.put("status", new JSONObject());
		}
		Map<String, Object> statistics = new HashMap<String, Object>();
		statistics.put("name", "statistics");
		if (null != simpleContent.get("statistics")) {
			statistics.put("statistics", simpleContent.get("statistics"));
		} else {
			statistics.put("statistics", new JSONObject());
		}
		Map<String, Object> returnSimpleContent = new HashMap<String, Object>();
		returnSimpleContent.put("desc", desc);
		returnSimpleContent.put("api", api);
		returnSimpleContent.put("example", example);
		returnSimpleContent.put("status", status);
		returnSimpleContent.put("statistics", statistics);

		map.put("simpleContent", returnSimpleContent);
		map.put("accountInfo", new HashMap<Object, Object>());
		map.put("email", email);
		if (flag.booleanValue()) {
			map.put("buy", Integer.valueOf(1));
		} else {
			map.put("buy", Integer.valueOf(0));
		}
		ae.setData(map);
		return ae;
	}

	public Request buildOfficialServicesOfIdsRequest(String[] serviceIds,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceId", Arrays.asList(serviceIds));
		Request rt = new Request(this.SMHost + "/official/services/specified",queryParams, "GET", token, from);
		return rt;
	}

	public Request buildServicesOfIdsRequest(String[] serviceIds, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceId", Arrays.asList(serviceIds));
		Request rt = new Request(this.SMHost + "/services/specified",queryParams, "GET", token, from);
		return rt;
	}

	public String getShowEmail(String token, String from) {
		try {
			if (from.equals("1")) {
				return this.dmpService.checkUserAuth(token);
			}
			if (from.equals("2")) {
				return this.dmpService.checkAdminAuth(token);
			}
		} catch (Exception ex) {
			log.error("", ex);
		}
		return "";
	}

	public String getEmailFromOfficial(String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("token", Arrays.asList(new String[] { token }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getAccountInfoByToken", queryParams,	"GET", token, from);

		Response<AccountEntity> reportResponse = RestClientBuilder.restClient().sendRequest(rt, AccountEntity.class);
		AccountEntity re = (AccountEntity) reportResponse.getData();
		if ((null != re.getData()) && (null != re.getData().get("email")) && (re.getData().get("email") != "")) {
			return (String) re.getData().get("email");
		}
		return "";
	}

	public String getEmailByAccountId(String accountId, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("accountId", Arrays.asList(new String[] { accountId }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/account/getAccountInfo", queryParams, "GET",	token, from);
		Response<AccountEntity> reportResponse = RestClientBuilder.restClient().sendRequest(rt, AccountEntity.class);
		AccountEntity re = (AccountEntity) reportResponse.getData();
		if ((null != re.getData()) && (null != re.getData().get("email"))) {
			return (String) re.getData().get("email");
		}
		return "error";
	}

	public Request buildServiceOrderRequest(String serviceId, String token,	String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceid", Arrays.asList(new String[] { serviceId }));
		Request rt = new Request(this.quotaHost + "/charging/serviceorder",	queryParams, "GET", token, from);
		return rt;
	}

	public Request buildSingleServiceReport(String serviceId, String email,	String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceId", Arrays.asList(new String[] { serviceId }));
		if ((null != email) && (email != "")) {
			queryParams.put("email", Arrays.asList(new String[] { email }));
		}
		Request rt = new Request(this.reportHost + "/api/service/getServices",queryParams, "GET", token, from);
		return rt;
	}

	public AccountEntity PageServiceList(QuotaEntity serviceList, String token,String from, String email) {
		JSONArray dataInner = new JSONArray();
		JSONArray serviceData = serviceList.getData();
		for (int i = 0; i < serviceData.size(); i++) {
			Map<String, Object> map = (Map) serviceData.get(i);
			String serviceId = (String) map.get("serviceId");

			Response<AccountEntity> sor = RestClientBuilder.restClient().sendRequest(buildServiceOrderRequest(serviceId, token, from),AccountEntity.class);
			if (null != ((AccountEntity) sor.getData()).getData()) {
				map.putAll(((AccountEntity) sor.getData()).getData());

				Response<QuotaEntity> reportResponse = RestClientBuilder.restClient().sendRequest(buildSingleServiceReport(serviceId, null,	token, from), QuotaEntity.class);
				if ((null != reportResponse) && (null != reportResponse.getData()) && (null != ((QuotaEntity) reportResponse.getData()).getData())
						&& (((QuotaEntity) reportResponse.getData()).getData().size() != 0)) {
					map.putAll((Map) ((QuotaEntity) reportResponse.getData()).getData().get(0));
				} else {
					map.put("serviceid", serviceId);
					map.put("accessAccountNum", Integer.valueOf(0));
					map.put("accessRequest", Integer.valueOf(0));
					map.put("successRequest", Integer.valueOf(0));
				}
				dataInner.add(map);
			}
		}
		for (int i = 0; i < dataInner.size(); i++) {
			Map<String, Object> singleData = (Map) dataInner.get(i);
			singleData.put("orderNum", Integer.valueOf(i + 1));
			singleData.put("sumAccessRequest", singleData.get("accessRequest"));
			singleData.put("sumSuccessRequest",singleData.get("successRequest"));
			singleData.remove("accessRequest");
			singleData.remove("successRequest");
			singleData.remove("serviceid");
		}
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("table", dataInner);
		data.put("count", Integer.valueOf(20));
		data.put("pageSize", Integer.valueOf(10));
		data.put("pageNum", Integer.valueOf(1));
		data.put("email", email);
		AccountEntity ae = new AccountEntity();
		ae.setMsg("Ok");
		ae.setStatus(Integer.valueOf(200));
		ae.setData(data);
		return ae;
	}

	public Request buildAppkeyUserListReport(String[] appkeys, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("appkeys", Arrays.asList(appkeys));
		Request rt = new Request(this.tdaaHost	+ "/tdmkaccount/account/getAccountListByAppKeys", queryParams,"GET", token, from);

		return rt;
	}

	public Request buildChangeStatusRequest(String serviceId, String status,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("status", Arrays.asList(new String[] { status }));
		Request rt = new Request(this.SMHost + "/services/" + serviceId	+ "/status", queryParams, "PUT", token, from);
		return rt;
	}

	public Request buildGetAppkeyRequest(String email, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("email", Arrays.asList(new String[] { email }));
		Request rt = new Request(this.tdaaHost	+ "/tdmkaccount/account/getAppkeys", queryParams, "GET", token,	from);
		return rt;
	}

	public Request buildPostQuotaRequest(String appkey, String serviceid, String requests, String records, String timeallow,String frequency, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceid", Arrays.asList(new String[] { serviceid }));
		queryParams.put("appkey", Arrays.asList(new String[] { appkey }));
		if ((null != requests) && (requests != "")) {
			queryParams.put("requests",	Arrays.asList(new String[] { requests }));
		}
		if ((null != records) && (records != "")) {
			queryParams.put("records", Arrays.asList(new String[] { records }));
		}
		if ((null != timeallow) && (timeallow != "")) {
			queryParams.put("timeallow",Arrays.asList(new String[] { timeallow }));
		}
		if ((null != frequency) && (frequency != "")) {
			queryParams.put("frequency",Arrays.asList(new String[] { frequency }));
		}
		Request rt = new Request(this.quotaHost + "/charging/quota",queryParams, "POST", token, from);
		return rt;
	}

	public Request buildPutQuotaRequest(String appkey, String serviceid,String requests, String timeallow, String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceid", Arrays.asList(new String[] { serviceid }));
		queryParams.put("appkey", Arrays.asList(new String[] { appkey }));
		queryParams.put("requests", Arrays.asList(new String[] { requests }));
		queryParams.put("timeallow", Arrays.asList(new String[] { timeallow }));
		Request rt = new Request(this.quotaHost + "/charging/quota",queryParams, "PUT", token, from);
		return rt;
	}

	public Request buildDeleteQuotaRequest(String appkey, String serviceid,	String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("serviceid", Arrays.asList(new String[] { serviceid }));
		queryParams.put("appkey", Arrays.asList(new String[] { appkey }));
		Request rt = new Request(this.quotaHost + "/charging/quota",queryParams, "DELETE", token, from);
		return rt;
	}

	public Map<String, Object> modifyStatus(Map<String, Object> map) {
		String status = map.get("status").toString();
		String runStatus = map.get("runStatus").toString();
		Integer reStatus = Integer.valueOf(0);
		if ((status.equals("10.0")) || (status.equals("20.0"))) {
			reStatus = Integer.valueOf(4);
		} else if (status.equals("50.0")) {
			reStatus = Integer.valueOf(3);
		} else if (status.equals("30.0")) {
			if (runStatus.equals("20.0")) {
				reStatus = Integer.valueOf(1);
			} else {
				reStatus = Integer.valueOf(2);
			}
		}
		map.remove("runStatus");
		map.put("status", reStatus);
		return map;
	}

	public Request buildAddServiceRequest(String json, String token, String from) {
		Request rt = new Request(this.SMHost + "/services/", json, "POST",	token, from);
		return rt;
	}

	public Request buildModifyServiceRequest(String json, String serviceId,
			String token, String from) {
		Request rt = new Request(this.SMHost + "/services/" + serviceId, json,"PUT", token, from);
		return rt;
	}

	public Request buildGetServiceDemoRequest(String serviceId, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/official/services/demo/"+ serviceId, queryParams, "GET", token, from);
		return rt;
	}

	public Request buildGetServiceSummaryRequest(String serviceId,String token, String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		Request rt = new Request(this.SMHost + "/services/" + serviceId	+ "/summary", queryParams, "GET", token, from);
		return rt;
	}

	public AccountEntity serviceIntegration(QuotaEntity types,QuotaEntity providers, AccountEntity service) {
		Map<String, Object> map = service.getData();
		map.put("types", types.getData());
		map.put("providers", providers.getData());
		return service;
	}

	public Request appkeyAthen(String appkey, String secToken, String token,String from) {
		Map<String, List<String>> queryParams = new HashMap<String, List<String>>();
		queryParams.put("apikey", Arrays.asList(new String[] { appkey }));
		queryParams.put("apitoken", Arrays.asList(new String[] { secToken }));
		Request rt = new Request(this.tdaaHost + "/tdmkaccount/app/authen",	queryParams, "GET", token, from);
		return rt;
	}

	public JSONArray requestExcel(MultipartFile file) {
		InputStream requestIS = null;
		try {
			String fileName = file.getOriginalFilename();
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			File tempFile = File.createTempFile("image"	+ UUID.randomUUID().toString(), fileExt);
			FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
			requestIS = new FileInputStream(tempFile);
			tempFile.deleteOnExit();
		} catch (IOException e) {
			e.printStackTrace();
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(408));
			ae.setMsg("Upload File failure");
			ae.setData(new HashMap<String, Object>());
		}
		ExcelReader eh = new ExcelReader(requestIS, "Sheet1");
		JSONArray ja = new JSONArray();
		for (int i = 2; i < eh.getLastRowNum().intValue() + 1; i++) {
			JSONObject row = new JSONObject();
			if (eh.getCellData(i, 1) == "") {
				break;
			}
			row.put("name", eh.getCellData(i, 1).replace("\"", "”"));
			row.put("type", eh.getCellData(i, 2).replace("\"", "”"));
			row.put("description", eh.getCellData(i, 3).replace("\"", "”"));
			row.put("mandatory", eh.getCellData(i, 4).replace("\"", "”"));
			ja.add(row);
		}
		return ja;
	}

	public static void main(String[] args) {
		File file = new File("/Users/happy/Documents/10.Talking Data/测试-金融标签查询服务/请求参数.xlsx");

		InputStream requestIS = null;
		try {
			String fileName = file.getName();
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			File tempFile = File.createTempFile("image" + UUID.randomUUID().toString(), fileExt);
			FileUtils.copyInputStreamToFile(new FileInputStream(file), tempFile);
			requestIS = new FileInputStream(tempFile);
			tempFile.deleteOnExit();
		} catch (IOException e) {
			e.printStackTrace();
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(408));
			ae.setMsg("Upload File failure");
			ae.setData(new HashMap<String, Object>());
		}
		ExcelReader eh = new ExcelReader(requestIS, "Sheet1");
		JSONArray ja = new JSONArray();
		for (int i = 2; i < eh.getLastRowNum().intValue() + 1; i++) {
			JSONObject row = new JSONObject();
			if (eh.getCellData(i, 1) == "") {
				break;
			}
			row.put("name", eh.getCellData(i, 1).replace("\"", "”"));
			row.put("type", eh.getCellData(i, 2).replace("\"", "”"));
			row.put("description", eh.getCellData(i, 3).replace("\"", "”"));
			row.put("mandatory", eh.getCellData(i, 4).replace("\"", "”"));
			ja.add(row);
		}
		System.out.println(ja.toString());
	}

	public JSONArray responseExcel(MultipartFile file) {
		InputStream requestIS = null;
		try {
			String fileName = file.getOriginalFilename();
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			File tempFile = File.createTempFile("excel" + UUID.randomUUID().toString(), fileExt);
			FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
			requestIS = new FileInputStream(tempFile);
			tempFile.deleteOnExit();
		} catch (IOException e) {
			e.printStackTrace();
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(408));
			ae.setMsg("Upload File failure");
			ae.setData(new HashMap<String, Object>());
		}
		ExcelReader eh = new ExcelReader(requestIS, "Sheet1");
		JSONArray ja = new JSONArray();
		for (int i = 2; i < eh.getLastRowNum().intValue() + 1; i++) {
			if (eh.getCellData(i, 1) == "") {
				break;
			}
			JSONObject row = new JSONObject();
			row.put("field", eh.getCellData(i, 1).replace("\"", "”"));
			row.put("type", eh.getCellData(i, 2).replace("\"", "”"));
			row.put("description", eh.getCellData(i, 3).replace("\"", "”"));
			ja.add(row);
		}
		return ja;
	}

	public JSONArray serviceExcel(MultipartFile file) {
		InputStream requestIS = null;
		try {
			String fileName = file.getOriginalFilename();
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			File tempFile = File.createTempFile("image"	+ UUID.randomUUID().toString(), fileExt);
			FileUtils.copyInputStreamToFile(file.getInputStream(), tempFile);
			requestIS = new FileInputStream(tempFile);
			tempFile.deleteOnExit();
		} catch (IOException e) {
			e.printStackTrace();
			AccountEntity ae = new AccountEntity();
			ae.setStatus(Integer.valueOf(408));
			ae.setMsg("Upload File failure");
			ae.setData(new HashMap<String, Object>());
		}
		ExcelReader eh = new ExcelReader(requestIS, "Sheet1");
		JSONArray ja = new JSONArray();
		for (int i = 2; i < eh.getLastRowNum().intValue() + 1; i++) {
			if (eh.getCellData(i, 1) == "") {
				break;
			}
			JSONObject row = new JSONObject();
			row.put("status", eh.getCellData(i, 1).replace("\"", "”"));
			row.put("description", eh.getCellData(i, 2).replace("\"", "”"));
			row.put("msg", eh.getCellData(i, 3).replace("\"", "”"));
			ja.add(row);
		}
		return ja;
	}

	public String[] getServiceIdsOfRE(ResponseEntity report) {
		JSONArray datas = report.getData();
		if ((null != datas) && (datas.size() != 0)) {
			String[] serviceIds = new String[datas.size()];
			for (int i = 0; i < datas.size(); i++) {
				Map<String, Object> map = (Map) datas.get(i);
				serviceIds[i] = ((String) map.get("serviceId"));
			}
			return serviceIds;
		}
		return null;
	}

	public String uploadImg(HttpServletRequest request, MultipartFile file) {
		String saveUrl = request.getContextPath() + "/upimg/";

		String savePath = request.getSession().getServletContext().getRealPath("")+ "/upimg/";
		savePath = savePath + "/";
		saveUrl = saveUrl + "/";
		File saveDirFile = new File(savePath);
		if (!saveDirFile.exists()) {
			saveDirFile.mkdirs();
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String ymd = sdf.format(new Date());
		savePath = savePath + ymd + "/";
		saveUrl = saveUrl + ymd + "/";

		File dirFile = new File(savePath);
		if (!dirFile.exists()) {
			dirFile.mkdirs();
		}
		log.info("savePath: " + savePath);
		log.info("saveUrl: " + saveUrl);
		String fileName = file.getOriginalFilename();

		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		String newFileName = df.format(new Date()) + "_" + new Random().nextInt(1000) + "." + fileExt;
		try {
			File uploadedFile = new File(savePath, newFileName);
			file.transferTo(uploadedFile);
		} catch (Exception e) {
			log.info(e.getMessage());
		}
		log.info(saveUrl + newFileName);
		return saveUrl + newFileName;
	}
}
