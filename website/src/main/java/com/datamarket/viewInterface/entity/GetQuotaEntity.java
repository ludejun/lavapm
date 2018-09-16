package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;
import net.sf.json.JSONArray;

public class GetQuotaEntity {
	@Expose
	private JSONArray data;
	@Expose
	private String msg;
	@Expose
	private Integer status;
	@Expose
	private Boolean access_allow;

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

	public Boolean getAccess_allow() {
		return this.access_allow;
	}

	public void setAccess_allow(Boolean access_allow) {
		this.access_allow = access_allow;
	}
}
