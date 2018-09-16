package com.lavapm.common.constant;

public enum DmpThemeEnum {
	RESOURCE_PATH("dmp.theme.resource.path"), LOGIN_LOGO("dmp.theme.login.logo"), LOGIN_TEXT("dmp.theme.login.text"), COPY_RIGHT_TEXT("dmp.theme.copy.right.text"), LOGIN_BACKGROUND("dmp.theme.login.background"), PRODUCT_LOGO("dmp.theme.product.logo"), NAV_LOGO("dmp.theme.app.nav.logo"), MENU_LOGO("dmp.theme.app.menu.logo"), THEME_TYPE_IMG("1"), THEME_TYPE_TEXT("2");

	private String themeCode;

	private DmpThemeEnum(String themeCode) {
		this.themeCode = themeCode;
	}

	public String themeCode() {
		return this.themeCode;
	}
}
