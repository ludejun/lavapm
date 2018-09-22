package com.lavapm.tenant.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.lavapm.tenant.bean.Developer;
import com.lavapm.tenant.bean.DeveloperAPI;
import com.lavapm.tenant.bean.search.DeveloperSearch;
import com.lavapm.tenant.bean.search.EarliestRetistertimeSearch;
import com.lavapm.tenant.tool.CreatLog;
import com.lavapm.tenant.tool.Util;

import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("developerDao")
public class DeveloperDao
{
  @Autowired
  private SqlMapClient sqlEnterpriseMapClient;
  private Developer developer = null;
  

  public DeveloperDao() {}
  

  public boolean checkEmailInfo(String email)
  {
    boolean emailflag = false;
    int tmpflag = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("CheckEmail", email);
        if (obj != null) {
          tmpflag = Util.strToInt(String.valueOf(obj));
        }
        if (tmpflag != 0) {
          emailflag = true;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "checkEmailInfo", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "checkEmailInfo", "没有获取到连接");
    }
    return emailflag;
  }
  







  public boolean checkNameInfo(String name)
  {
    boolean nameflag = false;
    int tmpflag = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("CheckName", name);
        if (obj != null) {
          tmpflag = Util.strToInt(String.valueOf(obj));
        }
        if (tmpflag != 0) {
          nameflag = true;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "checkNameInfo", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "checkNameInfo", "没有获取到连接");
    }
    return nameflag;
  }
  





  public Developer longinUser(DeveloperSearch dlSearch)
  {
    if (sqlEnterpriseMapClient != null) {
      try
      {
        developer = ((Developer)sqlEnterpriseMapClient.queryForObject("SelectDeveloperLogin", dlSearch));
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "longinUser", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "longinUser", "没有获取到连接");
    }
    return developer;
  }
  
  public String getSalt(String email)
  {
    String salt = "";
    if (sqlEnterpriseMapClient != null) {
      try
      {
        salt = (String)sqlEnterpriseMapClient.queryForObject("SelectDeveloperSalt", email);
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getSalt", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "getSalt", "没有获取到连接");
    }
    return salt;
  }
  




  public int insertDeveloper(Developer developer)
  {
    int insertFlag = 0;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object developerobj = sqlEnterpriseMapClient.insert("InsertDeveloper", developer);
        if (developerobj != null) {
          insertFlag = Integer.parseInt(String.valueOf(developerobj));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "insertDeveloper", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "insertDeveloper", "没有获取到连接");
    }
    return insertFlag;
  }
  





  public int selectDeveloperPassWord(DeveloperSearch dlSearch)
  {
    int developerid = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectDeveloperPassWord", dlSearch);
        if (obj != null) {
          developerid = Util.strToInt(String.valueOf(obj));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "selectDeveloperPassWord", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "selectDeveloperPassWord", "没有获取到连接");
    }
    return developerid;
  }
  





  public Integer getProductCount(String email)
  {
    int productcount = 10;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectProductCount", email);
        if (obj != null) {
          productcount = Util.strToInt(String.valueOf(obj));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getProductCount", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "getProductCount", "没有获取到连接");
    }
    return Integer.valueOf(productcount);
  }
  



  public Developer getDeveloper(int developerid)
  {
    Developer dev = null;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectLoginName", Integer.valueOf(developerid));
        if (obj != null) {
          dev = (Developer)obj;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getLoginName", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "getLoginName", "没有获取到连接");
    }
    return dev;
  }
  



  public Developer setActivateMail(int developerid)
  {
    Developer dev = null;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        sqlEnterpriseMapClient.update("updateDeveloperActivate", Integer.valueOf(developerid));
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "setActivateMail", "更新数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "setActivateMail", "没有获取到连接");
    }
    return dev;
  }
  



  public String selectDeveloperEarlistRegistertime(int developerid, Integer category)
  {
    Developer devregistertimeObj = null;
    EarliestRetistertimeSearch earlist = null;
    String ealisterRegistertime = "";
    if (sqlEnterpriseMapClient != null) {
      try {
        earlist = new EarliestRetistertimeSearch();
        earlist.setDeveloperid(developerid);
        earlist.setCategory(category);
        List<Developer> ealisterRegistertimes = sqlEnterpriseMapClient.queryForList("SelectEarliestRegistertime", earlist);
        
        if ((ealisterRegistertimes != null) && (ealisterRegistertimes.size() != 0)) {
          devregistertimeObj = (Developer)ealisterRegistertimes.get(0);
        }
        if (devregistertimeObj != null) {
          ealisterRegistertime = Util.getTimeToStr(devregistertimeObj.getEarlistregistertime());
        }
      }
      catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "SelectEarliestRegistertime", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("ProductDao", "selectRegistertime", "没有获取到连接");
    }
    return ealisterRegistertime;
  }
  




  public Developer getDeveloperID()
  {
    Developer developer = null;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object object = sqlEnterpriseMapClient.queryForObject("getDeveloperID");
        if (object != null) {
          developer = (Developer)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDeveloperByEmail", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("ProductDao", "getDeveloperByEmail", "没有获取到连接");
    }
    return developer;
  }
  

  public Developer getDeveloperIDbyId(int id)
  {
    Developer developer = new Developer();
    developer.setDeveloperid(id);
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object object = sqlEnterpriseMapClient.queryForObject("getDeveloperIDbyid", developer);
        if (object != null) {
          developer = (Developer)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDeveloperByEmail", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("ProductDao", "getDeveloperByEmail", "没有获取到连接");
    }
    return developer;
  }
  
  public int getDeveloperByDzId(int uid)
  {
    int developerid = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectDzDeveloperDeveloperid", Integer.valueOf(uid));
        if (obj != null) {
          developerid = Util.strToInt(String.valueOf(obj));
        }
      } catch (SQLException e) {
        CreatLog.setDzError("DeveloperDao", "getDeveloperByDzId", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setDzError("DeveloperDao", "getDeveloperByDzId", "没有获取到连接");
    }
    return developerid;
  }
  
  public int getDzDeveloperBindingIdByUid(int uid)
  {
    int developerid = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectDzDeveloperBindingIdByUid", Integer.valueOf(uid));
        if (obj != null) {
          developerid = Util.strToInt(String.valueOf(obj));
        }
      } catch (SQLException e) {
        CreatLog.setDzError("DeveloperDao", "getDzDeveloperBindingIdByUid", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setDzError("DeveloperDao", "getDzDeveloperBindingIdByUid", "没有获取到连接");
    }
    return developerid;
  }
  
  public boolean checkEmailInfoByDz(int uid) {
    boolean emailflag = false;
    
    int tmpflag = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("SelectDzDeveloperCount", Integer.valueOf(uid));
        if (obj != null) {
          tmpflag = Util.strToInt(String.valueOf(obj));
        }
        if (tmpflag == 0) {
          emailflag = true;
        }
      } catch (SQLException e) {
        CreatLog.setDzError("DeveloperDao", "checkEmailInfoByDz", "读取数据错误[uid=" + uid + "]：" + e.getMessage());
      }
      
    } else {
      CreatLog.setDzError("DeveloperDao", "checkEmailInfoByDz", "没有获取到连接[uid=" + uid + "]");
    }
    return emailflag;
  }
  
  public boolean checkEmailInfoByDzEmail(String email) {
    boolean emailflag = false;
    
    int tmpflag = 0;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object obj = sqlEnterpriseMapClient.queryForObject("CheckDzEmail", email);
        if (obj != null) {
          tmpflag = Util.strToInt(String.valueOf(obj));
        }
        if (tmpflag == 0) {
          emailflag = true;
        }
      } catch (SQLException e) {
        CreatLog.setDzError("DeveloperDao", "checkEmailInfoByDzEmail", "读取数据错误[email=" + email + "]：" + e.getMessage());
      }
      
    } else {
      CreatLog.setDzError("DeveloperDao", "checkEmailInfoByDzEmail", "没有获取到连接[email=" + email + "]");
    }
    return emailflag;
  }
  

















  public void deleteUserById(int developerid)
  {
    if (sqlEnterpriseMapClient != null) {
      try
      {
        sqlEnterpriseMapClient.queryForObject("deleteuser", Integer.valueOf(developerid));
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "developerById", "删除数据错误" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "developerById", "没有获取到连接");
    }
  }
  





  public int insertDzDeveloperByDeveloper(Developer developer)
  {
    int insertFlag = 0;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object developerobj = sqlEnterpriseMapClient.insert("InsertDeveloperForDz", developer);
        if (developerobj != null) {
          insertFlag = Integer.parseInt(String.valueOf(developerobj));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "insertDzDeveloper", "保存数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "insertDzDeveloper", "没有获取到连接");
    }
    return insertFlag;
  }
  



  public Developer getDzDeveloperByDeveId(int developerid)
  {
    Developer developer = null;
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object object = sqlEnterpriseMapClient.queryForObject("getDzDeveloperById", Integer.valueOf(developerid));
        if (object != null) {
          developer = (Developer)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDzDeveloperByDeveId", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("ProductDao", "getDzDeveloperByDeveId", "没有获取到连接");
    }
    return developer;
  }
  

  public boolean setDzUserPassWordToDeveloper(Developer developer)
  {
    boolean flag = true;
    
    if (sqlEnterpriseMapClient != null) {
      try {
        sqlEnterpriseMapClient.update("updateDzToDeveloper", developer);
      } catch (SQLException e) {
        flag = false;
        CreatLog.setError("DeveloperDao", "setDzUserPassWordToDeveloper", "更新数据错误：" + e.getMessage());
      }
    }
    else {
      flag = false;
      CreatLog.setError("ProductDao", "checkBandding", "没有获取到连接");
    }
    return flag;
  }
  
  public boolean checkBinding(int uid)
  {
    boolean flag = true;
    
    if (sqlEnterpriseMapClient != null)
    {
      try {
        Object object = sqlEnterpriseMapClient.queryForObject("SelectDzDeveloperBinding", Integer.valueOf(uid));
        if (object != null) {
          int bindingid = Util.strToInt(String.valueOf(object));
          if (bindingid != 0) {
            flag = false;
          }
        } else {
          flag = false;
        }
      } catch (SQLException e) {
        flag = false;
        CreatLog.setError("DeveloperDao", "checkBandding", "读取数据错误：" + e.getMessage());
      }
    }
    else {
      flag = false;
      CreatLog.setError("ProductDao", "checkBandding", "没有获取到连接");
    }
    return flag;
  }
  
  public int getUidByEmail(String email)
  {
    int bindingid = 0;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object object = sqlEnterpriseMapClient.queryForObject("SelectDzDeveloperByEmail", email);
        if (object != null) {
          bindingid = Util.strToInt(String.valueOf(object));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getUidByEmail", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("ProductDao", "getUidByEmail", "没有获取到连接");
    }
    return bindingid;
  }
  

























  public Developer getDeveloperByCSDNUserName(String username)
  {
    Developer dev = null;
    

    if (sqlEnterpriseMapClient != null) {
      try {
        Object object = sqlEnterpriseMapClient.queryForObject("SelectCSDNDeveloper", username);
        if (object != null) {
          dev = (Developer)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDeveloperByCSDNUID", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("DeveloperDao", "getDeveloperByCSDNUID", "没有获取到连接");
    }
    
    return dev;
  }
  



  public Developer getDeveloperByCSDNEmail(String email)
  {
    Developer dev = null;
    

    if (sqlEnterpriseMapClient != null) {
      try {
        Object object = sqlEnterpriseMapClient.queryForObject("SelectCSDNDeveloperByEmail", email);
        if (object != null) {
          dev = (Developer)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDeveloperByCSDNEmail", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("DeveloperDao", "getDeveloperByCSDNEmail", "没有获取到连接");
    }
    
    return dev;
  }
  





  public int insertCSDNDeveloper(Developer developer)
  {
    int insertFlag = 0;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        Object developerobj = sqlEnterpriseMapClient.insert("InsertCSDNDeveloper", developer);
        if (developerobj != null) {
          insertFlag = Integer.parseInt(String.valueOf(developerobj));
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "insertCSDNDeveloper", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "insertCSDNDeveloper", "没有获取到连接");
    }
    return insertFlag;
  }
  



  public int updateCSDNDeveloper(Developer developer)
  {
    int result = -1;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        sqlEnterpriseMapClient.update("updateCSDNDeveloper", developer);
        result = 0;
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "updateCSDNDeveloper", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "updateCSDNDeveloper", "没有获取到连接");
    }
    return result;
  }
  
  public int updatePasswordByEmail(Developer developer) {
    int result = -1;
    
    if (sqlEnterpriseMapClient != null) {
      try
      {
        sqlEnterpriseMapClient.update("updatePasswordByEmail", developer);
        result = 0;
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "updatePasswordByEmail", "读取数据错误：" + e.getMessage());
      }
      
    } else {
      CreatLog.setError("DeveloperDao", "updatePasswordByEmail", "没有获取到连接");
    }
    return result;
  }
  


  public int addDeveloperAPI(DeveloperAPI apiObj)
  {
    int insertFlag = -1;
    
    if (sqlEnterpriseMapClient != null) {
      try {
        sqlEnterpriseMapClient.insert("InsertDeveloperAPI", apiObj);
        insertFlag = 0;
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "addDeveloperAPI", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("DeveloperDao", "addDeveloperAPI", "没有获取到连接");
    }
    return insertFlag;
  }
  



  public DeveloperAPI getDeveloperAPI(int developerid)
  {
    DeveloperAPI api = new DeveloperAPI();
    
    if (sqlEnterpriseMapClient != null) {
      try {
        Object object = sqlEnterpriseMapClient.queryForObject("selectDeveloperAPIByDevID", Integer.valueOf(developerid));
        if (object != null) {
          api = (DeveloperAPI)object;
        }
      } catch (SQLException e) {
        CreatLog.setError("DeveloperDao", "getDeveloperAPI", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("DeveloperDao", "getDeveloperAPI", "没有获取到连接");
    }
    return api;
  }
}
