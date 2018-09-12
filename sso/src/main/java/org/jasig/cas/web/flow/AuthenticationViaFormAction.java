package org.jasig.cas.web.flow;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import org.jasig.cas.CentralAuthenticationService;
import org.jasig.cas.authentication.handler.AuthenticationException;
import org.jasig.cas.authentication.principal.Credentials;
import org.jasig.cas.authentication.principal.Service;
import org.jasig.cas.ticket.TicketException;
import org.jasig.cas.web.bind.CredentialsBinder;
import org.jasig.cas.web.support.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.binding.message.MessageBuilder;
import org.springframework.binding.message.MessageContext;
import org.springframework.web.util.CookieGenerator;
import org.springframework.webflow.execution.RequestContext;

public class AuthenticationViaFormAction {
	private CredentialsBinder credentialsBinder;
	@NotNull
	private CentralAuthenticationService centralAuthenticationService;
	@NotNull
	private CookieGenerator warnCookieGenerator;
	protected Logger logger = LoggerFactory.getLogger(getClass());

	public final void doBind(RequestContext context, Credentials credentials) throws Exception {
		HttpServletRequest request = WebUtils.getHttpServletRequest(context);
		if ((this.credentialsBinder != null) && (this.credentialsBinder.supports(credentials.getClass()))) {
			this.credentialsBinder.bind(request, credentials);
		}
	}

	public final String submit(RequestContext context, Credentials credentials, MessageContext messageContext)
			throws Exception {
		String providedLoginTicket = WebUtils.getLoginTicketFromRequest(context);
		if (org.apache.commons.lang.StringUtils.isBlank(providedLoginTicket)) {
			this.logger.warn("Invalid login ticket " + providedLoginTicket);
			String code = "INVALID_TICKET";
			messageContext.addMessage(new MessageBuilder().error().code("INVALID_TICKET").arg(providedLoginTicket)
					.defaultText("INVALID_TICKET").build());

			return "error";
		}
		String ticketGrantingTicketId = WebUtils.getTicketGrantingTicketId(context);
		Service service = WebUtils.getService(context);
		if ((org.springframework.util.StringUtils.hasText(context.getRequestParameters().get("renew")))
				&& (ticketGrantingTicketId != null) && (service != null)) {
			try {
				String serviceTicketId = this.centralAuthenticationService.grantServiceTicket(ticketGrantingTicketId,
						service, credentials);
				WebUtils.putServiceTicketInRequestScope(context, serviceTicketId);
				putWarnCookieIfRequestParameterPresent(context);
				return "warn";
			} catch (TicketException e) {
				if (isCauseAuthenticationException(e)) {
					populateErrorsInstance(e, messageContext);
					return getAuthenticationExceptionEventId(e);
				}
				this.centralAuthenticationService.destroyTicketGrantingTicket(ticketGrantingTicketId);
				if (this.logger.isDebugEnabled()) {
					this.logger.debug(
							"Attempted to generate a ServiceTicket using renew=true with different credentials", e);
				}
			}
		}
		try {
			WebUtils.putTicketGrantingTicketInRequestScope(context,
					this.centralAuthenticationService.createTicketGrantingTicket(credentials));
			putWarnCookieIfRequestParameterPresent(context);
			return "success";
		} catch (TicketException e) {
			populateErrorsInstance(e, messageContext);
			if (isCauseAuthenticationException(e)) {
				return getAuthenticationExceptionEventId(e);
			}
		}
		return "error";
	}

	private void populateErrorsInstance(TicketException e, MessageContext messageContext) {
		try {
			messageContext.addMessage(new MessageBuilder().error().code(e.getCode()).defaultText(e.getCode()).build());
		} catch (Exception fe) {
			this.logger.error(fe.getMessage(), fe);
		}
	}

	private void putWarnCookieIfRequestParameterPresent(RequestContext context) {
		HttpServletResponse response = WebUtils.getHttpServletResponse(context);
		if (org.springframework.util.StringUtils
				.hasText(context.getExternalContext().getRequestParameterMap().get("warn"))) {
			this.warnCookieGenerator.addCookie(response, "true");
		} else {
			this.warnCookieGenerator.removeCookie(response);
		}
	}

	private AuthenticationException getAuthenticationExceptionAsCause(TicketException e) {
		return (AuthenticationException) e.getCause();
	}

	private String getAuthenticationExceptionEventId(TicketException e) {
		AuthenticationException authEx = getAuthenticationExceptionAsCause(e);
		if (this.logger.isDebugEnabled()) {
			this.logger.debug("An authentication error has occurred. Returning the event id " + authEx.getType());
		}
		return authEx.getType();
	}

	private boolean isCauseAuthenticationException(TicketException e) {
		return (e.getCause() != null) && (AuthenticationException.class.isAssignableFrom(e.getCause().getClass()));
	}

	public final void setCentralAuthenticationService(CentralAuthenticationService centralAuthenticationService) {
		this.centralAuthenticationService = centralAuthenticationService;
	}

	public final void setCredentialsBinder(CredentialsBinder credentialsBinder) {
		this.credentialsBinder = credentialsBinder;
	}

	public final void setWarnCookieGenerator(CookieGenerator warnCookieGenerator) {
		this.warnCookieGenerator = warnCookieGenerator;
	}
}