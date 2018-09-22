package com.lavapm.tenant.tool;

import com.tenddata.dictservice.service.DictService;
import com.tenddata.dictservice.service.DictService.ServiceName;
import com.tenddata.dictservice.service.impl.ReadService;
import java.io.File;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.UUID;

public class Util {
	private static HashMap<String, String> countryMap = null;
	private static HashMap<String, String> ispMap = null;
	private static HashMap<String, String> deviceTypeMap = null;
	private static HashMap<String, String> transDeviceTypeMap = null;
	public static HashMap<String, String> URIMap = null;

	static {
		if (URIMap == null) {
			URIMap = new HashMap();
			URIMap.put("login.jsp", "login.jsp");
			URIMap.put("RegisteInfo.jsp", "RegisteInfo.jsp");
			URIMap.put("UserLoginServlet", "UserLoginServlet");
			URIMap.put("VerifyCodeServlet", "VerifyCodeServlet");
			URIMap.put("ResultServlet", "ResultServlet");
			URIMap.put("RegisteServlet", "RegisteServlet");
			URIMap.put("SendMailServlet", "SendMailServlet");
			URIMap.put("ChangePasswdServlet", "ChangePasswdServlet");
			URIMap.put("TestServlet", "TestServlet");
			URIMap.put("SdkDownloadServlet", "SdkDownloadServlet");
			URIMap.put("ChangeLaServlet", "ChangeLaServlet");
			URIMap.put("setpassword.jsp", "setpassword.jsp");
			URIMap.put("ChildAccountServlet", "ChildAccountServlet");
		}
		if (transDeviceTypeMap == null) {
			transDeviceTypeMap = new HashMap();
			transDeviceTypeMap.put("Simulator_i386", "i386");
			transDeviceTypeMap.put("Simulator_86", "86");
			transDeviceTypeMap.put("Simulator_x86_64", "x86_64");
			transDeviceTypeMap.put("iPhone 1G", "iPhone1_1");
			transDeviceTypeMap.put("iPhone 3G", "iPhone1_2");
			transDeviceTypeMap.put("iPhone 3GS", "iPhone2_1");
			transDeviceTypeMap.put("iPhone 4 - AT&T", "iPhone3_1");
			transDeviceTypeMap.put("iPhone 4 - Other carrier", "iPhone3_2");
			transDeviceTypeMap.put("iPhone 4 - Other carrier", "iPhone3_3");
			transDeviceTypeMap.put("iPhone 4S", "iPhone4_1");
			transDeviceTypeMap.put("iPod Touch 1G", "iPod1_1");
			transDeviceTypeMap.put("iPod Touch 2G", "iPod2_1");
			transDeviceTypeMap.put("iPod Touch 3G", "iPod3_1");
			transDeviceTypeMap.put("iPod Touch 4G", "iPod4_1");
			transDeviceTypeMap.put("iPad Wifi", "iPad1_1");
			transDeviceTypeMap.put("iPad 3G", "iPad1_2");
			transDeviceTypeMap.put("iPad 2 (WiFi)", "iPad2_1");
			transDeviceTypeMap.put("iPad 2 (GSM)", "iPad2_2");
			transDeviceTypeMap.put("iPad 2 (CDMA)", "iPad2_3");
			transDeviceTypeMap.put("iPad 3 (WiFi)", "iPad3_1");
			transDeviceTypeMap.put("iPad 3 (GSM)", "iPad3_2");
			transDeviceTypeMap.put("iPad 3 (CDMA)", "iPad3_3");
		}
		if (deviceTypeMap == null) {
			deviceTypeMap = new HashMap();
			deviceTypeMap.put("i386", "Simulator_i386");
			deviceTypeMap.put("86", "Simulator_86");
			deviceTypeMap.put("x86_64", "Simulator_x86_64");
			deviceTypeMap.put("iPhone1_1", "iPhone 1G");
			deviceTypeMap.put("iPhone1_2", "iPhone 3G");
			deviceTypeMap.put("iPhone2_1", "iPhone 3GS");
			deviceTypeMap.put("iPhone3_1", "iPhone 4 - AT&T");
			deviceTypeMap.put("iPhone3_2", "iPhone 4 - Other carrier");
			deviceTypeMap.put("iPhone3_3", "iPhone 4 - Other carrier");
			deviceTypeMap.put("iPhone4_1", "iPhone 4S");
			deviceTypeMap.put("iPod1_1", "iPod Touch 1G");
			deviceTypeMap.put("iPod2_1", "iPod Touch 2G");
			deviceTypeMap.put("iPod3_1", "iPod Touch 3G");
			deviceTypeMap.put("iPod4_1", "iPod Touch 4G");
			deviceTypeMap.put("iPad1_1", "iPad Wifi");
			deviceTypeMap.put("iPad1_2", "iPad 3G");
			deviceTypeMap.put("iPad2_1", "iPad 2 (WiFi)");
			deviceTypeMap.put("iPad2_2", "iPad 2 (GSM)");
			deviceTypeMap.put("iPad2_3", "iPad 2 (CDMA)");
			deviceTypeMap.put("iPad3_1", "iPad 3 (WiFi)");
			deviceTypeMap.put("iPad3_2", "iPad 3 (GSM)");
			deviceTypeMap.put("iPad3_3", "iPad 3 (CDMA)");
		}
		if (ispMap == null) {
			ispMap = new HashMap();
			ispMap.put("1189", "1121");
			ispMap.put("1188", "1121");
			ispMap.put("1716", "1121");
			ispMap.put("1239", "1121");
			ispMap.put("1281", "1121");
			ispMap.put("1385", "1121");
			ispMap.put("1567", "1121");
			ispMap.put("1871", "1121");
			ispMap.put("2737", "1121");
			ispMap.put("3304", "1121");
			ispMap.put("1191", "1121");
			ispMap.put("2066", "1121");
			ispMap.put("2348", "1121");
			ispMap.put("2469", "1121");
			ispMap.put("1188", "1121");
			ispMap.put("1714", "1121");
			ispMap.put("1713", "1121");
			ispMap.put("1139", "1121");
			ispMap.put("1834", "1121");
			ispMap.put("1349", "1121");
			ispMap.put("1146", "1121");
			ispMap.put("2707", "1121");
			ispMap.put("1250", "1121");
			ispMap.put("1275", "1121");
			ispMap.put("1295", "1121");
			ispMap.put("1329", "1121");
			ispMap.put("1275", "1121");
			ispMap.put("1337", "1121");
			ispMap.put("1384", "1121");
			ispMap.put("1492", "1121");
			ispMap.put("1625", "1121");
			ispMap.put("1630", "1121");
			ispMap.put("2270", "1121");
			ispMap.put("2291", "1121");
			ispMap.put("2538", "1121");
			ispMap.put("2664", "1121");
			ispMap.put("1418", "1121");
			ispMap.put("1693", "1121");
			ispMap.put("2268", "1121");
			ispMap.put("2268", "1121");
			ispMap.put("1283", "1121");
			ispMap.put("1286", "1121");
			ispMap.put("1135", "1121");
			ispMap.put("1869", "1121");
			ispMap.put("2505", "1121");
			ispMap.put("1121", "1121");
			ispMap.put("1248", "1185");
			ispMap.put("1336", "1185");
			ispMap.put("1458", "1185");
			ispMap.put("2239", "1185");
			ispMap.put("2486", "1185");
			ispMap.put("2622", "1185");
			ispMap.put("2644", "1185");
			ispMap.put("2667", "1185");
			ispMap.put("2956", "1185");
			ispMap.put("3020", "1185");
			ispMap.put("1138", "1185");
			ispMap.put("1555", "1185");
			ispMap.put("1740", "1185");
			ispMap.put("1133", "1185");
			ispMap.put("1723", "1185");
			ispMap.put("1145", "1185");
			ispMap.put("2115", "1185");
			ispMap.put("1158", "1185");
			ispMap.put("1170", "1185");
			ispMap.put("1722", "1185");
			ispMap.put("1803", "1185");
			ispMap.put("1265", "1185");
			ispMap.put("1273", "1185");
			ispMap.put("1732", "1185");
			ispMap.put("1564", "1185");
			ispMap.put("1564", "1185");
			ispMap.put("1356", "1185");
			ispMap.put("2331", "1185");
			ispMap.put("1190", "1185");
			ispMap.put("1655", "1185");
			ispMap.put("1185", "1185");
			ispMap.put("3176", "1187");
			ispMap.put("2965", "1187");
			ispMap.put("2928", "1187");
			ispMap.put("2925", "1187");
			ispMap.put("2770", "1187");
			ispMap.put("2498", "1187");
			ispMap.put("1143", "1187");
			ispMap.put("1449", "1187");
			ispMap.put("1691", "1187");
			ispMap.put("1695", "1187");
			ispMap.put("1864", "1187");
			ispMap.put("2247", "1187");
			ispMap.put("2463", "1187");
			ispMap.put("2564", "1187");
			ispMap.put("1715", "1187");
			ispMap.put("1143", "1187");
			ispMap.put("1326", "1187");
			ispMap.put("1150", "1187");
			ispMap.put("1144", "1187");
			ispMap.put("1779", "1187");
			ispMap.put("1154", "1187");
			ispMap.put("1178", "1187");
			ispMap.put("2064", "1187");
			ispMap.put("1727", "1187");
			ispMap.put("1187", "1187");
			ispMap.put("1225", "1235");
			ispMap.put("1397", "1235");
			ispMap.put("1894", "1235");
			ispMap.put("1162", "1235");
			ispMap.put("1171", "1235");
			ispMap.put("1194", "1235");
			ispMap.put("1236", "1235");
			ispMap.put("1419", "1235");
			ispMap.put("1607", "1235");
			ispMap.put("1235", "1235");
			ispMap.put("2962", "1452");
			ispMap.put("1519", "1452");
			ispMap.put("1222", "1452");

			ispMap.put("1152", "1196");
			ispMap.put("1196", "1196");
			ispMap.put("1712", "1196");
			ispMap.put("1749", "1196");
			ispMap.put("1797", "1196");
			ispMap.put("2192", "1196");
			ispMap.put("3267", "1196");
			ispMap.put("3427", "1196");
			ispMap.put("3624", "1196");
			ispMap.put("4039", "1196");
			ispMap.put("4040", "1196");
			ispMap.put("3046", "1196");
			ispMap.put("3285", "1196");
			ispMap.put("3148", "1196");
			ispMap.put("1196", "1196");
		}

		if (countryMap == null) {
			countryMap = new HashMap();
			countryMap.put("AE", "阿联酋");
			countryMap.put("AF", "阿富汗");
			countryMap.put("AL", "阿尔巴尼亚");
			countryMap.put("AM", "亚美尼亚");
			countryMap.put("AO", "安哥拉");
			countryMap.put("AR", "阿根廷");
			countryMap.put("AT", "奥地利");
			countryMap.put("AU", "澳大利亚");
			countryMap.put("AZ", "阿塞拜疆");
			countryMap.put("BD", "孟加拉");
			countryMap.put("BE", "比利时");
			countryMap.put("BF", "布基纳法索");
			countryMap.put("BG", "保加利亚");
			countryMap.put("BH", "巴林");
			countryMap.put("BI", "布隆迪");
			countryMap.put("BJ", "贝宁");
			countryMap.put("BL", "巴勒斯坦");
			countryMap.put("BN", "文莱");
			countryMap.put("BO", "玻利维亚");
			countryMap.put("BR", "巴西");
			countryMap.put("BW", "博茨瓦纳");
			countryMap.put("BY", "白俄罗斯");
			countryMap.put("CA", "加拿大");
			countryMap.put("CF", "中非");
			countryMap.put("CG", "刚果");
			countryMap.put("CH", "瑞士");
			countryMap.put("CL", "智利");
			countryMap.put("CM", "喀麦隆");
			countryMap.put("CN", "中国");
			countryMap.put("CO", "哥伦比亚");
			countryMap.put("CR", "哥斯达黎加");
			countryMap.put("CS", "捷克");
			countryMap.put("CU", "古巴");
			countryMap.put("CY", "塞浦路斯");
			countryMap.put("CI", "科特迪瓦");
			countryMap.put("DE", "德国");
			countryMap.put("DK", "丹麦");
			countryMap.put("DO", "多米尼加共和国");
			countryMap.put("DZ", "阿尔及利亚");
			countryMap.put("EC", "厄瓜多尔");
			countryMap.put("EE", "爱沙尼亚");
			countryMap.put("EG", "埃及");
			countryMap.put("ES", "西班牙");
			countryMap.put("ET", "埃塞俄比亚");
			countryMap.put("EU", "欧洲联盟");
			countryMap.put("FI", "芬兰");
			countryMap.put("FJ", "斐济");
			countryMap.put("FR", "法国");
			countryMap.put("GA", "加蓬");
			countryMap.put("GB", "英国");
			countryMap.put("GD", "格林纳达");
			countryMap.put("GE", "格鲁吉亚");
			countryMap.put("GH", "加纳");
			countryMap.put("GN", "几内亚");
			countryMap.put("GR", "希腊");
			countryMap.put("GT", "危地马拉 ");
			countryMap.put("HK", "香港特别行政区");
			countryMap.put("HN", "洪都拉斯");
			countryMap.put("HU", "匈牙利");
			countryMap.put("ID", "印度尼西亚");
			countryMap.put("IE", "爱尔兰");
			countryMap.put("IL", "以色列");
			countryMap.put("IN", "印度");
			countryMap.put("IQ", "伊拉克");
			countryMap.put("IR", "伊朗");
			countryMap.put("IS", "冰岛");
			countryMap.put("IT", "意大利");
			countryMap.put("JM", "牙买加");
			countryMap.put("JO", "约旦");
			countryMap.put("JP", "日本");
			countryMap.put("KG", "吉尔吉斯坦");
			countryMap.put("KH", "柬埔寨");
			countryMap.put("KP", "北朝鲜");
			countryMap.put("KR", "韩国");
			countryMap.put("KT", "科特迪瓦共和国");
			countryMap.put("KW", "科威特");
			countryMap.put("KZ", "哈萨克");
			countryMap.put("LA", "老挝");
			countryMap.put("LB", "黎巴嫩");
			countryMap.put("LC", "圣卢西亚");
			countryMap.put("LI", "列支敦士登");
			countryMap.put("LK", "斯里兰卡");
			countryMap.put("LR", "利比里亚");
			countryMap.put("LT", "立陶宛");
			countryMap.put("LU", "卢森堡");
			countryMap.put("LV", "拉脱维亚");
			countryMap.put("LY", "利比亚");
			countryMap.put("MA", "摩洛哥");
			countryMap.put("MC", "摩纳哥");
			countryMap.put("MD", "摩尔多瓦");
			countryMap.put("MG", "马达加斯加");
			countryMap.put("ML", "马里");
			countryMap.put("MM", "缅甸");
			countryMap.put("MN", "蒙古");
			countryMap.put("MO", "澳门地区");
			countryMap.put("MT", "马耳他");
			countryMap.put("MU", "毛里求斯");
			countryMap.put("MW", "马拉维");
			countryMap.put("MX", "墨西哥");
			countryMap.put("MY", "马来西亚");
			countryMap.put("MZ", "莫桑比克");
			countryMap.put("MH", "马绍尔群岛");
			countryMap.put("NA", "纳米比亚");
			countryMap.put("NE", "尼日尔");
			countryMap.put("NG", "尼日利亚");
			countryMap.put("NI", "尼加拉瓜");
			countryMap.put("NL", "荷兰");
			countryMap.put("NO", "挪威");
			countryMap.put("NP", "尼泊尔");
			countryMap.put("NZ", "新西兰");
			countryMap.put("OM", "阿曼");
			countryMap.put("PA", "巴拿马");
			countryMap.put("PE", "秘鲁");
			countryMap.put("PG", "巴布亚新几内亚");
			countryMap.put("PH", "菲律宾");
			countryMap.put("PK", "巴基斯坦");
			countryMap.put("PL", "波兰");
			countryMap.put("PT", "葡萄牙");
			countryMap.put("PY", "巴拉圭");
			countryMap.put("QA", "卡塔尔");
			countryMap.put("RO", "罗马尼亚");
			countryMap.put("RU", "俄罗斯");
			countryMap.put("SA", "沙特阿拉伯");
			countryMap.put("SC", "塞舌尔");
			countryMap.put("SD", "苏丹");
			countryMap.put("SE", "瑞典");
			countryMap.put("SG", "新加坡");
			countryMap.put("SI", "斯洛文尼亚");
			countryMap.put("SK", "斯洛伐克");
			countryMap.put("SM", "圣马力诺");
			countryMap.put("SN", "塞内加尔");
			countryMap.put("SO", "索马里");
			countryMap.put("SY", "叙利亚");
			countryMap.put("SZ", "斯威士兰");
			countryMap.put("TD", "乍得");
			countryMap.put("TG", "多哥");
			countryMap.put("TH", "泰国");
			countryMap.put("TJ", "塔吉克斯坦");
			countryMap.put("TM", "土库曼");
			countryMap.put("TN", "突尼斯");
			countryMap.put("TR", "土耳其");
			countryMap.put("TW", "中国台湾");
			countryMap.put("TZ", "坦桑尼亚");
			countryMap.put("UA", "乌克兰");
			countryMap.put("UG", "乌干达");
			countryMap.put("US", "美国");
			countryMap.put("UY", "乌拉圭");
			countryMap.put("UZ", "乌兹别克");
			countryMap.put("VC", "圣文森特岛");
			countryMap.put("VE", "委内瑞拉");
			countryMap.put("VN", "越南");
			countryMap.put("YE", "也门");
			countryMap.put("YU", "南斯拉夫联盟");
			countryMap.put("ZA", "南非");
			countryMap.put("ZM", "赞比亚");
			countryMap.put("ZR", "扎伊尔");
			countryMap.put("ZW", "津巴布韦");
			countryMap.put("TT", "特立尼达和多巴哥");
			countryMap.put("KE", "肯尼亚");
			countryMap.put("MH", "马绍尔群岛");
			countryMap.put("MH", "肯尼亚");
			countryMap.put("CZ", "捷克");
			countryMap.put("RE", "留尼汪");
			countryMap.put("BM", "百慕大群岛");
			countryMap.put("BZ", "伯利兹");
		}
	}

	public static String nameToTrans(String name, int flag) {
		String transName = "";
		if ((name == null) || ("".equals(name))) {
			return "";
		}
		name = name.trim();
		switch (flag) {
		case 0:
			transName = (String) countryMap.get(name);
			break;
		case 1:
			transName = (String) ispMap.get(name);
			break;
		case 2:
			transName = (String) deviceTypeMap.get(name);
			break;
		case 3:
			transName = (String) transDeviceTypeMap.get(name);
		}

		if ((transName != null) && (!"".equals(transName))) {
			transName = transName.trim();
		} else {
			transName = name;
		}
		return transName;
	}

	public static String countryCodeToCountryName(String countryCode) {
		String countryName = "";
		if ((countryCode == null) || ("".equals(countryCode))) {
			return "";
		}
		countryCode = countryCode.trim();
		countryName = (String) countryMap.get(countryCode);
		if ((countryName != null) && (!"".equals(countryName)) && (!"null".equals(countryName))) {
			countryName = countryName.trim();
		}
		return countryName;
	}

	public static String intToStr(Integer time) {
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		Date date = new Date();
		try {
			date = sdfNew.parse(String.valueOf(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sdfOld.format(date).substring(0, 6) + "00";
	}

	public static String getTime(Integer time) {
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		String res = sdfOld.format(new Date());
		try {
			res = sdfOld.format(sdfNew.parse(String.valueOf(time)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return res.substring(0, 6) + "00";
	}

	public static int getTimeNew(Integer time) {
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		int res = strToInt(sdfOld.format(new Date()));
		try {
			res = strToInt(sdfNew.format(sdfOld.parse(String.valueOf(time))));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return res;
	}

	public static int getTimecdy(Integer time, int cdy) {
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		int res = 0;
		try {
			Date date = sdfNew.parse(String.valueOf(time));
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.add(5, cdy);
			res = strToInt(sdfNew.format(cal.getTime()));
		} catch (ParseException e) {
			CreatLog.setError("Util", "getTimeList", "parameter formatter is not correct");
		}

		return res;
	}

	public static String getTimeNewstr(Integer time) {
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		String res = sdfOld.format(new Date());
		try {
			res = sdfNew.format(sdfOld.parse(String.valueOf(time)));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return res;
	}

	public static List<Integer> getTimeList(int start, int end) {
		List<Integer> list = new ArrayList();
		List<Date> dateList = new ArrayList();
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		try {
			Date startDate = sdfOld.parse(String.valueOf(start));
			Date endDate = sdfOld.parse(String.valueOf(end));
			Calendar cal = Calendar.getInstance();
			while (startDate.compareTo(endDate) < 0) {
				dateList.add(startDate);
				cal.setTime(startDate);
				cal.add(5, 1);
				startDate = cal.getTime();
			}
		} catch (ParseException e) {
			CreatLog.setError("Util", "getTimeList", "parameter formatter is not correct");

			return list;
		}

		for (Date date : dateList) {
			list.add(Integer.valueOf(Integer.parseInt(sdfNew.format(date))));
		}

		return list;
	}

	public static List<Integer> getTimeList(int start, int end, String timeg) {
		List<Integer> list = new ArrayList();
		List<Date> dateList = new ArrayList();
		SimpleDateFormat sdfOld = new SimpleDateFormat("yyMMddhh");
		SimpleDateFormat sdfNew = new SimpleDateFormat(timeg);
		try {
			Date startDate = sdfOld.parse(String.valueOf(start));
			Date endDate = sdfOld.parse(String.valueOf(end));
			Calendar cal = Calendar.getInstance();
			while (startDate.compareTo(endDate) < 0) {
				dateList.add(startDate);
				cal.setTime(startDate);
				cal.add(5, 1);
				startDate = cal.getTime();
			}
		} catch (ParseException e) {
			CreatLog.setError("Util", "getTimeList", "parameter formatter is not correct");

			return list;
		}

		for (Date date : dateList) {
			list.add(Integer.valueOf(Integer.parseInt(sdfNew.format(date))));
		}

		return list;
	}

	public static String getActiveCode() {
		String[] s = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
				"t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };

		Random random = new Random();
		String content = "";
		for (int i = 0; i < 8; i++) {
			String rand = "";
			if (random.nextBoolean()) {
				rand = String.valueOf(random.nextInt(10));
			} else {
				int index = random.nextInt(25);
				rand = s[index];
			}
			content = content + rand;
		}
		return content;
	}

	public static String[] splitString(String string, String onToken) {
		if (string == null)
			return null;
		StringTokenizer tokenizer = new StringTokenizer(string, onToken);
		String[] result = new String[tokenizer.countTokens()];

		for (int i = 0; i < result.length; i++) {
			result[i] = tokenizer.nextToken();
		}

		return result;
	}

	private static String _webinfPath = null;

	public static String getWebinfPath() {
		if (_webinfPath == null) {
			String res = null;
			Util u = new Util();
			String classname = u.getClass().getName().replace('.', '/') + ".class";

			ClassLoader cl = u.getClass().getClassLoader();
			if (cl != null) {
				URL url = cl.getResource(classname);
				if (url != null) {
					String path = url.getFile();

					int fileStrPosition = path.indexOf("file:/");
					int begin = 0;
					int end = path.length();

					if (fileStrPosition >= 0) {
						begin = fileStrPosition + 5;
					}

					end = path.indexOf("classes/" + classname);
					if (end < 0) {

						end = path.indexOf("lib/");
						if (end < 0) {

							int tmpend = path.indexOf("!/");
							end = path.substring(0, tmpend).lastIndexOf("/");
						}
					}
					String rf = path.substring(begin, end);
					res = new File(rf).getAbsolutePath().replace('\\', '/') + "/";
				}
			}
			try {
				_webinfPath = URLDecoder.decode(res, "UTF-8");
			} catch (UnsupportedEncodingException ex) {
			}
		}

		return _webinfPath;
	}

	private static String _systemPath = null;

	public static String getSystemPath() {
		if (_systemPath == null) {
			String res = getWebinfPath();
			if ((res.indexOf("WEB-INF/") > 0) && (res.length() > 10)) {
				res = res.substring(0, res.lastIndexOf("/", res.length() - 12)) + "/";
			}

			_systemPath = res;
		}

		return _systemPath;
	}

	public static String TransCH(String str) {
		try {
			String temp_p = str;
			byte[] temp_t = temp_p.getBytes("ISO8859_1");
			return new String(temp_t);
		} catch (Exception e) {
		}
		return "";
	}

	public static int gettimeSubSeven(Timestamp tmpTimestamp) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(tmpTimestamp.getTime());
		cal.add(5, -7);
		int rsTimestamp = timeToInt(cal);
		return rsTimestamp;
	}

	public static Calendar strToDate(String strDate) {
		if ((strDate != null) && (!"".equals(strDate))) {
			SimpleDateFormat sdf = new SimpleDateFormat(ConstString.DATEFRAME);
			Calendar cal = Calendar.getInstance();
			try {
				Date tmpd = sdf.parse(strDate);
				cal.setTime(tmpd);
			} catch (ParseException e) {
				CreatLog.setError("Util", "strToDate", "从字符串转换到日期是错误：" + e.getMessage());
			}

			return cal;
		}
		return Calendar.getInstance();
	}

	public static Timestamp getStartTime(Calendar cal) {
		Timestamp sTime = null;
		cal.set(11, 0);
		cal.set(12, 0);
		cal.set(13, 0);
		cal.set(14, 0);
		SimpleDateFormat sdf = new SimpleDateFormat(ConstString.TIMEFRAME);
		String str = sdf.format(cal.getTime());
		sTime = Timestamp.valueOf(str);
		return sTime;
	}

	public static String getTimeToStr(Timestamp date) {
		String strTime = "";
		if (date == null) {
			return "";
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.DATEFRAME);
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		strTime = edf.format(cal.getTime());
		return strTime;
	}

	public static String getTimeToStr(Calendar cal) {
		String strTime = "";
		if (cal == null) {
			return "";
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.DATEFRAME);

		strTime = edf.format(cal.getTime());
		return strTime;
	}

	public static String getHour(Calendar cal) {
		String strTime = "";
		if (cal == null) {
			return "";
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMEFRAME);

		strTime = edf.format(cal.getTime());
		String str = strTime.substring(11, 13);
		if (str.substring(0, 1).equals("0"))
			str = str.substring(1, 2);
		return str;
	}

	public static String getTimeToStr(Timestamp date, String dateFormat) {
		String strTime = "";
		if (date == null) {
			return "";
		}
		SimpleDateFormat edf = new SimpleDateFormat(dateFormat);
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(date.getTime());
		strTime = edf.format(cal.getTime());
		return strTime;
	}

	public static String getTimeToStr(Calendar date, String dateFormat) {
		String strTime = "";
		if (date == null) {
			return "";
		}
		SimpleDateFormat edf = new SimpleDateFormat(dateFormat);
		strTime = edf.format(date.getTime());
		return strTime;
	}

	public static Timestamp getEndTime(Calendar cal) {
		Timestamp eTime = null;
		cal.set(11, 23);
		cal.set(12, 59);
		cal.set(13, 59);
		cal.set(14, 0);
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMEFRAME);
		String etr = edf.format(cal.getTime());
		eTime = Timestamp.valueOf(etr);
		return eTime;
	}

	public static int getDayTime() {
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMENUM);
		String etr = edf.format(cal.getTime());
		return strToInt(etr);
	}

	public static int timeToInt(Timestamp time) {
		int inttime = -1;
		if (time == null) {
			return inttime;
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.INTTIME);
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(time.getTime());
		String etr = edf.format(cal.getTime());
		if ((etr != null) && (!"".equals(etr))) {
			inttime = Integer.parseInt(etr);
		}
		return inttime;
	}

	public static int timeToIntL(Timestamp time) {
		int inttime = -1;
		if (time == null) {
			return inttime;
		}
		SimpleDateFormat edf = new SimpleDateFormat("yyyyMMdd");
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(time.getTime());
		String etr = edf.format(cal.getTime());
		if ((etr != null) && (!"".equals(etr))) {
			inttime = strToInt(etr);
		}
		return inttime;
	}

	public static int timeToInt(Calendar time) {
		int inttime = -1;
		if (time == null) {
			return inttime;
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.INTTIME);
		String etr = edf.format(time.getTime());
		if ((etr != null) && (!"".equals(etr))) {
			inttime = Integer.parseInt(etr);
		}
		return inttime;
	}

	public static int hourtimeToInt(Calendar time) {
		int inttime = -1;
		if (time == null) {
			return inttime;
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.HOURFRAME);
		String etr = edf.format(time.getTime());
		if ((etr != null) && (!"".equals(etr))) {
			inttime = Integer.parseInt(etr);
		}
		return inttime;
	}

	public static String timeIntToStr(int value, int type) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			if (type == 1) {
				tmpValue = "20" + tmpValue.substring(0, 2) + "-" + tmpValue.substring(2, 4) + "-"
						+ tmpValue.substring(4, 6) + " " + tmpValue.substring(6, 8) + "时";

			} else {
				tmpValue = "20" + tmpValue.substring(0, 2) + "-" + tmpValue.substring(2, 4) + "-"
						+ tmpValue.substring(4, 6);
			}
		}

		return tmpValue;
	}

	public static String intTotimeStr(int value) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			tmpValue = "20" + tmpValue.substring(0, 2) + "-" + tmpValue.substring(2, 4) + "-" + tmpValue.substring(4, 6)
					+ " " + tmpValue.substring(6, 8) + "时";
		}

		return tmpValue;
	}

	public static String intToDateStr(int value) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			tmpValue = "20" + tmpValue.substring(0, 2) + "-" + tmpValue.substring(2, 4) + "-"
					+ tmpValue.substring(4, 6);
		}

		return tmpValue;
	}

	public static String intToDateFrametStr(int value) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			tmpValue = tmpValue.substring(2, 4) + "月" + tmpValue.substring(4, 6) + "日";
		}
		return tmpValue;
	}

	public static String intToYearFrametStr(int value) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			tmpValue = "20" + tmpValue.substring(0, 2) + "年" + tmpValue.substring(2, 4) + "月";
		}

		return tmpValue;
	}

	public static String DateToStr(Calendar cal) {
		String date = "";
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.DATESECFRAME);
		date = edf.format(cal.getTime());
		return date;
	}

	public static Calendar intTotimeCal(int value) {
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		Date tmpd = null;
		try {
			tmpd = sdfNew.parse(String.valueOf(value));
		} catch (ParseException e) {
			CreatLog.setError("Util", "intTotimeCal", "日期转化错误：" + e.getMessage());
		}
		cal.setTimeInMillis(tmpd.getTime());
		return cal;
	}

	public static Calendar intTotimeCal(int value, String formate) {
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdfNew = new SimpleDateFormat(formate);
		Date tmpd = null;
		try {
			tmpd = sdfNew.parse(String.valueOf(value));
		} catch (ParseException e) {
			CreatLog.setError("Util", "intTotimeCal", "日期转化错误：" + e.getMessage());
		}
		cal.setTimeInMillis(tmpd.getTime());
		return cal;
	}

	public static Timestamp intTotime(int value) {
		String tmpValue = "";
		Timestamp strTime = null;
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			tmpValue = "20" + tmpValue.substring(0, 2) + "-" + tmpValue.substring(2, 4) + "-" + tmpValue.substring(4, 6)
					+ " " + tmpValue.substring(6, 8) + ":00:00";
		}

		try {
			strTime = Timestamp.valueOf(tmpValue);
		} catch (Exception e) {
			Calendar cal = Calendar.getInstance();
			SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMEFRAME);
			String etr = edf.format(cal.getTime());
			strTime = Timestamp.valueOf(etr);
			CreatLog.setError("Util", "intTotime", "日期转化错误：" + e.getMessage());
		}
		return strTime;
	}

	public static int getIntervalTime(long fDate, long oDate) {
		long intervalMilli = fDate - oDate;
		int time = (int) (intervalMilli / 60000L);
		return time;
	}

	public static int getIntervalDays(Timestamp fDate, Timestamp oDate) {
		if ((null == fDate) || (null == oDate)) {
			return -1;
		}
		long intervalMilli = oDate.getTime() - fDate.getTime();
		int day = (int) (intervalMilli / 86400000L) + 1;
		return day;
	}

	public static int getIntervalServerDays(Timestamp fDate, Timestamp oDate, int tmpflag) {
		if ((null == fDate) || (null == oDate)) {
			return -1;
		}
		long intervalMilli = oDate.getTime() - fDate.getTime();
		int day = (int) (intervalMilli / 86400000L) + 1;
		switch (tmpflag) {
		case 3:
			if (day == 1) {
				day = 7;
			}
			break;
		case 4:
			if (day == 1) {
				day = 30;
			}
			break;
		case 5:
			if (day == 1) {
				day = 365;
			}
			break;
		case 6:
			if (day == 1) {
				day = 30;
			}
			break;
		}
		return day;
	}

	public static int getIntervalDay(int fDate, int oDate) {
		if ((0 == fDate) || (0 == oDate)) {
			return -1;
		}

		Timestamp tmpstart = intTotime(fDate);
		Timestamp tmpend = intTotime(oDate);
		long intervalMilli = tmpend.getTime() - tmpstart.getTime();
		if (intervalMilli < 0L) {
			intervalMilli = 0L;
		}
		int day = (int) (intervalMilli / 86400000L);
		return day;
	}

	public static int getIntervalDays(int fDate, int oDate) {
		if ((0 == fDate) || (0 == oDate)) {
			return -1;
		}

		Timestamp tmpstart = intTotime(fDate);
		Timestamp tmpend = intTotime(oDate);
		long intervalMilli = tmpend.getTime() - tmpstart.getTime();
		int day = (int) (intervalMilli / 86400000L) + 1;
		return day;
	}

	public static int getIntervalDays(Calendar fDate, Calendar oDate) {
		if ((null == fDate) || (null == oDate)) {
			return -1;
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMEFRAME);
		long intervalMilli = oDate.getTimeInMillis() - fDate.getTimeInMillis();
		int day = (int) (intervalMilli / 86400000L) + 1;
		return day;
	}

	public static int getIntervalWeekDays(Calendar fDate, Calendar oDate) {
		if ((null == fDate) || (null == oDate)) {
			return -1;
		}
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.TIMEFRAME);
		long intervalMilli = oDate.getTimeInMillis() - fDate.getTimeInMillis();
		int week = (int) (intervalMilli / 604800000L) + 1;
		return week;
	}

	public static float getDecimal(float tmpvalue, String decimalflag) {
		float value = 0.0F;
		DecimalFormat df = new DecimalFormat(decimalflag);
		value = Float.parseFloat(df.format(tmpvalue));
		return value;
	}

	public static float getAvg(Object numerator, Object denominator, String decimalflag) {
		float infoavg = 0.0F;
		if (numerator == null) {
			numerator = Integer.valueOf(0);
		}
		if (denominator == null) {
			denominator = Integer.valueOf(0);
		}
		if (strToFloat(String.valueOf(denominator)) == 0.0F) {
			return 0.0F;
		}
		infoavg = strToFloat(String.valueOf(numerator)) / strToFloat(String.valueOf(denominator));

		DecimalFormat df = new DecimalFormat(decimalflag);
		infoavg = strToFloat(df.format(infoavg));
		return infoavg;
	}

	public static float getPercentage(Object numerator, Object denominator, String decimalflag) {
		float infoPercentage = 0.0F;
		if (strToFloat(String.valueOf(denominator)) == 0.0F) {
			return 0.0F;
		}
		if (numerator == null) {
			numerator = Integer.valueOf(0);
		}
		if (denominator == null) {
			denominator = Integer.valueOf(0);
		}
		infoPercentage = strToFloat(String.valueOf(numerator)) / strToFloat(String.valueOf(denominator));

		infoPercentage *= 100.0F;
		if (infoPercentage < 0.0F) {
			infoPercentage = 0.0F;
		} else if (infoPercentage > 100.0F) {
			infoPercentage = 100.0F;
		}
		DecimalFormat df = new DecimalFormat(decimalflag);
		infoPercentage = strToFloat(df.format(infoPercentage));
		return infoPercentage;
	}

	public static int strToInt(String str) {
		int info = 0;
		if ((str != null) && (!"".equals(str))) {
			try {
				info = Integer.parseInt(str);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToInt", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static Integer strToInteger(String str) {
		Integer info = null;
		if ((str != null) && (!"".equals(str)) && (!str.equals("null"))) {
			try {
				info = Integer.valueOf(Integer.parseInt(str));
			} catch (Exception e) {
				CreatLog.setError("Util", "strToInteger", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static Float strToFloater(String str) {
		Float info = null;
		if ((str != null) && (!"".equals(str)) && (!str.equals("null"))) {
			try {
				info = Float.valueOf(Float.parseFloat(str));
			} catch (Exception e) {
				CreatLog.setError("Util", "strToFloat", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static long strTolong(String str) {
		long info = 0L;
		if ((str != null) && (!"".equals(str))) {
			try {
				info = Long.parseLong(str);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToInt", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static float strToFloat(String str) {
		float info = 0.0F;
		if ((str != null) && (!"".equals(str))) {
			try {
				info = Float.parseFloat(str);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToFloat", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static float ExcelStrToFloat(String str) {
		float info = -1.0F;
		if ((str != null) && (!"".equals(str))) {
			try {
				info = Float.parseFloat(str);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToFloat", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static long strToLong(String str) {
		long info = 0L;
		if ((str != null) && (!"".equals(str))) {
			try {
				info = Long.parseLong(str);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToLong", "字符串转数字错误，带入字符串参数为：" + str + "，错误内容：" + e.getMessage());
			}
		}

		return info;
	}

	public static String strToDateStr(String tmpval) {
		String dateStr = "";
		if ((tmpval == null) || ("".equals(tmpval)) || (tmpval.length() < 6)) {
			return "0";
		}
		dateStr = "20" + tmpval.substring(0, 2) + "-" + tmpval.substring(2, 4) + "-" + tmpval.substring(4, 6);

		return dateStr;
	}

	public static String strToDateStr1(String tmpval) {
		String dateStr = "";
		if ((tmpval == null) || ("".equals(tmpval)) || (tmpval.length() < 6)) {
			return "0";
		}
		dateStr = tmpval.substring(0, 4) + "-" + tmpval.substring(4, 6) + "-" + tmpval.substring(6, 8);

		return dateStr;
	}

	public static int getNowHour() {
		Calendar cal = Calendar.getInstance();
		int nowHour = 0;
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.HOURFRAME);
		String strTime = edf.format(cal.getTime());
		nowHour = strToInt(strTime);
		return nowHour;
	}

	public static String codeFilter(String filterInfo, String bytesFilter, String strFilter) {
		String codeInfo = "";
		try {
			if ((filterInfo != null) && (!"".equals(filterInfo))) {
				codeInfo = new String(filterInfo.getBytes(bytesFilter), strFilter);
			}
		} catch (UnsupportedEncodingException e) {
			CreatLog.setError("Util", "codeFilter", "转换编码错误：" + e.getMessage());
		}
		return codeInfo;
	}

	public static String getCint(int nint) {
		String pint = "";
		if (nint != 0) {
			if (nint < 90) {
				int tmpval = 0;
				for (int i = 10; i < ConstString.CINT; i += 10) {
					tmpval = i / nint;
					if (tmpval > 0) {
						pint = i + "";
						break;
					}
				}
			} else {
				pint = "90";
			}
		} else {
			pint = "90";
		}
		return pint;
	}

	public static String floatToTime(float param) {
		if (param == 0.0F) {
			return "00:00";
		}
		int value = (int) param;
		String str = intToTime(value);
		return str;
	}

	public static String intToTime(int param) {
		String str = null;
		if (param == 0) {
			return "00:00";
		}
		int hour = param / 3600;
		int min = param % 3600 / 60;
		int sec = param % 3600 % 60;
		String hours = null;
		String mins = null;
		String secs = null;
		if (hour < 10) {
			hours = "0" + hour;
		} else {
			hours = hour + "";
		}
		if (min < 10) {
			mins = "0" + min;
		} else {
			mins = min + "";
		}
		if (sec < 10) {
			secs = "0" + sec;
		} else {
			secs = sec + "";
		}
		if (hours.equals("00")) {
			str = mins + ":" + secs;
		} else {
			str = hours + ":" + mins + ":" + secs;
		}
		return str;
	}

	public static String doubleToTime(double param) {
		if (param == 0.0D) {
			return "00:00";
		}
		int value = (int) param;
		String str = intToTime(value);
		return str;
	}

	public static String weekDifference(String weeknum) {
		String info = "";

		if ((weeknum != null) && (!"".equals(weeknum))) {
			Calendar cal = Calendar.getInstance();
			Calendar calMONDAY = Calendar.getInstance();
			calMONDAY.set(7, 2);

			String[] tmpdate = weeknum.split("-");

			if ((tmpdate != null) && (tmpdate.length > 1)) {
				cal.set(strToInt(tmpdate[0]), 0, 1);
			}
			if ((tmpdate[1] != null) && (!"".equals(tmpdate[1]))) {
				cal.set(3, strToInt(tmpdate[1]));
			}
			info = info + getIntervalWeekDays(cal, calMONDAY) + "周前";
		}
		return info;
	}

	public static String getMonth(String monthnum) {
		String info = "";
		if ((monthnum != null) && (!"".equals(monthnum)) && (monthnum.length() >= 4)) {
			String tmpyear = monthnum.substring(0, 2);
			String tmpmonth = monthnum.substring(2, 4);
			info = "20" + tmpyear + "-" + tmpmonth;
		}
		return info;
	}

	public static int getweekToStartTime(String weeknum) {
		int info = 0;
		if ((weeknum != null) && (!"".equals(weeknum))) {
			Calendar cal = Calendar.getInstance();

			String[] tmpdate = weeknum.split("-");

			if ((tmpdate != null) && (tmpdate.length > 1)) {
				cal.set(strToInt(tmpdate[0]), 0, 1);
			}
			if ((tmpdate[1] != null) && (!"".equals(tmpdate[1]))) {
				cal.set(3, strToInt(tmpdate[1]));
			}
			info = timeToInt(getStartTime(cal));
		}
		return info;
	}

	public static int getweekToEndTime(String weeknum) {
		int info = 0;
		if ((weeknum != null) && (!"".equals(weeknum))) {
			Calendar cal = Calendar.getInstance();

			String[] tmpdate = weeknum.split("-");

			if ((tmpdate != null) && (tmpdate.length > 1)) {
				cal.set(strToInt(tmpdate[0]), 0, 1);
			}
			if ((tmpdate[1] != null) && (!"".equals(tmpdate[1]))) {
				cal.set(3, strToInt(tmpdate[1]));
				cal.add(5, 6);
			}
			info = timeToInt(getEndTime(cal));
		}
		return info;
	}

	public static int getMonthToStartTime(String monthnum) {
		int info = 0;
		if ((monthnum != null) && (!"".equals(monthnum)) && (monthnum.length() >= 4)) {
			String tmpyear = monthnum.substring(0, 2);
			String tmpmonth = monthnum.substring(2, 4);
			Calendar cal = Calendar.getInstance();
			cal.set(strToInt("20" + tmpyear), strToInt(tmpmonth) - 1, 1);

			info = timeToInt(getStartTime(cal));
		}
		return info;
	}

	public static int getMonthToEndTime(String monthnum) {
		int info = 0;
		if ((monthnum != null) && (!"".equals(monthnum)) && (monthnum.length() >= 4)) {
			String tmpyear = monthnum.substring(0, 2);
			String tmpmonth = monthnum.substring(2, 4);
			Calendar cal = Calendar.getInstance();
			cal.set(strToInt("20" + tmpyear), strToInt(tmpmonth) - 1, 1);

			cal.add(2, 1);
			cal.add(5, -1);
			info = timeToInt(getEndTime(cal));
		}
		return info;
	}

	public static boolean stringIsEmpty(String str) {
		return (str == null) || (str.length() < 1);
	}

	public static String getSalt() {
		String[] str = UUID.randomUUID().toString().split("-");
		String uuid = "";
		for (int i = 0; i < str.length; i++) {
			uuid = uuid + str[i];
		}
		return uuid;
	}

	public static String encrypt(String password, String salt) {
		String temp = password + salt;
		for (int i = 0; i < 1000; i++) {
			temp = "" + temp.hashCode();
		}
		return temp;
	}

	public static int getcurrDay() {
		int currday = 0;
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.INTDAY);
		String info = edf.format(cal.getTime());
		currday = strToInt(info + "00");
		return currday;
	}

	public static int getThrDay() {
		int currday = 0;
		Calendar cal = Calendar.getInstance();
		cal.add(5, -30);
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.INTDAY);
		String info = edf.format(cal.getTime());
		currday = strToInt(info + "00");
		return currday;
	}

	public static String currSubMonth(int month) {
		String info = "";
		Calendar cal = Calendar.getInstance();
		cal.add(5, month * -30);
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.MONTHTIME);
		info = edf.format(cal.getTime());
		return info;
	}

	public static String currMonth() {
		String info = "";
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat edf = new SimpleDateFormat(ConstString.MONTHTIME);
		info = edf.format(cal.getTime());
		return info;
	}

	public static String checkMonth(String startime) {
		String[] array = startime.split("-");
		if (array.length < 2) {
			return startime;
		}
		String month = array[1];
		if (Integer.parseInt(month) < 10) {
			month = "0" + month;
		}
		return array[0] + "-" + month + "-" + array[2];
	}

	public static List<String> getSelectMonths(Calendar registertime) {
		List<String> listmonths = new ArrayList();
		Calendar today = Calendar.getInstance();
		int n = today.get(2) + 1;
		listmonths.add(today.get(1) + "-" + n);
		if ((today.get(1) == registertime.get(1)) && (today.get(2) == registertime.get(2))) {

			return listmonths;
		}
		for (int i = 0; i < 11; i++) {
			if (registertime.after(today)) {
				return listmonths;
			}
			today.add(2, -1);
			int m = today.get(2) + 1;
			listmonths.add(today.get(1) + "-" + m);
		}

		return listmonths;
	}

	public static int getWMStartTime(int cdy) {
		int startTime = 0;
		Calendar cal = Calendar.getInstance();
		cal.add(5, cdy);
		startTime = timeToInt(getStartTime(cal));
		return startTime;
	}

	public static int getWmEndTime(int cdy) {
		int endTime = 0;
		Calendar cal = Calendar.getInstance();
		cal.add(5, cdy);
		endTime = timeToInt(getEndTime(cal));
		return endTime;
	}

	public static Timestamp getYesterday() {
		Calendar cal = Calendar.getInstance();
		Timestamp sTime = null;
		cal.set(11, 0);
		cal.set(12, 0);
		cal.set(13, 0);
		cal.set(14, 0);
		cal.add(7, -1);
		SimpleDateFormat sdf = new SimpleDateFormat(ConstString.TIMEFRAME);
		String str = sdf.format(cal.getTime());
		sTime = Timestamp.valueOf(str);
		return sTime;
	}

	public static void codeCN(String str) {
		try {
			System.out.println("1:" + new String(str.getBytes("GBK"), "ISO8859_1"));
			System.out.println("2:" + new String(str.getBytes("GBK"), "utf-8"));
			System.out.println("3:" + new String(str.getBytes("GBK"), "GB2312"));
			System.out.println("4:" + new String(str.getBytes("GBK"), "GBK"));
			System.out.println("5:" + new String(str.getBytes("ISO8859_1"), "GBK"));
			System.out.println("6:" + new String(str.getBytes("ISO8859_1"), "ISO8859_1"));
			System.out.println("7:" + new String(str.getBytes("ISO8859_1"), "GB2312"));
			System.out.println("8:" + new String(str.getBytes("ISO8859_1"), "utf-8"));
			System.out.println("9:" + new String(str.getBytes("utf-8"), "GBK"));
			System.out.println("10:" + new String(str.getBytes("utf-8"), "utf-8"));
			System.out.println("11:" + new String(str.getBytes("utf-8"), "GB2312"));
			System.out.println("12:" + new String(str.getBytes("utf-8"), "ISO8859_1"));
			System.out.println("13:" + new String(str.getBytes("GB2312"), "GB2312"));
			System.out.println("14:" + new String(str.getBytes("GB2312"), "ISO8859_1"));
			System.out.println("15:" + new String(str.getBytes("GB2312"), "utf-8"));
			System.out.println("16:" + new String(str.getBytes("GB2312"), "GBK"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	public static double getDecimal(double tmpvalue, String decimalflag) {
		double value = 0.0D;
		DecimalFormat df = new DecimalFormat(decimalflag);
		value = Double.parseDouble(df.format(tmpvalue));
		return value;
	}

	public static String getNow() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(timestamp);
		return time;
	}

	public static String getNowymd() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String time = format.format(timestamp);
		return time;
	}

	public static String getNowymdl() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String time = format.format(timestamp);
		return time;
	}

	public static Timestamp getWeekAgo() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis() - 604800000L);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(timestamp);
		Timestamp date = Timestamp.valueOf(time);
		return date;
	}

	public static Timestamp getTwoWeeksAgo() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis() - 1209600000L);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(timestamp);
		Timestamp date = Timestamp.valueOf(time);
		return date;
	}

	public static String timeToStr(Timestamp timestamp) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = format.format(timestamp);
		return time;
	}

	public static int strToIntTime(String str) {
		int timeflag = 0;
		if ((str != null) && (!"".equals(str))) {
			int index = str.indexOf("-");
			int lastindex = str.lastIndexOf("-");
			String year = str.substring(2, 4);
			String month = str.substring(index + 1, lastindex);
			if (month.length() == 1) {
				month = "0" + month;
			}
			String day = str.substring(lastindex + 1);
			String date = year + month + day + "00";
			timeflag = strToInt(date);
		}
		return timeflag;
	}

	public static String intToStr(int value) {
		String tmpValue = "";
		tmpValue = value + "";
		if (tmpValue.length() >= 8) {
			String month = tmpValue.substring(2, 4);
			if ("0".equals(month.substring(0, 1))) {
				month = month.substring(1, 2);
			}
			tmpValue = "20" + tmpValue.substring(0, 2) + "-" + month + "-" + tmpValue.substring(4, 6);
		}

		return tmpValue;
	}

	public static String dateToStr(Date time) {
		String str;
		if ((time != null) && (!"".equals(time))) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			str = format.format(time);
		} else {
			str = "";
		}
		return str;
	}

	public static boolean isNumeric(String s) {
		if ((s != null) && (!"".equals(s.trim()))) {
			return s.matches("^[0-9]*$");
		}
		return false;
	}

	public static boolean isInteger(String s) {
		int info = 0;
		if ((s != null) && (!"".equals(s))) {
			try {
				info = Integer.parseInt(s);
			} catch (Exception e) {
				CreatLog.setError("Util", "strToInt", "字符串转数字错误，带入字符串参数为：" + s + "，不是整数类型");

				return false;
			}
		}
		return true;
	}

	public static int strTimeToIntTime(String str) {
		int time = 0;
		if ((str != null) && (!"".equals(str))) {
			String[] tmptime = str.split("-");
			String vendtime = "";
			int _month = strToInt(tmptime[1]);
			if (_month < 10) {
				vendtime = tmptime[0] + "0" + _month + tmptime[2];
			} else {
				vendtime = tmptime[0] + tmptime[1] + tmptime[2];
			}
			time = strToInt(vendtime);
		}
		return time;
	}

	public static String intToMinute(float value) {
		int param = (int) value;
		String str = "";
		if (param == 0) {
			return "00:00";
		}
		int hour = param / 3600;
		int min = param % 3600 / 60;
		int sec = param % 3600 % 60;

		String hours;
		if (hour < 10) {
			hours = "0" + hour;
		} else
			hours = hour + "";
		String mins;
		if (min < 10) {
			mins = "0" + min;
		} else
			mins = min + "";
		String secs;
		if (sec < 10) {
			secs = "0" + sec;
		} else {
			secs = sec + "";
		}
		if ("00".equals(hours)) {
			str = mins + ":" + secs;
		} else {
			str = hours + ":" + mins + ":" + secs;
		}
		return str;
	}

	public static String floatToStrPercent(float value) {
		String result = null;
		if (value == 0.0F) {
			return "0.0%";
		}
		DecimalFormat df = new DecimalFormat("#.0");
		result = df.format(value * 100.0F) + "%";
		return result;
	}

	public static int getFirstDayOfWeek(int date, String formate) {
		Calendar starttime = intTotimeCal(date, formate);
		int dayofweek = starttime.get(7);
		if (dayofweek == 1) {
			return date;
		}
		int interval = -1 * (dayofweek - 1);
		starttime.add(5, interval);
		return timeToInt(starttime);
	}

	public static int getLastDayOfWeek(int date, String formate) {
		Calendar starttime = intTotimeCal(date, formate);
		int dayofweek = starttime.get(7);
		if (dayofweek == 7) {
			return date;
		}
		int interval = 7 - dayofweek;
		starttime.add(5, interval);
		return timeToInt(starttime);
	}

	public static DictService getDictService() {
		DictService diService = null;
		try {
			diService = ReadService.getInstance();
		} catch (Exception e) {
			CreatLog.setError("Util", "getDictService", "获取翻译服务错误" + e.getMessage());
		}
		return diService;
	}

	public static String getDefaultid(DictService diService, DictService.ServiceName dserviceName, String defaultName) {
		int defaultid = 0;
		defaultid = 0;
		try {
			defaultid = diService.get(dserviceName, defaultName).intValue();
		} catch (Exception e) {
			CreatLog.setError("Util", "getDefaultid", "id到name转换错误" + e.getMessage());
		}
		return String.valueOf(defaultid);
	}

	public static String splitStr(String str, int num) {
		if ((str != null) && (!"".equals(str)) && (str.length() > num)) {
			str = str.substring(0, num) + "...";
		}

		return str;
	}

	public static String replaceStr(String str) {
		str = str.replace("\"", "“");
		str = str.replace("<", "《");
		str = str.replace(">", "》");
		return str;
	}

	public static int getEndTime(int starttime) {
		String start = String.valueOf(starttime);
		String end = start.substring(0, start.length() - 2) + "23";
		int endtime = strToInt(end);
		return endtime;
	}

	public static boolean chkNull(String val) {
		if ((val == null) || ("".equals(val))) {
			return true;
		}
		return false;
	}

	public static int getDaysAgo(int time, int cdy) {
		SimpleDateFormat sdfNew = new SimpleDateFormat("yyyyMMdd");
		int res = 0;
		try {
			Date date = sdfNew.parse(String.valueOf(time));
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.set(5, cal.get(5) + cdy);
			res = strToInt(sdfNew.format(cal.getTime()));
		} catch (ParseException e) {
			CreatLog.setError("Util", "getTimeList", "parameter formatter is not correct");
		}

		return res;
	}

	public static String getNowToMillSecond() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		String time = format.format(timestamp);
		return time;
	}

	public Util() {
	}
}
