package com.tp.common.vo.supplier.entry;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public enum RefundOrderAuditStatus {

    /**
     * <code>EDITING</code> - {编辑中}.
     */
    EDITING("编辑中", "Editing", 1, "提交信息", new HashSet<Integer>(Arrays.asList(new Integer[] { 0, 1 }))),

    /**
     * <code>EXAMING</code> - {审核中}.
     */
    EXAMING("审核中", "Examing", 2, "提交审核", new HashSet<Integer>(Arrays.asList(new Integer[] { 1, -1, 5 }))),

    /**
     * <code>THROUGH</code> - {审核通过}.
     */
    THROUGH("审核通过", "Through", 4, "审核通过", new HashSet<Integer>(Arrays.asList(new Integer[] { 2 }))),

    /**
     * <code>Refused</code> - {驳回}.
     */
    REFUSED("已驳回", "Refused", 5, "驳回", new HashSet<Integer>(Arrays.asList(new Integer[] { 2 }))),

    /**
     * <code>CANCELED</code> - {已取消}.
     */
    CANCELED("已取消", "Canceled", 6, "取消", new HashSet<Integer>(Arrays.asList(new Integer[] { 5, 1 }))),

    /**
     * <code>Order_finished</code> - {订单完成}.
     */
    PURCHARSE_FINISHED("退单完成", "Order_finished", 7, "退单完成", new HashSet<Integer>(Arrays.asList(new Integer[] { 4 })));

    private String name;

    private String value;

    private Integer status;

    private String result;

    private Set<Integer> preStatus;

    private RefundOrderAuditStatus(final String name, final String value, final Integer status, final String result, final Set<Integer> preStatus) {
        this.name = name;
        this.value = value;
        this.status = status;
        this.result = result;
        this.preStatus = preStatus;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public Integer getStatus() {
        return status;
    }

    public Set<Integer> getPreStatus() {
        return preStatus;
    }

    public String getResult() {
        return result;
    }

}
