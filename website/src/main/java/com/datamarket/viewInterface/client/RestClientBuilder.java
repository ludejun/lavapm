package com.datamarket.viewInterface.client;

import org.apache.http.impl.conn.*;
import org.apache.http.client.config.*;
import org.apache.http.conn.*;
import org.apache.http.impl.client.*;

public class RestClientBuilder {
	private static RestClient buildRestClient() {
		PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
		cm.setMaxTotal(30);
		cm.setDefaultMaxPerRoute(5);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(5000).setConnectTimeout(5000).build();
		CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager((HttpClientConnectionManager) cm).setDefaultRequestConfig(requestConfig).build();
		return new HttpClientRestClient(httpClient);
	}

	public static RestClient restClient() {
		return SingletonClient.client;
	}

	private static class SingletonClient {
		private static RestClient client;

		static {
			SingletonClient.client = buildRestClient();
		}
	}
}
