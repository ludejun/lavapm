package com.lavapm.tenant.tool;

import java.util.ArrayList;
import java.util.List;

import com.lavapm.tenant.bean.Daydata;








public class Algorithm
{
  public Algorithm() {}
  
  public static List aggregation(List listInfo)
  {
    ArrayList retval = new ArrayList();
    
    int dnewuser = 0;
    int sumnewuser = 0;
    int dactiveuser = 0;
    int sumactiveuser = 0;
    int dusetime = 0;
    int sumusetime = 0;
    int dstartup = 0;
    int sumstartup = 0;
    int timeflag = 0;
    
    if (listInfo.size() <= 30) {
      return listInfo;
    }
    
    int interval = 7;
    

    if ((listInfo.size() < 100) && (listInfo.size() > 30)) {
      interval = 3;
    }
    

    int loop = listInfo.size() / interval;
    

    int remain = listInfo.size() % interval;
    


    Daydata daydata = new Daydata();
    
    int counter = 0;
    
    for (int i = 0; i < loop * interval; i++) {
      counter++;
      daydata = (Daydata)listInfo.get(i);
      if (counter % interval == 0)
      {
        dnewuser += daydata.getDnewuser();
        sumnewuser += daydata.getSumnewuser();
        dactiveuser += daydata.getDactiveuser();
        sumactiveuser += daydata.getSumactiveuser();
        dusetime += daydata.getDusetime();
        sumusetime += daydata.getSumusetime();
        dstartup += daydata.getDstartup();
        sumstartup += daydata.getSumstartup();
        timeflag += daydata.getTimeflag();
        



        Daydata insertdata = new Daydata();
        insertdata.setDeveloperid(daydata.getDeveloperid());
        insertdata.setProductid(daydata.getProductid());
        insertdata.setPlatformid(daydata.getPlatformid());
        insertdata.setProductype(daydata.getProductype());
        insertdata.setPartnerid(daydata.getPartnerid());
        insertdata.setDnewuser(dnewuser / interval);
        insertdata.setSumnewuser(sumnewuser / interval);
        insertdata.setDactiveuser(dactiveuser / interval);
        insertdata.setSumactiveuser(sumactiveuser / interval);
        insertdata.setDusetime(dusetime / interval);
        insertdata.setSumusetime(sumusetime / interval);
        insertdata.setDstartup(dstartup / interval);
        insertdata.setSumstartup(sumstartup / interval);
        insertdata.setTimeflag(timeflag / interval);
        
        retval.add(insertdata);
        


        dnewuser = 0;
        sumnewuser = 0;
        dactiveuser = 0;
        sumactiveuser = 0;
        dusetime = 0;
        sumusetime = 0;
        dstartup = 0;
        sumstartup = 0;
        timeflag = 0;
      }
      else {
        dnewuser += daydata.getDnewuser();
        sumnewuser += daydata.getSumnewuser();
        dactiveuser += daydata.getDactiveuser();
        sumactiveuser += daydata.getSumactiveuser();
        dusetime += daydata.getDusetime();
        sumusetime += daydata.getSumusetime();
        dstartup += daydata.getDstartup();
        sumstartup += daydata.getSumstartup();
        timeflag += daydata.getTimeflag();
      }
    }
    
    if (remain > 0)
    {
      dnewuser = 0;
      sumnewuser = 0;
      dactiveuser = 0;
      sumactiveuser = 0;
      dusetime = 0;
      sumusetime = 0;
      dstartup = 0;
      sumstartup = 0;
      timeflag = 0;
      

      for (int i = listInfo.size(); i > listInfo.size() - remain; i--) {
        daydata = (Daydata)listInfo.get(i - 1);
        
        dnewuser += daydata.getDnewuser();
        sumnewuser += daydata.getSumnewuser();
        dactiveuser += daydata.getDactiveuser();
        sumactiveuser += daydata.getSumactiveuser();
        dusetime += daydata.getDusetime();
        sumusetime += daydata.getSumusetime();
        dstartup += daydata.getDstartup();
        sumstartup += daydata.getSumstartup();
        timeflag += daydata.getTimeflag();
      }
      



      Daydata insertdata = new Daydata();
      
      insertdata.setDeveloperid(daydata.getDeveloperid());
      insertdata.setProductid(daydata.getProductid());
      insertdata.setPlatformid(daydata.getPlatformid());
      insertdata.setProductype(daydata.getProductype());
      insertdata.setPartnerid(daydata.getPartnerid());
      insertdata.setDnewuser(dnewuser / remain);
      insertdata.setSumnewuser(sumnewuser / remain);
      insertdata.setDactiveuser(dactiveuser / remain);
      insertdata.setSumactiveuser(sumactiveuser / remain);
      insertdata.setDusetime(dusetime / remain);
      insertdata.setSumusetime(sumusetime / remain);
      insertdata.setDstartup(dstartup / remain);
      insertdata.setSumstartup(sumstartup / remain);
      insertdata.setTimeflag(timeflag / remain);
      
      retval.add(insertdata);
    }
    
    return retval;
  }
  









  public static ArrayList<Integer> aggregation(ArrayList<Integer> listInfo)
  {
    ArrayList retval = new ArrayList();
    
    Integer value = null;
    

    if (listInfo.size() <= 30) {
      return listInfo;
    }
    
    int interval = 7;
    

    if ((listInfo.size() < 100) && (listInfo.size() > 30)) {
      interval = 3;
    }
    

    int loop = listInfo.size() / interval;
    

    int remain = listInfo.size() % interval;
    
    int counter = 0;
    
    for (int i = 0; i < loop * interval; i++) {
      counter++;
      Integer tmpnum = null;
      if (listInfo.get(i) != null) {
        tmpnum = (Integer)listInfo.get(i);
      }
      if (counter % interval == 0) {
        if (tmpnum != null) {
          if (value == null) {
            value = Integer.valueOf(0);
          }
          value = Integer.valueOf(value.intValue() + tmpnum.intValue());
        }
        

        if (value != null) {
          value = Integer.valueOf(value.intValue() / interval);
        }
        retval.add(value);
        

        value = null;

      }
      else if (tmpnum != null) {
        if (value == null) {
          value = Integer.valueOf(0);
        }
        value = Integer.valueOf(value.intValue() + tmpnum.intValue());
      }
    }
    

    if (remain > 0)
    {
      value = null;
      
      for (int i = listInfo.size() - 1; i >= listInfo.size() - remain; i--) {
        Integer tmpnum = null;
        if (listInfo.get(i) != null) {
          tmpnum = (Integer)listInfo.get(i);
        }
        if (tmpnum != null) {
          if (value == null) {
            value = Integer.valueOf(0);
          }
          value = Integer.valueOf(value.intValue() + tmpnum.intValue());
        }
      }
      
      if (value != null) {
        value = Integer.valueOf(value.intValue() / (listInfo.size() - remain));
      }
      retval.add(value);
    }
    
    return retval;
  }
  










  public static ArrayList<Long> aggregationLong(ArrayList<Long> listInfo)
  {
    ArrayList retval = new ArrayList();
    
    Long value = null;
    

    if (listInfo.size() <= 30) {
      return listInfo;
    }
    
    int interval = 7;
    

    if ((listInfo.size() < 100) && (listInfo.size() > 30)) {
      interval = 3;
    }
    

    int loop = listInfo.size() / interval;
    

    int remain = listInfo.size() % interval;
    
    int counter = 0;
    
    for (int i = 0; i < loop * interval; i++) {
      counter++;
      Long tmpnum = null;
      if (listInfo.get(i) != null) {
        tmpnum = (Long)listInfo.get(i);
      }
      if (counter % interval == 0) {
        if (tmpnum != null) {
          if (value == null) {
            value = Long.valueOf(0L);
          }
          value = Long.valueOf(value.longValue() + tmpnum.longValue());
        }
        

        if (value != null) {
          value = Long.valueOf(value.longValue() / interval);
        }
        retval.add(value);
        

        value = null;

      }
      else if (tmpnum != null) {
        if (value == null) {
          value = Long.valueOf(0L);
        }
        value = Long.valueOf(value.longValue() + tmpnum.longValue());
      }
    }
    

    if (remain > 0)
    {
      value = null;
      
      for (int i = listInfo.size() - 1; i >= listInfo.size() - remain; i--) {
        Long tmpnum = null;
        if (listInfo.get(i) != null) {
          tmpnum = (Long)listInfo.get(i);
        }
        if (tmpnum != null) {
          if (value == null) {
            value = Long.valueOf(0L);
          }
          value = Long.valueOf(value.longValue() + tmpnum.longValue());
        }
      }
      
      if (value != null) {
        value = Long.valueOf(value.longValue() / (listInfo.size() - remain));
      }
      retval.add(value);
    }
    
    return retval;
  }
  
  public static ArrayList<Float> aggregationFloat(ArrayList<Float> listInfo)
  {
    ArrayList retval = new ArrayList();
    
    Float value = null;
    

    if (listInfo.size() <= 30) {
      return listInfo;
    }
    
    int interval = 7;
    

    if ((listInfo.size() < 100) && (listInfo.size() > 30)) {
      interval = 3;
    }
    

    int loop = listInfo.size() / interval;
    

    int remain = listInfo.size() % interval;
    




    int counter = 0;
    
    for (int i = 0; i < loop * interval; i++) {
      counter++;
      Float tmpnum = null;
      if (listInfo.get(i) != null) {
        tmpnum = (Float)listInfo.get(i);
      }
      if (counter % interval == 0) {
        if (tmpnum != null) {
          if (value == null) {
            value = Float.valueOf(0.0F);
          }
          value = Float.valueOf(value.floatValue() + tmpnum.floatValue());
        }
        

















        if (value != null) {
          value = Float.valueOf(value.floatValue() / interval);
        }
        retval.add(value);
        

        value = null;

      }
      else if (tmpnum != null) {
        if (value == null) {
          value = Float.valueOf(0.0F);
        }
        value = Float.valueOf(value.floatValue() + tmpnum.floatValue());
      }
    }
    


    if (remain > 0)
    {
      value = null;
      
      for (int i = listInfo.size() - 1; i >= listInfo.size() - remain; i--) {
        Float tmpnum = null;
        if (listInfo.get(i) != null) {
          tmpnum = (Float)listInfo.get(i);
        }
        if (tmpnum != null) {
          if (value == null) {
            value = Float.valueOf(0.0F);
          }
          value = Float.valueOf(value.floatValue() + tmpnum.floatValue());
        }
      }
      if (value != null) {
        value = Float.valueOf(value.floatValue() / (listInfo.size() - remain));
      }
      






      retval.add(value);
    }
    
    return retval;
  }
  
  public static void main(String[] args)
  {
    ArrayList input = new ArrayList();
    
    for (int i = 0; i < 40; i++) {
      Daydata insertdata = new Daydata();
      
      insertdata.setDnewuser(i);
      insertdata.setSumnewuser(i);
      insertdata.setDactiveuser(i);
      insertdata.setSumactiveuser(i);
      insertdata.setDusetime(i);
      insertdata.setSumusetime(i);
      insertdata.setDstartup(i);
      insertdata.setSumstartup(i);
      
      input.add(insertdata);
    }
    
    List output = aggregation(input);
    Daydata d;
    for (int i = 0; i < output.size(); i++) {
      d = (Daydata)output.get(i);
    }
  }
}
