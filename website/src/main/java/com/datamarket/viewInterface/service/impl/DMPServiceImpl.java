package com.datamarket.viewInterface.service.impl;

import com.datamarket.viewInterface.service.DMPService;
import com.tendcloud.enterprise.um.umic.entity.Role;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.rmi.SecurityService;
import com.tendcloud.enterprise.um.umic.rmi.UmRmiServiceFactory;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DMPServiceImpl
  implements DMPService
{
  @Value("${app.code}")
  private String appCode;
  @Value("${app.admin.role}")
  private String appAdminRole;
  @Value("${app.user.role}")
  private String appUserRole;
  
  public String checkUserAuth(String tdppt)
    throws Exception
  {
    return checkAuth(tdppt, this.appUserRole);
  }
  
  public String checkAdminAuth(String tdppt)
    throws Exception
  {
    return checkAuth(tdppt, this.appAdminRole);
  }
  
  private String checkAuth(String tdppt, String roleCode)
    throws Exception
  {
    if (StringUtils.isEmpty(tdppt)) {
      throw new IllegalArgumentException("The tdppt is null.");
    }
    User user = UmRmiServiceFactory.getSecurityService().getUserByUmId(tdppt);
    if (user != null)
    {
      List<Role> roles = UmRmiServiceFactory.getSecurityService().getRolesByUmid(user.getUmid(), this.appCode);
      
      boolean hasUserRole = false;
      for (Role role : roles) {
        if (roleCode.equals(role.getRoleCode()))
        {
          hasUserRole = true;
          break;
        }
      }
      if (hasUserRole) {
        return user.getUmid();
      }
    }
    throw new RuntimeException(String.format("The user whose tdppt is %s not found.", new Object[] { tdppt }));
  }
}
