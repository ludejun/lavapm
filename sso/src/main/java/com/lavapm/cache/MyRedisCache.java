package com.lavapm.cache;

import java.util.Arrays;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.support.SimpleValueWrapper;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.util.Assert;

public class MyRedisCache implements Cache {
	private static final Logger logger = LoggerFactory.getLogger(MyRedisCache.class);
	private static final int PAGE_SIZE = 128;
	private final String name;
	private final RedisTemplate template;
	private final byte[] prefix;
	private final byte[] setName;
	private final byte[] cacheLockName;
	private long WAIT_FOR_LOCK = 300L;
	private final long expiration;

	MyRedisCache(String name, byte[] prefix, RedisTemplate<? extends Object, ? extends Object> template,
			long expiration) {
		Assert.hasText(name, "non-empty cache name is required");
		this.name = name;
		this.template = template;
		this.prefix = prefix;
		this.expiration = expiration;

		StringRedisSerializer stringSerializer = new StringRedisSerializer();

		this.setName = stringSerializer.serialize(name + "~keys");
		this.cacheLockName = stringSerializer.serialize(name + "~lock");
	}

	public String getName() {
		return this.name;
	}

	public Object getNativeCache() {
		return this.template;
	}

	public ValueWrapper get(final Object key) {
		ValueWrapper v = null;
		try {

			v = (ValueWrapper) this.template.execute(new RedisCallback<ValueWrapper>() {

				@Override
				public ValueWrapper doInRedis(RedisConnection connection) throws DataAccessException {
					byte[] bs = connection.get(computeKey(key));
					return bs == null ? null : new SimpleValueWrapper(template.getValueSerializer().deserialize(bs));
				}
			}, true);
		} catch (Exception e) {
			logger.error("»ñÈ¡»º´æÊý¾Ý[{}]Ê§°Ü:{}", new String(computeKey(key)), e.getMessage());
		}
		return v;
	}

	public void put(final Object key, final Object value)
  {
    if (value == null) {
      return;
    }
    byte[] k = computeKey(key);
    try
    {
      this.template.execute(new RedisCallback<ValueWrapper>() {

		@Override
		public ValueWrapper doInRedis(RedisConnection connection) throws DataAccessException {
			connection.multi();
			connection.set(computeKey(key), value.toString().getBytes());
			connection.zAdd(setName, 0.0D, computeKey(key));
			if (expiration > 0) {
				connection.expire(computeKey(key), expiration);
				connection.expire(setName, expiration);
			}
			connection.exec();
			return null;
		}}, true);
    }
    catch (Exception e)
    {
      logger.error("´æ·Å»º´æÊý¾Ý[{}]Ê§°Ü:{}", new String(computeKey(key)), e.getMessage());
    }
  }

	public void evict(final Object key)
  {
    byte[] k = computeKey(key);
    try
    {
      this.template.execute(new RedisCallback<ValueWrapper>() {

		@Override
		public ValueWrapper doInRedis(RedisConnection connection) throws DataAccessException {
			connection.del(new byte[][] {computeKey(key)});
			connection.zRem(setName, computeKey(key));
			return null;
		}}, true);
    }
    catch (Exception e)
    {
      logger.error("Çå³ý»º´æÊý¾Ý[{}]Ê§°Ü:{}", new String(computeKey(key)), e.getMessage());
    }
  }

public void clear()
  {
    try
    {
      this.template.execute(new RedisCallback<ValueWrapper>(){

		@Override
		public ValueWrapper doInRedis(RedisConnection connection) throws DataAccessException {
			if (connection.exists(cacheLockName).booleanValue()) {
			      return null;
			    }
			try
		    {
		      connection.set(cacheLockName, cacheLockName);
		      
		      int offset = 0;
		      boolean finished = false;
		      do
		      {
		        Set<byte[]> keys = connection.zRange(setName, offset * 128, (offset + 1) * 128 - 1);
		        finished = keys.size() < 128;
		        offset++;
		        if (!keys.isEmpty()) {
		          connection.del((byte[][])keys.toArray(new byte[keys.size()][]));
		        }
		      } while (!finished);
		      connection.del(new byte[][] { setName });
		      return null;
		    }
		    finally
		    {
		      connection.del(new byte[][] { cacheLockName });
		    }
		}}, true);
    }
    catch (Exception e)
    {
      logger.error("Çå¿Õ»º´æ[{}]Ê§°Ü:{}", new String(computeKey(this.setName)), e.getMessage());
    }
  }

	private byte[] computeKey(Object key) {
		byte[] k = this.template.getKeySerializer().serialize(key);
		if ((this.prefix == null) || (this.prefix.length == 0)) {
			return k;
		}
		byte[] result = Arrays.copyOf(this.prefix, this.prefix.length + k.length);
		System.arraycopy(k, 0, result, this.prefix.length, k.length);
		return result;
	}

	private boolean waitForLock(RedisConnection connection) {
		boolean foundLock = false;
		boolean retry;
		do {
			retry = false;
			if (connection.exists(this.cacheLockName).booleanValue()) {
				foundLock = true;
				try {
					Thread.currentThread().wait(this.WAIT_FOR_LOCK);
				} catch (InterruptedException localInterruptedException) {
				}
				retry = true;
			}
		} while (retry);
		return foundLock;
	}
}
