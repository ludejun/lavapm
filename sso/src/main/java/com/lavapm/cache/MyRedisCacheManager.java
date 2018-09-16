package com.lavapm.cache;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.cache.DefaultRedisCachePrefix;
import org.springframework.data.redis.cache.RedisCachePrefix;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

public class MyRedisCacheManager implements CacheManager {
	private final ConcurrentMap<String, Cache> caches = new ConcurrentHashMap();
	private final Collection<String> names = Collections.unmodifiableSet(this.caches.keySet());
	private final RedisTemplate template;
	private boolean usePrefix;
	private RedisCachePrefix cachePrefix = new DefaultRedisCachePrefix();
	private long defaultExpiration = 0L;
	private Map<String, Long> expires = null;
	private RedisSerializer<String> defaultKeySerializer = new StringRedisSerializer();
	private RedisSerializer<?> defaultValueSerializer = new JdkSerializationRedisSerializer();
	private Map<String, RedisSerializer> redisKeySerializerMap = null;
	private Map<String, RedisSerializer> redisValueSerializerMap = null;

	public MyRedisCacheManager(RedisTemplate template) {
		this.template = template;
	}

	public Cache getCache(String name) {
		Cache c = (Cache) this.caches.get(name);
		if (c == null) {
			long expiration = computeExpiration(name);
			c = new MyRedisCache(name, this.usePrefix ? this.cachePrefix.prefix(name) : null, getRedisTemplate(name),
					expiration);
			this.caches.put(name, c);
		}
		return c;
	}

	private long computeExpiration(String name) {
		Long expiration = null;
		if (this.expires != null) {
			expiration = (Long) this.expires.get(name);
		}
		return expiration != null ? expiration.longValue() : this.defaultExpiration;
	}

	private RedisTemplate getRedisTemplate(String name) {
		RedisTemplate template = new RedisTemplate();
		template.setConnectionFactory(this.template.getConnectionFactory());
		if ((this.redisKeySerializerMap == null) || (this.redisKeySerializerMap.get(name) == null)) {
			template.setKeySerializer(this.defaultKeySerializer);
		} else {
			template.setKeySerializer((RedisSerializer) this.redisKeySerializerMap.get(name));
		}
		if ((this.redisValueSerializerMap == null) || (this.redisValueSerializerMap.get(name) == null)) {
			template.setValueSerializer(this.defaultValueSerializer);
		} else {
			template.setValueSerializer((RedisSerializer) this.redisValueSerializerMap.get(name));
		}
		template.afterPropertiesSet();
		return template;
	}

	public Collection<String> getCacheNames() {
		return this.names;
	}

	public void setUsePrefix(boolean usePrefix) {
		this.usePrefix = usePrefix;
	}

	public void setCachePrefix(RedisCachePrefix cachePrefix) {
		this.cachePrefix = cachePrefix;
	}

	public void setDefaultExpiration(long defaultExpireTime) {
		this.defaultExpiration = defaultExpireTime;
	}

	public void setExpires(Map<String, Long> expires) {
		this.expires = (expires != null ? new ConcurrentHashMap(expires) : null);
	}

	public void setDefaultKeySerializer(RedisSerializer<String> defaultKeySerializer) {
		this.defaultKeySerializer = defaultKeySerializer;
	}

	public void setDefaultValueSerializer(RedisSerializer<?> defaultValueSerializer) {
		this.defaultValueSerializer = defaultValueSerializer;
	}

	public void setRedisKeySerializerMap(Map<String, RedisSerializer> redisKeySerializerMap) {
		this.redisKeySerializerMap = redisKeySerializerMap;
	}

	public void setRedisValueSerializerMap(Map<String, RedisSerializer> redisValueSerializerMap) {
		this.redisValueSerializerMap = redisValueSerializerMap;
	}
}
