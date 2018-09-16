package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;

public class Response<T> {
	@Expose
	private Integer status = Integer.valueOf(200);
	@Expose
	private String msg = "Ok";
	@Expose
	private T data;

	public Response() {
	}

	public Response(T value) {
		this.data = value;
	}

	public Response(int status, String msg) {
		this.status = Integer.valueOf(status);
		this.msg = msg;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return this.msg;
	}

	public void setMessage(String message) {
		this.msg = message;
	}

	public T getData() {
		return (T) this.data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
