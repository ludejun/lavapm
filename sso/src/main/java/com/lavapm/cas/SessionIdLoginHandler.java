package com.lavapm.cas;

import com.lavapm.service.SessionIdCacheService;
import com.lavapm.vo.User;
import org.jasig.cas.authentication.handler.AuthenticationException;
import org.jasig.cas.authentication.handler.support.AbstractUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.principal.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionIdLoginHandler extends AbstractUsernamePasswordAuthenticationHandler {
	@Autowired
	private SessionIdCacheService sessionIdCacheService;

	protected boolean authenticateUsernamePasswordInternal(UsernamePasswordCredentials credentials)
			throws AuthenticationException {
		String username = credentials.getUsername();
		String sessionId = credentials.getPassword();
		if ((sessionId != null) && (sessionId.trim().length() == 36)) {
			try {
				User user = this.sessionIdCacheService.getUserBySessionId(sessionId);
				if ((user != null) && (user.getLoginName().equalsIgnoreCase(username))) {
					return true;
				}
			} catch (Exception localException) {
			}
		}
		return false;
	}
}
