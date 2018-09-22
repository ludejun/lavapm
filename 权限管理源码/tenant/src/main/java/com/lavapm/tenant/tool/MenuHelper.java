package com.lavapm.tenant.tool;

import java.util.HashMap;
import java.util.Map;

public class MenuHelper {
	public static final String SESSIONID_NOTALLOWACCESSPAGES = "notAllowAccessPages";
	public static final String SESSIONID_ALLOWACCESSPAGES = "allowAccessPages";
	public static final int APPTYPE_NATIVE = 0;
	public static final int APPTYPE_WEB = 1;
	public static final String PAGEID_NATIVE_MANAGE;
	public static final String PAGEID_WEB_MANAGE;
	public static final String PAGEID_WEB_PAGE;
	private static final Map<String, String> MENU;
	private static final Map<String, String> PAGEMAP;

	public MenuHelper() {
	}

	public static String getMenuName(String pageId) {
		return (String) MENU.get(pageId);
	}

	public static Map<String, String> getPageMap() {
		return PAGEMAP;
	}

	public static final String PAGEID_NATIVE_PAGE = "10001,10002,10003,10004,10005,10006,10007,10008,10009,10010,10011,10012,10013,10014,10015,10016,10017,10027,10028,10029,10030";
	static {
		PAGEID_NATIVE_MANAGE = "10018,10019,10020,10021,10022,10023,10024";
		PAGEID_WEB_PAGE = "20001,20002,20003,20004,20005,20006,20007,20008,20009,20010,20017,20019,20020";
		PAGEID_WEB_MANAGE = "20011,20012,20013,20014,20015,20016";

		MENU = new HashMap<String, String>();
		MENU.put("10001", "应用概况");
		MENU.put("10002", "新增和启动");
		MENU.put("10003", "活跃分析");
		MENU.put("10004", "时段分析");
		MENU.put("10005", "版本分布");
		MENU.put("10006", "地区分布");
		MENU.put("10007", "设备机型");
		MENU.put("10008", "运营商和网络");
		MENU.put("10009", "错误报告");
		MENU.put("10010", "渠道数据");
		MENU.put("10011", "自定义留存");
		MENU.put("10012", "启动次数");
		MENU.put("10013", "使用间隔");
		MENU.put("10014", "使用时长");
		MENU.put("10015", "页面访问");
		MENU.put("10016", "路径分析");
		MENU.put("10017", "事件数据");
		MENU.put("10018", "用户分群");
		MENU.put("10019", "预警通知");
		MENU.put("10020", "里程碑管理");
		MENU.put("10021", "应用管理");
		MENU.put("10022", "版本管理");
		MENU.put("10023", "事件管理");
		MENU.put("10024", "渠道管理");
		MENU.put("10027", "用户回访");
		MENU.put("10028", "用户回流/流失");
		MENU.put("10029", "多口径统计(native)");
		MENU.put("10030", "动态有效用户");

		MENU.put("20001", "应用概况");
		MENU.put("20002", "访客分析");
		MENU.put("20003", "时段分析");
		MENU.put("20004", "地区分布");
		MENU.put("20005", "设备机型");
		MENU.put("20006", "浏览器");
		MENU.put("20007", "来源分析");
		MENU.put("20008", "页面访问");
		MENU.put("20009", "路径分析");
		MENU.put("20010", "事件数据");
		MENU.put("20011", "用户分群");
		MENU.put("20012", "预警通知");
		MENU.put("20013", "里程碑管理");
		MENU.put("20014", "Web应用管理");
		MENU.put("20015", "事件管理");
		MENU.put("20016", "来源管理");
		MENU.put("20017", "多口径统计(web)");
		MENU.put("20019", "启动次数");
		MENU.put("20020", "使用间隔");

		PAGEMAP = new HashMap();
		PAGEMAP.put("10001", "nativepage/Summarize.jsp");
		PAGEMAP.put("10002", "nativepage/ftrendstat.jsp");
		PAGEMAP.put("10003", "nativepage/ActiveAnalysis.jsp");
		PAGEMAP.put("10004", "nativepage/User_Time.jsp");
		PAGEMAP.put("10005", "nativepage/VersionInfo.jsp");
		PAGEMAP.put("10006", "nativepage/User_Country.jsp");
		PAGEMAP.put("10007", "nativepage/User_DeviceType.jsp");
		PAGEMAP.put("10008", "nativepage/IspinInfo.jsp");
		PAGEMAP.put("10009", "nativepage/User_Error.jsp");
		PAGEMAP.put("10010", "nativepage/PartnerData.jsp");
		PAGEMAP.put("10011", "nativepage/UserKeepInfo.jsp");
		PAGEMAP.put("10012", "nativepage/StartTimeInfo.jsp");
		PAGEMAP.put("10013", "nativepage/Use_Interval.jsp");
		PAGEMAP.put("10014", "nativepage/UseTimeInfo.jsp");
		PAGEMAP.put("10015", "nativepage/PageInfo.jsp");
		PAGEMAP.put("10016", "nativepage/PathAnalyze.jsp");
		PAGEMAP.put("10017", "nativepage/CustomEvent.jsp");
		PAGEMAP.put("10018", "nativepage/UserSegmentation.jsp");
		PAGEMAP.put("10019", "nativepage/WarningCenter.jsp");
		PAGEMAP.put("10020", "nativepage/Milepost.jsp");
		PAGEMAP.put("10021", "nativepage/ProductEdit.jsp");
		PAGEMAP.put("10022", "nativepage/Version_management.jsp");
		PAGEMAP.put("10023", "nativepage/EventManagement.jsp");
		PAGEMAP.put("10024", "nativepage/ChannelManagement.jsp");
		PAGEMAP.put("10027", "nativepage/UserRetainInfo.jsp");
		PAGEMAP.put("10028", "nativepage/keepLoseDistribute.jsp");
		PAGEMAP.put("10029", "nativepage/Multi_caliber_statistics.jsp");
		PAGEMAP.put("10030", "nativepage/Dynamic_effective_user.jsp");

		PAGEMAP.put("20001", "webpage/Summarize.jsp");
		PAGEMAP.put("20002", "webpage/userAnala.jsp");
		PAGEMAP.put("20003", "webpage/User_Time.jsp");
		PAGEMAP.put("20004", "webpage/User_Country.jsp");
		PAGEMAP.put("20005", "webpage/User_DeviceType.jsp");
		PAGEMAP.put("20006", "webpage/web_IEType.jsp");
		PAGEMAP.put("20007", "webpage/ComeFromAnal.jsp");
		PAGEMAP.put("20008", "webpage/PageInfo.jsp");
		PAGEMAP.put("20009", "webpage/PathAnalyze.jsp");
		PAGEMAP.put("20010", "webpage/CustomEvent.jsp");
		PAGEMAP.put("20011", "webpage/UserSegmentation.jsp");
		PAGEMAP.put("20012", "webpage/WarningCenter.jsp");
		PAGEMAP.put("20013", "webpage/Milepost.jsp");
		PAGEMAP.put("20014", "webpage/ProductEdit.jsp");
		PAGEMAP.put("20015", "webpage/EventManagement.jsp");
		PAGEMAP.put("20016", "webpage/ChannelManagement.jsp");
		PAGEMAP.put("20017", "webpage/Multi_caliber_statistics.jsp");
		PAGEMAP.put("20019", "webpage/StartTimeInfo.jsp");
		PAGEMAP.put("20020", "webpage/Use_Interval.jsp");
	}
}
