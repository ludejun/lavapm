package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Activeuserstate;
import com.lavapm.tenant.bean.Domain;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



























public class DomainFrame
{
  public DomainFrame() {}
  
  public String getDomainFram(Domain domainSumnewuser, Domain ydomainSumnewuser, Domain domainDeveloperSumnewuser, Domain domainDeveloperActiveuser, List<Domain> domainAllDeveloperActiveuser, List<Domain> domainAllNewuser, List<Domain> domainActiveuser, List<Domain> domainAllDeveloperNewuser, Activeuserstate activeuserstate, List<Activeuserstate> activeuserstateList, int developerid, int productid, int platformid, int endtime, int cday, Domain domainStartUp, List<Domain> domainAllStartUp)
  {
    String info = "";
    Map<String, Object> map = new HashMap();
    StringBuffer tablebuffer = new StringBuffer();
    StringBuffer tableBufferDeveloper = new StringBuffer();
    int cdy = 0;
    int sumuserCount = 1;
    int avguserCount = 1;
    int avgstartupCount = 1;
    int sumusertimeCount = 1;
    float allsevenactiveuser = 0.0F;
    float avgallsevenactiveuser = 0.0F;
    float ptmpsevenactiveuser = 0.0F;
    float pallsevenactiveuser = 0.0F;
    int sevenactiveuserCount = 1;
    float psevenactiveuser = 0.0F;
    float tmpAllsumUserTime = 0.0F;
    long sumNewuser = 0L;
    float sumAvgNewUser = 0.0F;
    float sumAllAvgNewUser = 0.0F;
    float sumAvgStartUp = 0.0F;
    float sumAllAvgStartUp = 0.0F;
    long sumUserTime = 0L;
    long sumStartUp = 0L;
    float allyactiveuser = 0.0F;
    float avgallyactiveuser = 0.0F;
    float ptmpyactiveuser = 0.0F;
    float pallyactiveuser = 0.0F;
    String dtype = "%";
    String dalltype = "%";
    int activeuserCount = 1;
    float pyactiveuser = 0.0F;
    String seventype = "%";
    String sevenalltype = "%";
    int developerSumuserCount = 1;
    int developerActiveuserCount = 1;
    long developerAllSumuser = 0L;
    float developerAllActiveuser = 0.0F;
    float tmpvagNewUser = 0.0F;
    float tmpUserTime = 0.0F;
    float tmpStartUp = 0.0F;
    float allsumNewuser = 0.0F;
    float allsumAvgNewUser = 0.0F;
    float allsumAvgStartUp = 0.0F;
    float allsumUserTime = 0.0F;
    
    long developerSumnewuser = 0L;
    float developerYactiveuser = 0.0F;
    float avgAllSumuser = 0.0F;
    float avgAllActiveuser = 0.0F;
    
    String tmpsumuserCount = "";
    String tmpavguserCount = "";
    String tmpactiveuserCount = "";
    String tmpsevenactiveuserCount = "";
    String tmpavgstartupCount = "";
    String tmpsumusertimeCount = "";
    Domain allInfoDomain = null;
    
    if ((domainDeveloperSumnewuser != null) && 
      (domainDeveloperSumnewuser.getSumnewuser() != null)) {
      developerSumnewuser = domainDeveloperSumnewuser.getSumnewuser().longValue();
    }
    
    if ((domainDeveloperActiveuser != null) && 
      (domainDeveloperActiveuser.getYactiveuser() != null)) {
      developerYactiveuser = domainDeveloperActiveuser.getYactiveuser().floatValue();
    }
    

    if (domainSumnewuser == null) {
      domainSumnewuser = new Domain();
    }
    if (domainStartUp == null) {
      domainStartUp = new Domain();
    }
    
    cdy = Util.getIntervalDays(domainSumnewuser.getMintimeflag(), endtime);
    int tmpcdy = 0;
    if (cdy > cday) {
      tmpcdy = cday;
    } else {
      tmpcdy = cdy;
    }
    Long tmpSumnewuser = Long.valueOf(0L);
    if (domainSumnewuser != null) {
      if (domainSumnewuser.getSumnewuser() != null) {
        tmpSumnewuser = domainSumnewuser.getSumnewuser();
      }
      tmpvagNewUser = Util.getAvg(tmpSumnewuser, Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
      tmpUserTime = Util.getAvg(Long.valueOf(domainSumnewuser.getSumusetime()), Long.valueOf(domainSumnewuser.getSumstartup()), ConstString.DECIMALFLAGTWO);
    }
    if (domainStartUp != null)
    {
      tmpStartUp = Util.getAvg(Long.valueOf(domainStartUp.getSumstartup()), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
    }
    if (domainAllNewuser != null) {
      for (int i = 0; i < domainAllNewuser.size(); i++) {
        allInfoDomain = (Domain)domainAllNewuser.get(i);
        
        cdy = Util.getIntervalDays(allInfoDomain.getMintimeflag(), endtime);
        if (cdy > cday) {
          tmpcdy = cday;
        } else {
          tmpcdy = cdy;
        }
        sumAvgNewUser = Util.getAvg(allInfoDomain.getSumnewuser(), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
        

        if (allInfoDomain.getSumnewuser().longValue() > tmpSumnewuser.longValue()) {
          sumuserCount += 1;
        }
        if (sumAvgNewUser > tmpvagNewUser) {
          avguserCount += 1;
        }
        tmpAllsumUserTime = Util.getAvg(Long.valueOf(allInfoDomain.getSumusetime()), Long.valueOf(allInfoDomain.getSumstartup()), ConstString.DECIMALFLAGTWO);
        if (tmpAllsumUserTime > tmpUserTime) {
          sumusertimeCount += 1;
        }
        
        sumNewuser += allInfoDomain.getSumnewuser().longValue();
        sumAllAvgNewUser += sumAvgNewUser;
        sumUserTime += allInfoDomain.getSumusetime();
        sumStartUp += allInfoDomain.getSumstartup();
      }
    }
    
    Domain allStartUpDomain = null;
    for (int j = 0; j < domainAllStartUp.size(); j++) {
      allStartUpDomain = (Domain)domainAllStartUp.get(j);
      cdy = Util.getIntervalDays(allStartUpDomain.getMintimeflag(), endtime);
      if (cdy > cday) {
        tmpcdy = cday;
      } else {
        tmpcdy = cdy;
      }
      sumAvgStartUp = Util.getAvg(Long.valueOf(allStartUpDomain.getSumstartup()), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
      if (sumAvgStartUp > tmpStartUp) {
        avgstartupCount += 1;
      }
      sumAllAvgStartUp += sumAvgStartUp;
    }
    
    allsumNewuser = Util.getAvg(Long.valueOf(sumNewuser), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    allsumAvgNewUser = Util.getAvg(Float.valueOf(sumAllAvgNewUser), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    allsumAvgStartUp = Util.getAvg(Float.valueOf(sumAllAvgStartUp), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    allsumUserTime = Util.getAvg(Long.valueOf(sumUserTime), Long.valueOf(sumStartUp), ConstString.DECIMALFLAGTWO);
    



    if ((ydomainSumnewuser != null) && (domainSumnewuser != null)) {
      pyactiveuser = Util.getPercentage(ydomainSumnewuser.getYactiveuser(), tmpSumnewuser, ConstString.DECIMALFLAGTWO);
      for (int j = 0; j < domainActiveuser.size(); j++) {
        allInfoDomain = (Domain)domainActiveuser.get(j);
        allyactiveuser += allInfoDomain.getYactiveuser().floatValue();
        ptmpyactiveuser = Util.getPercentage(allInfoDomain.getYactiveuser(), ((Domain)domainAllNewuser.get(j)).getSumnewuser(), ConstString.DECIMALFLAGTWO);
        if (ptmpyactiveuser > pyactiveuser) {
          activeuserCount += 1;
        }
        pallyactiveuser += ptmpyactiveuser;
      }
      avgallyactiveuser = Util.getAvg(Float.valueOf(allyactiveuser), Integer.valueOf(domainActiveuser.size()), ConstString.DECIMALFLAGTWO);
      
      pallyactiveuser = Util.getAvg(Float.valueOf(pallyactiveuser), Integer.valueOf(domainActiveuser.size()), ConstString.DECIMALFLAGTWO);
      if (pyactiveuser < 1.0F) {
        pyactiveuser = Util.getAvg(Float.valueOf(pyactiveuser), Double.valueOf(0.1D), ConstString.DECIMALFLAGTWO);
        dtype = "‰";
      }
      if (pallyactiveuser < 1.0F) {
        pallyactiveuser = Util.getAvg(Float.valueOf(pallyactiveuser), Double.valueOf(0.1D), ConstString.DECIMALFLAGTWO);
        dalltype = "‰";
      }
    }
    





    if (activeuserstate != null) {
      psevenactiveuser = Util.getPercentage(Integer.valueOf(activeuserstate.getSevenactive()), tmpSumnewuser, ConstString.DECIMALFLAGTWO);
      Activeuserstate sevenactiveuserstate = null;
      for (int k = 0; k < activeuserstateList.size(); k++) {
        sevenactiveuserstate = (Activeuserstate)activeuserstateList.get(k);
        allsevenactiveuser += sevenactiveuserstate.getSevenactive();
        ptmpsevenactiveuser = Util.getPercentage(Integer.valueOf(sevenactiveuserstate.getSevenactive()), Long.valueOf(((Activeuserstate)activeuserstateList.get(k)).getSumnewuser()), ConstString.DECIMALFLAGTWO);
        if (ptmpsevenactiveuser > psevenactiveuser) {
          sevenactiveuserCount += 1;
        }
        pallsevenactiveuser += ptmpsevenactiveuser;
      }
      avgallsevenactiveuser = Util.getAvg(Float.valueOf(allsevenactiveuser), Integer.valueOf(activeuserstateList.size()), ConstString.DECIMALFLAGTWO);
      pallsevenactiveuser = Util.getAvg(Float.valueOf(pallsevenactiveuser), Integer.valueOf(activeuserstateList.size()), ConstString.DECIMALFLAGTWO);
      if (psevenactiveuser < 1.0F) {
        psevenactiveuser = Util.getAvg(Float.valueOf(psevenactiveuser), Double.valueOf(0.1D), ConstString.DECIMALFLAGTWO);
        seventype = "‰";
      }
      if (pallsevenactiveuser < 1.0F) {
        pallsevenactiveuser = Util.getAvg(Float.valueOf(pallsevenactiveuser), Double.valueOf(0.1D), ConstString.DECIMALFLAGTWO);
        sevenalltype = "‰";
      }
    }
    


    sumuserCount = (int)Util.getPercentage(Integer.valueOf(sumuserCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpsumuserCount = Util.getCint(sumuserCount);
    avguserCount = (int)Util.getPercentage(Integer.valueOf(avguserCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpavguserCount = Util.getCint(avguserCount);
    activeuserCount = (int)Util.getPercentage(Integer.valueOf(activeuserCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpactiveuserCount = Util.getCint(activeuserCount);
    sevenactiveuserCount = (int)Util.getPercentage(Integer.valueOf(sevenactiveuserCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpsevenactiveuserCount = Util.getCint(sevenactiveuserCount);
    avgstartupCount = (int)Util.getPercentage(Integer.valueOf(avgstartupCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpavgstartupCount = Util.getCint(avgstartupCount);
    sumusertimeCount = (int)Util.getPercentage(Integer.valueOf(sumusertimeCount), Integer.valueOf(domainAllNewuser.size()), ConstString.DECIMALFLAGTWO);
    tmpsumusertimeCount = Util.getCint(sumusertimeCount);
    



    if ((domainAllDeveloperNewuser != null) && (domainAllDeveloperNewuser.size() > 0)) {
      for (int k = 0; k < domainAllDeveloperNewuser.size(); k++) {
        allInfoDomain = (Domain)domainAllDeveloperNewuser.get(k);
        developerAllSumuser += allInfoDomain.getSumnewuser().longValue();
        if (allInfoDomain.getSumnewuser().longValue() > developerSumnewuser) {
          developerSumuserCount += 1;
        }
      }
    }
    

    if ((domainAllDeveloperActiveuser != null) && (domainAllDeveloperActiveuser.size() > 0)) {
      for (int l = 0; l < domainAllDeveloperActiveuser.size(); l++) {
        allInfoDomain = (Domain)domainAllDeveloperNewuser.get(l);
        developerAllActiveuser += allInfoDomain.getYactiveuser().floatValue();
        if (allInfoDomain.getYactiveuser().floatValue() > developerYactiveuser) {
          developerActiveuserCount += 1;
        }
      }
    }
    

    avgAllSumuser = Util.getAvg(Long.valueOf(developerAllSumuser), Integer.valueOf(domainAllDeveloperNewuser.size()), ConstString.DECIMALFLAGTWO);
    avgAllActiveuser = Util.getAvg(Float.valueOf(developerAllActiveuser), Integer.valueOf(domainAllDeveloperNewuser.size()), ConstString.DECIMALFLAGTWO);
    
    developerSumuserCount = (int)Util.getPercentage(Integer.valueOf(developerSumuserCount), Integer.valueOf(domainAllDeveloperNewuser.size()), ConstString.DECIMALFLAGTWO);
    developerActiveuserCount = (int)Util.getPercentage(Integer.valueOf(developerActiveuserCount), Integer.valueOf(domainAllDeveloperActiveuser.size()), ConstString.DECIMALFLAGTWO);
    

    String developerSumuserCountstr = Util.getCint(developerSumuserCount);
    String developerActiveuserCountstr = Util.getCint(developerActiveuserCount);
    tableBufferDeveloper.append("保有用户量," + developerSumnewuser + "," + avgAllSumuser + "," + developerSumuserCountstr + "&");
    tableBufferDeveloper.append("日启动用户," + Util.getDecimal(developerYactiveuser, ConstString.DECIMALFLAGTWO) + "," + avgAllActiveuser + "," + developerActiveuserCountstr);
    

    if (domainSumnewuser != null) {
      tablebuffer.append("累计用户总量," + tmpSumnewuser + "," + (int)allsumNewuser + "," + tmpsumuserCount + "&");
    } else {
      tablebuffer.append("累计用户总量,0," + (int)allsumNewuser + "," + tmpsumuserCount + "&");
    }
    
    tablebuffer.append("每日新增用户," + (int)tmpvagNewUser + "," + (int)allsumAvgNewUser + "," + tmpavguserCount + "&");
    float yactiveusertmp = 0.0F;
    float sevenactivetmp = 0.0F;
    if (ydomainSumnewuser != null) {
      yactiveusertmp = ydomainSumnewuser.getYactiveuser().floatValue();
    }
    tablebuffer.append("日活跃(%)," + (int)Util.getDecimal(yactiveusertmp, ConstString.DECIMALFLAGTWO) + "(" + pyactiveuser + dtype + ")" + "," + (int)avgallyactiveuser + "(" + pallyactiveuser + dalltype + ")" + "," + tmpactiveuserCount + "&");
    

    if (activeuserstate != null) {
      sevenactivetmp = activeuserstate.getSevenactive();
    }
    tablebuffer.append("周活跃(%)," + (int)Util.getDecimal(sevenactivetmp, ConstString.DECIMALFLAGTWO) + "(" + psevenactiveuser + seventype + ")" + "," + (int)avgallsevenactiveuser + "(" + pallsevenactiveuser + sevenalltype + ")" + "," + tmpsevenactiveuserCount + "&");
    

    tablebuffer.append("平均启动次数," + (int)tmpStartUp + "," + (int)allsumAvgStartUp + "," + tmpavgstartupCount + "&");
    tablebuffer.append("平均使用时长," + Util.floatToTime(tmpUserTime) + "," + Util.floatToTime(allsumUserTime) + "," + tmpsumusertimeCount);
    map.put("tableInfo", tablebuffer.toString());
    map.put("tableInfodeveloper", tableBufferDeveloper.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
