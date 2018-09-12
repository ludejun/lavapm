package com.lavapm.service;

import com.lavapm.vo.User;

public abstract interface SessionIdCacheService {
	public abstract User getUserBySessionId(String paramString);

	public abstract User cacheUserBySessionId(String paramString, User paramUser);

	public abstract void removeUserBySessionId(String paramString);

	public abstract void expire(String paramString);
}
