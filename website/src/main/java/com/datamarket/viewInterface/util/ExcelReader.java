package com.datamarket.viewInterface.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

public class ExcelReader {
	private String filePath;
	private String sheetName;
	private Workbook workBook;
	private Sheet sheet;
	private List<String> columnHeaderList;
	private List<List<String>> listData;
	private List<Map<String, String>> mapData;
	private boolean flag;

	public ExcelReader(String filePath, String sheetName) {
		this.filePath = filePath;
		this.sheetName = sheetName;
		this.flag = false;
		load();
	}

	public ExcelReader(InputStream fileInputStream, String sheetName) {
		this.sheetName = sheetName;
		this.flag = false;
		load(fileInputStream);
	}

	private void load() {
		FileInputStream inStream = null;
		try {
			inStream = new FileInputStream(new File(this.filePath));
			this.workBook = WorkbookFactory.create(inStream);
			this.sheet = this.workBook.getSheet(this.sheetName);
			return;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (inStream != null) {
					inStream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private void load(InputStream file) {
		FileInputStream inStream = (FileInputStream) file;
		try {
			this.workBook = WorkbookFactory.create(inStream);
			this.sheet = this.workBook.getSheet(this.sheetName);
			return;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (inStream != null) {
					inStream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private String getCellValue(Cell cell) {
		String cellValue = "";
		DataFormatter formatter = new DataFormatter();
		if (cell != null) {
			switch (cell.getCellType()) {
			case 0:
				if (DateUtil.isCellDateFormatted(cell)) {
					cellValue = formatter.formatCellValue(cell);
				} else {
					double value = cell.getNumericCellValue();
					int intValue = (int) value;
					cellValue = value - intValue == 0.0D ? String
							.valueOf(intValue) : String.valueOf(value);
				}
				break;
			case 1:
				cellValue = cell.getStringCellValue();
				break;
			case 4:
				cellValue = String.valueOf(cell.getBooleanCellValue());
				break;
			case 2:
				cellValue = String.valueOf(cell.getCellFormula());
				break;
			case 3:
				cellValue = "";
				break;
			case 5:
				cellValue = "";
				break;
			default:
				cellValue = cell.toString().trim();
			}
		}
		return cellValue.trim();
	}

	private void getSheetData() {
		this.listData = new ArrayList();
		this.mapData = new ArrayList();
		this.columnHeaderList = new ArrayList();
		int numOfRows = this.sheet.getLastRowNum() + 1;
		for (int i = 0; i < numOfRows; i++) {
			Row row = this.sheet.getRow(i);
			Map<String, String> map = new HashMap();
			List<String> list = new ArrayList();
			if (row != null) {
				for (int j = 0; j < row.getLastCellNum(); j++) {
					Cell cell = row.getCell(j);
					if (i == 0) {
						this.columnHeaderList.add(getCellValue(cell));
					} else {
						map.put(this.columnHeaderList.get(j),
								getCellValue(cell));
					}
					list.add(getCellValue(cell));
				}
			}
			if (i > 0) {
				this.mapData.add(map);
			}
			this.listData.add(list);
		}
		this.flag = true;
	}

	public String getCellData(int row, int col) {
		if ((row <= 0) || (col <= 0)) {
			return null;
		}
		if (!this.flag) {
			getSheetData();
		}
		if ((this.listData.size() >= row)
				&& (((List) this.listData.get(row - 1)).size() >= col)) {
			return (String) ((List) this.listData.get(row - 1)).get(col - 1);
		}
		return null;
	}

	public List<String> getRowData(int row) {
		if (row <= 0) {
			return null;
		}
		if (!this.flag) {
			getSheetData();
		}
		if (this.listData.size() >= row) {
			return (List) this.listData.get(row - 1);
		}
		return null;
	}

	public String getCellData(int row, String headerName) {
		if (row <= 0) {
			return null;
		}
		if (!this.flag) {
			getSheetData();
		}
		if ((this.mapData.size() >= row)
				&& (((Map) this.mapData.get(row - 1)).containsKey(headerName))) {
			return (String) ((Map) this.mapData.get(row - 1)).get(headerName);
		}
		return null;
	}

	public Integer getLastRowNum() {
		if (!this.flag) {
			getSheetData();
		}
		return Integer.valueOf(this.sheet.getLastRowNum() + 1);
	}
}
