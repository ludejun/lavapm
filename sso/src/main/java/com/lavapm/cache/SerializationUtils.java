package com.lavapm.cache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import org.springframework.data.redis.serializer.RedisSerializer;

public abstract class SerializationUtils {
	static final byte[] EMPTY_ARRAY = new byte[0];

	static boolean isEmpty(byte[] data) {
		return (data == null) || (data.length == 0);
	}

	static <T extends Collection<?>> T deserializeValues(Collection<byte[]> rawValues, Class<T> type,
			RedisSerializer<?> redisSerializer) {
		if (rawValues == null) {
			return null;
		}
		Collection<Object> values = List.class.isAssignableFrom(type) ? new ArrayList(rawValues.size())
				: new LinkedHashSet(rawValues.size());
		for (byte[] bs : rawValues) {
			values.add(redisSerializer.deserialize(bs));
		}
		return (T) values;
	}

	public static <T> Set<T> deserialize(Set<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
		return (Set) deserializeValues(rawValues, Set.class, redisSerializer);
	}

	public static <T> List<T> deserialize(List<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
		return (List) deserializeValues(rawValues, List.class, redisSerializer);
	}

	public static <T> Collection<T> deserialize(Collection<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
		return deserializeValues(rawValues, List.class, redisSerializer);
	}
}