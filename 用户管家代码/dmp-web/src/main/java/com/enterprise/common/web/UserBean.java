package com.enterprise.common.web;

public class UserBean
{
    private String oldPassword;
    private String newPassword;
    
    public String getOldPassword() {
        return this.oldPassword;
    }
    
    public void setOldPassword(final String oldPassword) {
        this.oldPassword = oldPassword;
    }
    
    public String getNewPassword() {
        return this.newPassword;
    }
    
    public void setNewPassword(final String newPassword) {
        this.newPassword = newPassword;
    }
}
