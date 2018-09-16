package com.datamarket.viewInterface.entity;

import java.util.List;
import java.util.Map;

public class Request {
	private String trace;
	private String path;
	private String httpMethod;
	private String token;
	private String from;
	private String param = "";
	private Map<String, List<String>> queryParams;

	public Request(String path, String httpMethod) {
		this.path = path;
		this.httpMethod = httpMethod;
	}

	public Request(String path, Map<String, List<String>> queryParams,
			String httpMethod) {
		this(path, httpMethod);
		this.queryParams = queryParams;
	}

	public Request(String path, Map<String, List<String>> queryParams,
			String httpMethod, String token) {
		this(path, queryParams, httpMethod);
		this.token = token;
	}

	public Request(String path, Map<String, List<String>> queryParams,
			String httpMethod, String token, String from) {
		this(path, queryParams, httpMethod, token);
		this.from = from;
	}

	public Request(String path, String params, String httpMethod, String token,
			String from) {
		this.path = path;
		this.param = params;
		this.httpMethod = httpMethod;
		this.token = token;
		this.from = from;
	}

	public String getTrace() {
		return this.trace;
	}

	public void setTrace(String trace) {
		this.trace = trace;
	}

	public String getFrom() {
		return this.from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getPath() {
		return this.path;
	}

	public String getHttpMethod() {
		return this.httpMethod;
	}

	public Map<String, List<String>> getQueryParams() {
		return this.queryParams;
	}

	public void setQueryParams(Map<String, List<String>> queryParams) {
		this.queryParams = queryParams;
	}

	public String getToken() {
		return this.token;
	}

	public String getParam() {
		return this.param;
	}

	public void setParam(String param) {
		this.param = param;
	}
}
