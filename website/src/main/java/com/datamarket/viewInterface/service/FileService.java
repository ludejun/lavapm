package com.datamarket.viewInterface.service;

import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public abstract interface FileService {
	public abstract String upload(MultipartFile paramMultipartFile)	throws IOException;

	public abstract void download(HttpServletResponse paramHttpServletResponse,	String paramString) throws IOException;
}
