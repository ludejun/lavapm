package com.datamarket.viewInterface.service;

public abstract interface DMPService {
	
	public abstract String checkUserAuth(String paramString) throws Exception;

	public abstract String checkAdminAuth(String paramString) throws Exception;
}
