package com.enterprise.common.cache;

import org.springframework.web.context.*;
import javax.servlet.*;
import org.apache.commons.logging.*;

public class ZkListener extends ContextLoaderListener
{
    private static Log LOG = LogFactory.getLog(ZkListener.class);
    
    public void contextDestroyed(ServletContextEvent sce) {
    }
    
    public void contextInitialized(ServletContextEvent sce) {
        LOG.debug("cache listener start begin!");
        ZkListenerHandler handler = new ZkListenerHandler();
        new Thread(handler, "zkCacheWebListener").start();
        LOG.debug("cache listener start suc!");
    }
    
}
