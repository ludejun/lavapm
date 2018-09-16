package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;
import java.util.Map;

public class ServiceEntity {
	@Expose
	private Map<String, Object> data;
	@Expose
	private String msg;
	@Expose
	private Integer status;

	public Map<String, Object> getDatas() {
		return this.data;
	}

	public void setDatas(Map<String, Object> datas) {
		this.data = datas;
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
