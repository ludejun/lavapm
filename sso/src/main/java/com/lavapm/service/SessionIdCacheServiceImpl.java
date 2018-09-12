package com.lavapm.service;

import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import com.lavapm.vo.User;

@Component("sessionIdCacheService")
public class SessionIdCacheServiceImpl
  implements SessionIdCacheService
{
  @Autowired
  private StringRedisTemplate stringRedisTemplate;
  @Autowired
  private Properties sysConfig;
  
  public User getUserBySessionId(String sessionId)
  {
    return null;
  }
  
  public User cacheUserBySessionId(String sessionId, User user)
  {
    return user;
  }
  
  public void removeUserBySessionId(String sessionId) {}
  
  public void expire(String sessionId)
  {
    long time = 600L;
    try
    {
      String ttlStr = this.sysConfig.getProperty("jedis.usersession.timeout", "600");
      String cacheName = this.sysConfig.getProperty("jedis.usersession.cachename", "dcds:json:usersessionid");
      time = Long.valueOf(ttlStr).longValue();
      this.stringRedisTemplate.expire(cacheName + ":" + sessionId, time, TimeUnit.SECONDS);
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
  }
}
