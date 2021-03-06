package com.tp.dto.cms.query;

import java.io.Serializable;

import com.tp.model.BaseDO;

/**
 * 模板管理
 * 
 */

public class CmsTempleQuery extends BaseDO implements Serializable{

	private static final long serialVersionUID = 5796013734562551995L;

	/** 页面表主键 */
	private String pageId;

	/** 页面名称 */
	private String pageName;

	/** 模板名称 */
	private String templeName;

	/** 模板编号 */
	private String templeCode;

	/** 状态(0正常，1停用，2删除) */
	private Integer status;

	/** 顺序 */
	private Integer seq;

	/** 元素类型 */
	private Integer elementType;

	/** 元素数量 */
	private Integer elementNum;

	/**
	 * 设置 页面表主键
	 * 
	 * @param pageId
	 */
	public void setPageId(String pageId) {
		this.pageId = pageId;
	}

	/**
	 * 设置 页面名称
	 * 
	 * @param pageName
	 */
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	/**
	 * 设置 模板名称
	 * 
	 * @param templeName
	 */
	public void setTempleName(String templeName) {
		this.templeName = templeName;
	}

	/**
	 * 设置 模板编号
	 * 
	 * @param templeCode
	 */
	public void setTempleCode(String templeCode) {
		this.templeCode = templeCode;
	}

	/**
	 * 设置 状态(0正常，1停用，2删除)
	 * 
	 * @param status
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * 设置 顺序
	 * 
	 * @param seq
	 */
	public void setSeq(Integer seq) {
		this.seq = seq;
	}

	/**
	 * 设置 元素类型
	 * 
	 * @param elementType
	 */
	public void setElementType(Integer elementType) {
		this.elementType = elementType;
	}

	/**
	 * 设置 元素数量
	 * 
	 * @param elementNum
	 */
	public void setElementNum(Integer elementNum) {
		this.elementNum = elementNum;
	}

	/**
	 * 获取 页面表主键
	 * 
	 * @return pageId
	 */
	public String getPageId() {
		return pageId;
	}

	/**
	 * 获取 页面名称
	 * 
	 * @return pageName
	 */
	public String getPageName() {
		return pageName;
	}

	/**
	 * 获取 模板名称
	 * 
	 * @return templeName
	 */
	public String getTempleName() {
		return templeName;
	}

	/**
	 * 获取 模板编号
	 * 
	 * @return templeCode
	 */
	public String getTempleCode() {
		return templeCode;
	}

	/**
	 * 获取 状态(0正常，1停用，2删除)
	 * 
	 * @return status
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * 获取 顺序
	 * 
	 * @return seq
	 */
	public Integer getSeq() {
		return seq;
	}

	/**
	 * 获取 元素类型
	 * 
	 * @return elementType
	 */
	public Integer getElementType() {
		return elementType;
	}

	/**
	 * 获取 元素数量
	 * 
	 * @return elementNum
	 */
	public Integer getElementNum() {
		return elementNum;
	}

}