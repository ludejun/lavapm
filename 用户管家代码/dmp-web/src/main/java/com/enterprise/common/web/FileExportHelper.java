package com.enterprise.common.web;

import java.io.File;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileExportHelper {
	protected HttpServletRequest request = null;
	protected HttpServletResponse response = null;
	
	public FileExportHelper(HttpServletRequest request,HttpServletResponse response){
		this.request = request;
		this.response = response;
	}
	
	public String getTemplateDirPath(){
		String result = null;
		try {
			  URL url = Thread.currentThread().getContextClassLoader().getResource("");
			  File classesFolder = new File(url.toURI());
			  result = classesFolder.getParentFile().getParentFile().getAbsolutePath()
					  +File.separatorChar+"templates";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
}
