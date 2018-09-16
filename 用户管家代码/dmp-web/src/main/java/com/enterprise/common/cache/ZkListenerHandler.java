package com.enterprise.common.cache;

import td.enterprise.dmp.common.config.*;
import org.apache.commons.lang.*;
import td.enterprise.dmp.common.util.*;
import org.apache.curator.framework.*;
import org.apache.curator.framework.recipes.cache.*;
import org.apache.commons.logging.*;

public class ZkListenerHandler implements Runnable
{
    private static Log LOG = LogFactory.getLog(ZkListenerHandler.class);
    private static final String CACHE_KEY = "dmp.ehcache.refresh.node.path";
    private static String rootPath;
    private static final String DATA = "RefreshCache";
    private static final String DEFAULT_ROOT_NODE_PATH = "/dmp/common/ParamCache/reloadCache";
    
    private void nodeChildListener() throws Exception {
        if (ZkListenerHandler.rootPath == null) {
            Configuration conf = Configuration.getInstance();
            String path = conf.getConfig("dmp.ehcache.refresh.node.path");
            if (StringUtils.isBlank(path)) {
                ZkListenerHandler.rootPath = "/dmp/common/ParamCache/reloadCache";
            }
            else {
                if (path.endsWith("/")) {
                    path = path.substring(0, path.length() - 1);
                }
                ZkListenerHandler.rootPath = path;
            }
        }
        CuratorFramework client = ZkHelper.getZkClient();
        client.start();
        if (!ZkHelper.isExistsNode(client, ZkListenerHandler.rootPath)) {
            ZkHelper.createNodeWithPersistent(client, ZkListenerHandler.rootPath, "RefreshCache");
        }
        nodeChildListenerDothing(client);
        Thread.sleep(2147483647L);
    }
    
    private static void nodeChildListenerDothing(final CuratorFramework client) throws Exception {
        PathChildrenCache cache = new PathChildrenCache(client, ZkListenerHandler.rootPath, true);
        cache.start();
        cache.getListenable().addListener(new PathChildrenCacheListener() {
            public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
                if (event != null && event.getType() != null && (PathChildrenCacheEvent.Type.CHILD_ADDED.equals((Object)event.getType()) || PathChildrenCacheEvent.Type.CHILD_REMOVED.equals((Object)event.getType()) || PathChildrenCacheEvent.Type.CHILD_REMOVED.equals((Object)event.getType()))) {
                    LOG.debug(("监听到节点变化，类型:" + event.getType() + ",节点:" + event.getData().getPath()));
                    switch (event.getType()) {
                        case CHILD_ADDED: {
                            if (event.getData().getPath().contains(ZkListenerHandler.rootPath + "/")) {
                                final String cacheName = event.getData().getPath().replace(ZkListenerHandler.rootPath + "/", "");
                                LOG.warn(("clean cache :[" + cacheName + "]"));
                                if ("param".equals(cacheName)) {
                                    Configuration.getInstance().refreshParam(cacheName);
                                }
                                WebCacheWrapper.refreshCache(cacheName);
                                break;
                            }
                            break;
                        }
                    }
                }
                else {
                    LOG.warn("监听到节点变化，event is null");
                }
            }
        });
    }
    
    @Override
    public void run() {
        try {
            this.nodeChildListener();
        }
        catch (Exception e) {
            LOG.error("监控缓存节点ERROR", e);
        }
    }
}
