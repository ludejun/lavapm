package com.lavapm.tenant.tool;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.codec.digest.DigestUtils;

public class SecurityUtil {
	public SecurityUtil() {
	}

	public static String md5(String str) {
		return DigestUtils.md5Hex(str);
	}

	public static String encode(String inStr) {
		inStr = DigestUtils.md5Hex(inStr);
		char[] a = inStr.toCharArray();
		for (int i = 0; i < a.length; i++) {
			a[i] = ((char) (a[i] ^ 0x73));
		}
		String s = new String(a);
		return s;
	}

	public static String decode(String inStr) {
		char[] a = inStr.toCharArray();
		for (int i = 0; i < a.length; i++) {
			a[i] = ((char) (a[i] ^ 0x73));
		}
		String k = new String(a);
		return k;
	}

	public static String getRandomNum() {
		int randomNum = (int) (Math.random() * 900000.0D + 100000.0D);
		String md5Str = md5(randomNum + "");
		md5Str = md5Str.substring(0, 9);
		md5Str = md5Str.toLowerCase();
		String first = md5Str.substring(0, 1).toUpperCase();
		String rest = md5Str.substring(1, md5Str.length());
		String newStr = first + rest;

		return newStr;
	}
}
