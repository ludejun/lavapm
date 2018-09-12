package com.enterprise.common.web;

import java.text.*;
import java.util.*;
import td.enterprise.dmp.common.exception.*;
import org.apache.commons.lang.*;
import td.enterprise.dmp.common.util.*;

public class MessageHelper
{
    private static Map<String, String> errorMessage = LoadPropertiesUtil.loadProperties("message.properties");
    
    public static String getErrorMessage(String code) {
        try {
        	String ret = MessageHelper.errorMessage.get(code);
            return ret;
        }
        catch (Exception e) {
            return null;
        }
    }
    
    public static String getErrorMessage(String code, Object[] msgArgs) {
        try {
            String ret = MessageHelper.errorMessage.get(code);
            if (ret == null) {
                return null;
            }
            MessageFormat formatter = new MessageFormat("");
            formatter.setLocale(Locale.getDefault());
            formatter.applyPattern(ret);
            String output = formatter.format(msgArgs);
            return output;
        }
        catch (Exception e) {
            return null;
        }
    }
    
    public static String getErrorMessage(BusinessException e) {
        if (e == null) {
            return null;
        }
        if (e.getCode() != null) {
            if (e.getMsgArgs() != null) {
                return getErrorMessage(e.getCode(), e.getMsgArgs());
            }
            String errorMsg = getErrorMessage(e.getCode());
            if (errorMsg != null) {
                return errorMsg;
            }
            return e.getCode();
        }
        else {
            if (e.getCause() == null) {
                return null;
            }
            if (StringUtils.isNotBlank(e.getMessage())) {
                return e.getMessage();
            }
            return e.getCause().getMessage();
        }
    }
}
