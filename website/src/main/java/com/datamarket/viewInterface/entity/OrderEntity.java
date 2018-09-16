package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;

public class OrderEntity {
	@Expose
	private String[] data;
	@Expose
	private String msg;
	@Expose
	private Integer status;

	public String[] getData() {
		return this.data;
	}

	public void setData(String[] data) {
		this.data = data;
	}

	public String getMsg() {
		return this.msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
