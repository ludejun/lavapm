package com.lavapm.tenant.tool;

import java.util.List;
import java.util.Map;

import com.lavapm.tenant.bean.ChildAccount;

public class ParameterBean {
	private String rule_name;
	private String rule_ids;
	private String eventids;
	private String appkey;
	private String versionname;
	private String pagename;
	private Integer category;
	private String appVersion;
	protected int developerID;
	protected String developerIDS;
	protected int endTime;
	protected int redisEndTime;
	protected int timeflag;
	protected String partnerID;
	protected String platformID;
	protected int productype;
	protected int platformid;
	protected ChildAccount childaccount;
	protected String productIdList;
	protected String proplatID;
	protected int productID;
	protected List<Integer> productIDList;
	protected String serviceCode;
	protected List<String> targetCodes;
	protected int startTime;
	protected int registertime;
	protected int todayTime;
	protected int thrTime;
	protected String item;
	protected String itemValue;
	protected String itemValueNum;
	protected String itemValues;
	protected int weekstartTime;
	protected int weekendTime;
	protected int yweekstartTime;
	protected int yweekendTime;
	protected int monthstartTime;
	protected int monthendTime;
	protected int ymonthstartTime;
	protected int ymonthendTime;
	protected String versionID;
	protected String versionIDstr;
	protected Map<String, String[]> calculatorMap = null;
	protected int isMilePost;
	protected String usergrouptarget;
	protected String usergroupstarttime;
	protected String usergroupendtime;
	protected String usergroupcountry;
	protected String usergrouparea;
	protected String usergrouplanguage;
	protected String usergroupmobile;
	protected String usergroupos;
	protected String usergroupispinInfo;
	protected String usergroupprisonbreak;
	protected String usergroupprcrack;
	protected String usergroupeventflag;
	protected String usergroupeventinfo;
	protected String warningname;
	protected int warningdate;
	protected int warningevent;
	protected int comparedate;
	protected int compare;
	protected int comparisonunit;
	protected float warningnumber;
	protected int partnername;
	protected String emailValue;
	protected String groupUserCriteriaID;
	protected List<String> keyList = null;
	protected String exceptionthis_start;
	protected String exceptionthis_end;
	protected String eventid;
	protected String displayname;
	protected String isforbid;

	public String getEventid() {
		return this.eventid;
	}

	public void setEventid(String eventid) {
		this.eventid = eventid;
	}

	public String getDisplayname() {
		return this.displayname;
	}

	public void setDisplayname(String displayname) {
		this.displayname = displayname;
	}

	public String getIsforbid() {
		return this.isforbid;
	}

	public void setIsforbid(String isforbid) {
		this.isforbid = isforbid;
	}

	public Integer getCategory() {
		return this.category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public String getExceptionthis_start() {
		return this.exceptionthis_start;
	}

	public void setExceptionthis_start(String exceptionthis_start) {
		this.exceptionthis_start = exceptionthis_start;
	}

	public String getExceptionthis_end() {
		return this.exceptionthis_end;
	}

	public void setExceptionthis_end(String exceptionthis_end) {
		this.exceptionthis_end = exceptionthis_end;
	}

	public String getPagename() {
		return this.pagename;
	}

	public void setPagename(String pagename) {
		this.pagename = pagename;
	}

	public String getItemValues() {
		return this.itemValues;
	}

	public void setItemValues(String itemValues) {
		this.itemValues = itemValues;
	}

	public int getIsMilePost() {
		return this.isMilePost;
	}

	public void setIsMilePost(int isMilePost) {
		this.isMilePost = isMilePost;
	}

	public int getDeveloperID() {
		return this.developerID;
	}

	public void setDeveloperID(int developerID) {
		this.developerID = developerID;
	}

	public String getDeveloperIDS() {
		return this.developerIDS;
	}

	public void setDeveloperIDS(String developerIDS) {
		this.developerIDS = developerIDS;
	}

	public int getEndTime() {
		return this.endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public int getTimeflag() {
		return this.timeflag;
	}

	public void setTimeflag(int timeflag) {
		this.timeflag = timeflag;
	}

	public int getProductID() {
		return this.productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public List<String> getTargetCodes() {
		return this.targetCodes;
	}

	public void setTargetCodes(List<String> targetCodes) {
		this.targetCodes = targetCodes;
	}

	public int getStartTime() {
		return this.startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public String getPartnerID() {
		return this.partnerID;
	}

	public void setPartnerID(String partnerID) {
		this.partnerID = partnerID;
	}

	public String getVersionID() {
		return this.versionID;
	}

	public void setVersionID(String versionID) {
		this.versionID = versionID;
	}

	public String getPlatformID() {
		return this.platformID;
	}

	public void setPlatformID(String platformID) {
		this.platformID = platformID;
	}

	public String getServiceCode() {
		return this.serviceCode;
	}

	public void setServiceCode(String serviceCode) {
		this.serviceCode = serviceCode;
	}

	public int getProductype() {
		return this.productype;
	}

	public void setProductype(int productype) {
		this.productype = productype;
	}

	public List<Integer> getProductIDList() {
		return this.productIDList;
	}

	public void setProductIDList(List<Integer> productIDList) {
		this.productIDList = productIDList;
	}

	public int getTodayTime() {
		return this.todayTime;
	}

	public void setTodayTime(int todayTime) {
		this.todayTime = todayTime;
	}

	public int getThrTime() {
		return this.thrTime;
	}

	public void setThrTime(int thrTime) {
		this.thrTime = thrTime;
	}

	public Map<String, String[]> getCalculatorMap() {
		return this.calculatorMap;
	}

	public void setCalculatorMap(Map<String, String[]> calculatorMap) {
		this.calculatorMap = calculatorMap;
	}

	public String getItem() {
		return this.item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getItemValue() {
		return this.itemValue;
	}

	public void setItemValue(String itemValue) {
		this.itemValue = itemValue;
	}

	public String getItemValueNum() {
		return this.itemValueNum;
	}

	public void setItemValueNum(String itemValueNum) {
		this.itemValueNum = itemValueNum;
	}

	public int getRegistertime() {
		return this.registertime;
	}

	public void setRegistertime(int registertime) {
		this.registertime = registertime;
	}

	public int getWeekstartTime() {
		return this.weekstartTime;
	}

	public void setWeekstartTime(int weekstartTime) {
		this.weekstartTime = weekstartTime;
	}

	public int getWeekendTime() {
		return this.weekendTime;
	}

	public void setWeekendTime(int weekendTime) {
		this.weekendTime = weekendTime;
	}

	public int getYweekstartTime() {
		return this.yweekstartTime;
	}

	public void setYweekstartTime(int yweekstartTime) {
		this.yweekstartTime = yweekstartTime;
	}

	public int getYweekendTime() {
		return this.yweekendTime;
	}

	public void setYweekendTime(int yweekendTime) {
		this.yweekendTime = yweekendTime;
	}

	public int getMonthstartTime() {
		return this.monthstartTime;
	}

	public void setMonthstartTime(int monthstartTime) {
		this.monthstartTime = monthstartTime;
	}

	public int getMonthendTime() {
		return this.monthendTime;
	}

	public void setMonthendTime(int monthendTime) {
		this.monthendTime = monthendTime;
	}

	public int getYmonthstartTime() {
		return this.ymonthstartTime;
	}

	public void setYmonthstartTime(int ymonthstartTime) {
		this.ymonthstartTime = ymonthstartTime;
	}

	public int getYmonthendTime() {
		return this.ymonthendTime;
	}

	public void setYmonthendTime(int ymonthendTime) {
		this.ymonthendTime = ymonthendTime;
	}

	public int getRedisEndTime() {
		return this.redisEndTime;
	}

	public void setRedisEndTime(int redisEndTime) {
		this.redisEndTime = redisEndTime;
	}

	public String getVersionIDstr() {
		return this.versionIDstr;
	}

	public void setVersionIDstr(String versionIDstr) {
		this.versionIDstr = versionIDstr;
	}

	public String getUsergrouptarget() {
		return this.usergrouptarget;
	}

	public void setUsergrouptarget(String usergrouptarget) {
		this.usergrouptarget = usergrouptarget;
	}

	public String getUsergroupstarttime() {
		return this.usergroupstarttime;
	}

	public void setUsergroupstarttime(String usergroupstarttime) {
		this.usergroupstarttime = usergroupstarttime;
	}

	public String getUsergroupendtime() {
		return this.usergroupendtime;
	}

	public void setUsergroupendtime(String usergroupendtime) {
		this.usergroupendtime = usergroupendtime;
	}

	public String getUsergroupcountry() {
		return this.usergroupcountry;
	}

	public void setUsergroupcountry(String usergroupcountry) {
		this.usergroupcountry = usergroupcountry;
	}

	public String getUsergrouparea() {
		return this.usergrouparea;
	}

	public void setUsergrouparea(String usergrouparea) {
		this.usergrouparea = usergrouparea;
	}

	public String getUsergrouplanguage() {
		return this.usergrouplanguage;
	}

	public void setUsergrouplanguage(String usergrouplanguage) {
		this.usergrouplanguage = usergrouplanguage;
	}

	public String getUsergroupmobile() {
		return this.usergroupmobile;
	}

	public void setUsergroupmobile(String usergroupmobile) {
		this.usergroupmobile = usergroupmobile;
	}

	public String getUsergroupos() {
		return this.usergroupos;
	}

	public void setUsergroupos(String usergroupos) {
		this.usergroupos = usergroupos;
	}

	public String getUsergroupispinInfo() {
		return this.usergroupispinInfo;
	}

	public void setUsergroupispinInfo(String usergroupispinInfo) {
		this.usergroupispinInfo = usergroupispinInfo;
	}

	public String getUsergroupprisonbreak() {
		return this.usergroupprisonbreak;
	}

	public void setUsergroupprisonbreak(String usergroupprisonbreak) {
		this.usergroupprisonbreak = usergroupprisonbreak;
	}

	public String getUsergroupprcrack() {
		return this.usergroupprcrack;
	}

	public void setUsergroupprcrack(String usergroupprcrack) {
		this.usergroupprcrack = usergroupprcrack;
	}

	public String getGroupUserCriteriaID() {
		return this.groupUserCriteriaID;
	}

	public void setGroupUserCriteriaID(String groupUserCriteriaID) {
		this.groupUserCriteriaID = groupUserCriteriaID;
	}

	public ChildAccount getChildaccount() {
		return this.childaccount;
	}

	public void setChildaccount(ChildAccount childaccount) {
		this.childaccount = childaccount;
	}

	public String getProductIdList() {
		return this.productIdList;
	}

	public void setProductIdList(String productIdList) {
		this.productIdList = productIdList;
	}

	public String getProplatID() {
		return this.proplatID;
	}

	public void setProplatID(String proplatID) {
		this.proplatID = proplatID;
	}

	public int getPlatformid() {
		return this.platformid;
	}

	public void setPlatformid(int platformid) {
		this.platformid = platformid;
	}

	public List<String> getKeyList() {
		return this.keyList;
	}

	public void setKeyList(List<String> keyList) {
		this.keyList = keyList;
	}

	public String getWarningname() {
		return this.warningname;
	}

	public void setWarningname(String warningname) {
		this.warningname = warningname;
	}

	public int getWarningdate() {
		return this.warningdate;
	}

	public void setWarningdate(int warningdate) {
		this.warningdate = warningdate;
	}

	public int getWarningevent() {
		return this.warningevent;
	}

	public void setWarningevent(int warningevent) {
		this.warningevent = warningevent;
	}

	public int getComparedate() {
		return this.comparedate;
	}

	public void setComparedate(int comparedate) {
		this.comparedate = comparedate;
	}

	public int getCompare() {
		return this.compare;
	}

	public void setCompare(int compare) {
		this.compare = compare;
	}

	public int getComparisonunit() {
		return this.comparisonunit;
	}

	public void setComparisonunit(int comparisonunit) {
		this.comparisonunit = comparisonunit;
	}

	public float getWarningnumber() {
		return this.warningnumber;
	}

	public void setWarningnumber(float warningnumber) {
		this.warningnumber = warningnumber;
	}

	public int getPartnername() {
		return this.partnername;
	}

	public void setPartnername(int partnername) {
		this.partnername = partnername;
	}

	public String getEmailValue() {
		return this.emailValue;
	}

	public void setEmailValue(String emailValue) {
		this.emailValue = emailValue;
	}

	public String getUsergroupeventflag() {
		return this.usergroupeventflag;
	}

	public void setUsergroupeventflag(String usergroupeventflag) {
		this.usergroupeventflag = usergroupeventflag;
	}

	public String getUsergroupeventinfo() {
		return this.usergroupeventinfo;
	}

	public void setUsergroupeventinfo(String usergroupeventinfo) {
		this.usergroupeventinfo = usergroupeventinfo;
	}

	public String toString() {
		return "ParameterBean [developerID=" + this.developerID + ", endTime=" + this.endTime + ", redisEndTime="
				+ this.redisEndTime + ", timeflag=" + this.timeflag + ", "
				+ (this.partnerID != null ? "partnerID=" + this.partnerID + ", " : "")
				+ (this.platformID != null ? "platformID=" + this.platformID + ", " : "") + ", platformid="
				+ this.platformid + ", " + (this.childaccount != null ? "childaccount=" + this.childaccount + ", " : "")
				+ (this.productIdList != null ? "productIdList=" + this.productIdList + ", " : "")
				+ (this.proplatID != null ? "proplatID=" + this.proplatID + ", " : "") + "productID=" + this.productID
				+ ", " + (this.productIDList != null ? "productIDList=" + this.productIDList + ", " : "")
				+ (this.serviceCode != null ? "serviceCode=" + this.serviceCode + ", " : "")
				+ (this.targetCodes != null ? "targetCodes=" + this.targetCodes + ", " : "") + "startTime="
				+ this.startTime + ", registertime=" + this.registertime
				+ (this.item != null ? "item=" + this.item + ", " : "")
				+ (this.itemValue != null ? "itemValue=" + this.itemValue + ", " : "")
				+ (this.itemValueNum != null ? "itemValueNum=" + this.itemValueNum + ", " : "")
				+ (this.itemValues != null ? "itemValues=" + this.itemValues + ", " : "") + ", "
				+ (this.versionID != null ? "versionID=" + this.versionID + ", " : "")
				+ (this.versionIDstr != null ? "versionIDstr=" + this.versionIDstr + ", " : "") + ", "
				+ (this.usergrouptarget != null ? "usergrouptarget=" + this.usergrouptarget + ", " : "")
				+ (this.usergroupstarttime != null ? "usergroupstarttime=" + this.usergroupstarttime + ", " : "")
				+ (this.usergroupendtime != null ? "usergroupendtime=" + this.usergroupendtime + ", " : "")
				+ (this.usergroupcountry != null ? "usergroupcountry=" + this.usergroupcountry + ", " : "")
				+ (this.usergrouparea != null ? "usergrouparea=" + this.usergrouparea + ", " : "")
				+ (this.usergrouplanguage != null ? "usergrouplanguage=" + this.usergrouplanguage + ", " : "")
				+ (this.usergroupmobile != null ? "usergroupmobile=" + this.usergroupmobile + ", " : "")
				+ (this.usergroupos != null ? "usergroupos=" + this.usergroupos + ", " : "")
				+ (this.usergroupispinInfo != null ? "usergroupispinInfo=" + this.usergroupispinInfo + ", " : "")
				+ (this.usergroupprisonbreak != null ? "usergroupprisonbreak=" + this.usergroupprisonbreak + ", " : "")
				+ (this.usergroupprcrack != null ? "usergroupprcrack=" + this.usergroupprcrack + ", " : "")
				+ (this.usergroupeventflag != null ? "usergroupeventflag=" + this.usergroupeventflag + ", " : "")
				+ (this.usergroupeventinfo != null ? "usergroupeventinfo=" + this.usergroupeventinfo + ", " : "")
				+ (this.warningname != null ? "warningname=" + this.warningname + ", " : "") + ", comparedate="
				+ this.comparedate + ", compare=" + this.compare + ", partnername=" + this.partnername + ", "
				+ (this.emailValue != null ? "emailValue=" + this.emailValue + ", " : "")
				+ (this.groupUserCriteriaID != null ? "groupUserCriteriaID=" + this.groupUserCriteriaID + ", " : "")
				+ (this.keyList != null ? "keyList=" + this.keyList : "") + "]";
	}

	public String getVersionname() {
		return this.versionname;
	}

	public void setVersionname(String versionname) {
		this.versionname = versionname;
	}

	public String getAppkey() {
		return this.appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

	public String getEventids() {
		return this.eventids;
	}

	public void setEventids(String eventids) {
		this.eventids = eventids;
	}

	public String getAppVersion() {
		return this.appVersion;
	}

	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	}

	public String getRule_ids() {
		return this.rule_ids;
	}

	public void setRule_ids(String rule_ids) {
		this.rule_ids = rule_ids;
	}

	public String getRule_name() {
		return this.rule_name;
	}

	public void setRule_name(String rule_name) {
		this.rule_name = rule_name;
	}
}
