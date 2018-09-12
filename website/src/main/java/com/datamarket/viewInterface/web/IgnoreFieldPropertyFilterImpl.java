package com.datamarket.viewInterface.web;

import net.sf.json.util.PropertyFilter;

public class IgnoreFieldPropertyFilterImpl implements PropertyFilter {
	private String[] fields;

	public IgnoreFieldPropertyFilterImpl() {
	}

	public IgnoreFieldPropertyFilterImpl(String[] pars) {
		this.fields = pars;
	}

	public boolean apply(Object source, String name, Object value) {
		if (value == null) {
			return true;
		}
		if (this.fields == null) {
			return false;
		}
		if ((this.fields != null) && (this.fields.length > 0)) {
			if (juge(this.fields, name)) {
				return true;
			}
			return false;
		}
		return false;
	}

	public boolean juge(String[] s, String s2) {
		for (String sl : s) {
			if (s2.equals(sl)) {
				return false;
			}
		}
		return true;
	}
}
