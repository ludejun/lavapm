package com.datamarket.viewInterface.web;

import java.sql.Timestamp;
import net.sf.json.JsonConfig;

public class WebJsonConfig extends JsonConfig {
	public static WebJsonConfig getInstance() {
		return instance;
	}

	private static WebJsonConfig instance = new WebJsonConfig();

	private WebJsonConfig() {
		registerJsonValueProcessor(java.util.Date.class, new MyDateJsonValueProcessor());
		registerJsonValueProcessor(java.sql.Date.class,	new MyDateJsonValueProcessor());
		registerJsonValueProcessor(Timestamp.class,	new MyDateJsonValueProcessor());
		IgnoreFieldPropertyFilterImpl filter = new IgnoreFieldPropertyFilterImpl(null);
		setJsonPropertyFilter(filter);
	}
}
