package com.tp.dto.ord.kuaidi100;

import java.io.Serializable;

public class ExpressInfo implements Serializable{
	private static final long serialVersionUID = -1727069511519928462L;
	private String status = "";
	private String billstatus = "";
	private String message = "";
	private Result lastResult = new Result();

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBillstatus() {
		return billstatus;
	}

	public void setBillstatus(String billstatus) {
		this.billstatus = billstatus;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Result getLastResult() {
		return lastResult;
	}

	public void setLastResult(Result lastResult) {
		this.lastResult = lastResult;
	}

}
