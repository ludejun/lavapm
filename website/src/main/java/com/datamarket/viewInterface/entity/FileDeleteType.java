package com.datamarket.viewInterface.entity;

public enum FileDeleteType {
	Request(1, "request"), StatusDesc(2, "statusDesc");

	private int value;
	private String name;

	private FileDeleteType(int value, String name) {
		this.value = value;
		this.name = name;
	}

	public int getValue() {
		return this.value;
	}

	public String getName() {
		return this.name;
	}
}
