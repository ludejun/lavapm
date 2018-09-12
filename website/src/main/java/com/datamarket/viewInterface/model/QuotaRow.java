package com.datamarket.viewInterface.model;

public class QuotaRow {
	private long validRequest;
	private long accessRequest;
	private long inputCount;
	private long oututCount;

	public long getValidRequest() {
		return this.validRequest;
	}

	public void setValidRequest(long validRequest) {
		this.validRequest = validRequest;
	}

	public long getAccessRequest() {
		return this.accessRequest;
	}

	public void setAccessRequest(long accessRequest) {
		this.accessRequest = accessRequest;
	}

	public long getInputCount() {
		return this.inputCount;
	}

	public void setInputCount(long inputCount) {
		this.inputCount = inputCount;
	}

	public long getOututCount() {
		return this.oututCount;
	}

	public void setOututCount(long oututCount) {
		this.oututCount = oututCount;
	}
}
