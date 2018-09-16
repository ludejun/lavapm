package com.lavapm.util;

import java.util.UUID;

public class CodeUtils {
	public static String getUUID() {
		String uuid = UUID.randomUUID().toString();
		return uuid.toUpperCase();
	}
}
