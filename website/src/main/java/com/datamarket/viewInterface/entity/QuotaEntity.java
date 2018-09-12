package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;
import net.sf.json.JSONArray;

public class QuotaEntity {
	@Expose
	private JSONArray data;
	@Expose
	private String msg;
	@Expose
	private Integer status;

	public JSONArray getData() {
		return this.data;
	}

	public void setData(JSONArray data) {
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
