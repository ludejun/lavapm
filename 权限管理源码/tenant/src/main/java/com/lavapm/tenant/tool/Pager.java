package com.lavapm.tenant.tool;

public class Pager {
	private int pageId = 1;
	private int rowCount = 0;
	private int pageSize = 10;
	private int pageCount = 0;
	private int pageOffset = 0;
	private int pageTail = 0;

	private String orderField;

	private boolean orderDirection;
	private boolean pageEnabled;
	private int length = 6;

	private int startIndex = 0;

	private int endIndex = 0;
	private int[] indexs;

	public Pager() {
		orderDirection = true;
		pageEnabled = true;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int[] getIndexs() {
		int len = getEndIndex() - getStartIndex() + 1;
		indexs = new int[len];
		for (int i = 0; i < len; i++) {
			indexs[i] = (getStartIndex() + i);
		}
		return indexs;
	}

	public void setIndexs(int[] indexs) {
		this.indexs = indexs;
	}

	public int getStartIndex() {
		startIndex = (pageId - length / 2);
		if (startIndex < 1) {
			startIndex = 1;
		}
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getEndIndex() {
		if (getStartIndex() < 1) {
			setStartIndex(1);
		}
		endIndex = (getStartIndex() + length <= getPageCount() ? getStartIndex() + length : getPageCount());
		return endIndex;
	}

	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}

	protected void doPage() {
		pageCount = (rowCount / pageSize + 1);

		if ((rowCount % pageSize == 0) && (pageCount > 1)) {
			pageCount -= 1;
		}

		pageOffset = ((pageId - 1) * pageSize);
		pageTail = (pageOffset + pageSize);
		if (pageOffset + pageSize > rowCount)
			pageTail = rowCount;
	}

	public String getOrderCondition() {
		String condition = "";
		if ((orderField != null) && (orderField.length() != 0)) {
			condition = " order by " + orderField + (orderDirection ? " " : " desc ");
		}
		return condition;
	}

	public String getMysqlQueryCondition() {
		String condition = "";
		if (pageEnabled) {
			condition = " limit " + pageOffset + "," + pageSize;
		}
		return condition;
	}

	public void setOrderDirection(boolean orderDirection) {
		this.orderDirection = orderDirection;
	}

	public boolean isOrderDirection() {
		return orderDirection;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageId(int pageId) {
		this.pageId = pageId;
	}

	public int getPageId() {
		return pageId;
	}

	public void setPageOffset(int pageOffset) {
		this.pageOffset = pageOffset;
	}

	public int getPageOffset() {
		return pageOffset;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageTail(int pageTail) {
		this.pageTail = pageTail;
	}

	public int getPageTail() {
		return pageTail;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
		doPage();
	}

	public int getRowCount() {
		return rowCount;
	}

	public boolean isPageEnabled() {
		return pageEnabled;
	}

	public void setPageEnabled(boolean pageEnabled) {
		this.pageEnabled = pageEnabled;
	}
}
