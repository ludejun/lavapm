package com.datamarket.viewInterface.client;

import com.datamarket.viewInterface.entity.Request;
import com.datamarket.viewInterface.entity.Response;
import java.io.Closeable;

public abstract interface RestClient extends Closeable {
	public abstract <T> Response sendRequest(Request paramRequest, Class<T> paramClass);
}
