package com.datamarket.viewInterface.entity;

import com.google.gson.annotations.Expose;
import net.sf.json.JSONArray;

public class ResponseEntity {
	@Expose
	private JSONArray datas;
	@Expose
	private String msg;
	@Expose
	private Integer status;

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMsg() {
		return this.msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public JSONArray getData() {
		return this.datas;
	}

	public void setData(JSONArray data) {
		this.datas = data;
	}
}
