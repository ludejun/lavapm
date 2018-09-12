package com.lavapm.util;

import java.util.Properties;

public class CasConfig {
	private static Properties config;

	public void setConfig(Properties config) {
		config = config;
	}

	public static Properties get() {
		return config;
	}
}
