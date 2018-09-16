package com.datamarket.viewInterface.client;

import org.slf4j.*;
import org.apache.http.impl.client.*;
import com.datamarket.viewInterface.entity.*;
import org.apache.http.util.*;
import com.datamarket.viewInterface.util.*;
import com.talkingdata.venus.*;
import org.apache.commons.lang3.*;
import java.util.*;
import org.apache.http.entity.*;
import java.io.*;
import org.apache.http.*;
import org.apache.http.client.methods.*;
import java.net.*;
import org.apache.http.client.utils.*;

public class HttpClientRestClient implements RestClient {
	private static final String PROJECT_NAME = "website";
	private Logger sysLog;
	private Logger errorLog;
	private CloseableHttpClient httpClient;

	public HttpClientRestClient(CloseableHttpClient httpClient) {
		this.sysLog = LogWriter.getAdminLog();
		this.errorLog = LogWriter.getErrorLog();
		this.httpClient = httpClient;
	}

	@Override
	public <T> Response<T> sendRequest(Request request, Class<T> t) {
		TDTraceInfo traceInfo = this.buildTraceInfo(request);
		request.setTrace(traceInfo.getTrace());
		HttpUriRequest restRequest = this.buildRestRequest(request);
		try (CloseableHttpResponse closeableHttpResponse = this.httpClient.execute(restRequest)) {
			traceInfo.insertStopTime();
			StatusLine statusLine = closeableHttpResponse.getStatusLine();
			traceInfo.putCustomParam("status",statusLine.getStatusCode());
			Response<T> response = null;
			if (statusLine.getStatusCode() == 200) {
				String json = EntityUtils.toString(closeableHttpResponse.getEntity(), "UTF-8");
				traceInfo.setResult(json);
				response = (Response<T>) new Response(Util.gson.fromJson(json,t));
			} else {
				traceInfo.putCustomParam("message",statusLine.getReasonPhrase());
				response = (Response<T>) new Response(statusLine.getStatusCode(),statusLine.getReasonPhrase());
			}
			this.sysLog.info(traceInfo.toJson());
			return response;
		} catch (IOException e) {
			traceInfo.insertStopTime();
			traceInfo.putCustomParam("status", (Object) 503);
			traceInfo.putCustomParam("message", (Object) e.getMessage());
			this.errorLog.info(traceInfo.toJson());
			return (Response<T>) new Response(503, e.getMessage());
		}
	}

	private TDTraceInfo buildTraceInfo(Request request) {
		TDTraceInfo traceInfo = new TDTraceInfo().setAlias(PROJECT_NAME).setMethod(request.getHttpMethod()).setPath(request.getPath());
		if (StringUtils.isNotEmpty((CharSequence) request.getToken())) {
			traceInfo.setToken(request.getToken());
		}
		if (StringUtils.isNotEmpty((CharSequence) request.getFrom())) {
			traceInfo.setFrom(request.getFrom());
		}
		if (StringUtils.isNotEmpty((CharSequence) request.getParam())) {
			traceInfo.putQueryParam("queryStrings", request.getParam());
		}
		if (request.getQueryParams() != null && request.getQueryParams().size() > 0) {
			for (Map.Entry<String, List<String>> entry : request.getQueryParams().entrySet()) {
				StringBuilder sb = new StringBuilder();
				if (entry.getValue() != null && entry.getValue().size() > 0) {
					sb.append(entry.getValue().get(0));
					for (int i = 1; i < entry.getValue().size(); ++i) {
						sb.append(",").append(entry.getValue().get(i));
					}
				}
				traceInfo.putQueryParam((String) entry.getKey(), sb.toString());
			}
		}
		return traceInfo.insertStartTime().insertTrace();
	}

	private HttpUriRequest buildRestRequest(Request request) {
		String httpMethod = request.getHttpMethod();
		switch (httpMethod) {
		case "GET": {
			final HttpGet get = new HttpGet(this.buildRequestPath(request));
			get.setHeader("X-access-token", request.getToken());
			get.setHeader("X-access-src", request.getFrom());
			get.setHeader("token", request.getToken());
			get.setHeader("from", request.getFrom());
			get.setHeader("trace", request.getTrace());
			return (HttpUriRequest) get;
		}
		case "POST": {
			HttpPost post = new HttpPost(this.buildRequestPath(request));
			post.setHeader("X-access-token", request.getToken());
			post.setHeader("X-access-src", request.getFrom());
			post.setHeader("token", request.getToken());
			post.setHeader("from", request.getFrom());
			post.setHeader("trace", request.getTrace());
			post.setHeader("Content-Type", "application/json; charset=UTF-8");
			StringEntity entity = null;
			try {
				entity = new StringEntity(request.getParam(), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			post.setEntity((HttpEntity) entity);
			return (HttpUriRequest) post;
		}
		case "PUT": {
			HttpPut put = new HttpPut(this.buildRequestPath(request));
			put.setHeader("X-access-token", request.getToken());
			put.setHeader("X-access-src", request.getFrom());
			put.setHeader("token", request.getToken());
			put.setHeader("from", request.getFrom());
			put.setHeader("trace", request.getTrace());
			put.setHeader("Content-Type", "application/json; charset=UTF-8");
			StringEntity entity = null;
			try {
				entity = new StringEntity(request.getParam(), "UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			put.setEntity((HttpEntity) entity);
			return (HttpUriRequest) put;
		}
		case "DELETE": {
			HttpDelete delete = new HttpDelete(this.buildRequestPath(request));
			delete.setHeader("X-access-token", request.getToken());
			delete.setHeader("X-access-src", request.getFrom());
			delete.setHeader("token", request.getToken());
			delete.setHeader("from", request.getFrom());
			delete.setHeader("trace", request.getTrace());
			delete.setHeader("Content-Type", "application/json; charset=UTF-8");
			return (HttpUriRequest) delete;
		}
		default: {
			throw new IllegalArgumentException("No such http method!");
		}
		}
	}

	private URI buildRequestPath(Request request) {
		URIBuilder uriBuilder = null;
		URI uri = null;
		try {
			uriBuilder = new URIBuilder(request.getPath());
			if (null != request.getQueryParams() && !request.getQueryParams().isEmpty()) {
				for (Map.Entry<String, List<String>> entry : request.getQueryParams().entrySet()) {
					for (int i = 0; i < entry.getValue().size(); ++i) {
						uriBuilder.addParameter((String) entry.getKey(),(String) entry.getValue().get(i));
					}
				}
			}
			uri = uriBuilder.build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return uri;
	}

	@Override
	public void close() throws IOException {
		this.httpClient.close();
	}
}
