package com.lavapm.tenant.tool;



public class UmConstant
{
  public static final String SYS_EMAIL_TEMPLATE_REGIST_PASSWORD_TEMPLATE = "RegistPasswordTemplate";
  

  public static final String SYS_EMAIL_TEMPLATE_OUTER_USER_RESET_PWD_TEMPLATE = "OuterUserResetPwdTemplate";
  

  public static final int STATUS_0 = 0;
  

  public static final int STATUS_1 = 1;
  

  public static final int IS_GRANTABLE_0 = 0;
  
  public static final int IS_GRANTABLE_1 = 1;
  
  public static final String DEFAULT_ADMIN_PASSWORD = "123456";
  
  public static final String UM_ROLE_APPADMIN = "UM_ROLE_APPADMIN";
  
  public static final String DEFAULT_MEMBER = "uid=default,ou=people,dc=wlt,dc=com";
  
  public static final String ROLE_SUFFIX = "\\_ADMIN";
  
  public static final int DEPARTMENT_USER_TYPE_ADMIN = 1;
  
  public static final int DEPARTMENT_USER_TYPE_CONTACTS = 2;
  
  public static final int DEPARTMENT_USER_TYPE_LEADER = 3;
  
  public static final int DEPARTMENT_USER_TYPE_STAFF = 4;
  
  public static final String SYSTEM = "system";
  
  public static final String SYSTEM_RESOURCES_ID = "1,2,3,10,11";
  
  public static final String UM_ADMIN = "UMAdmin";
  
  public static final String[] DEPARTMENT_GROUPS = { "staff", "admin", "contacts", "leader" };
  

  public static final String[] DEFAULT_SYSTEM_UMID = { "system", "UMAdmin" };
  

  public static final String[] DEFAULT_SYSTEM_APP_CODE = { "UM", "TEST" };
  public static final String ROLE_COLD_UM_ADMIN = "UM_ADMIN";
  
  public UmConstant() {}
}
