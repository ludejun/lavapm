package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;
import java.util.Map;

public class AccountEntity {
	@Expose
	private Map<String, Object> data;
	@Expose
	private String msg;
	@Expose
	private Integer status;

	public Map<String, Object> getData() {
		return this.data;
	}

	public void setData(Map<String, Object> data) {
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
