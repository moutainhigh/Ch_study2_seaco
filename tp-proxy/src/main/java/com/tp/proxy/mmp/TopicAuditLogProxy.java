package com.tp.proxy.mmp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tp.model.mmp.TopicAuditLog;
import com.tp.proxy.BaseProxy;
import com.tp.service.IBaseService;
import com.tp.service.mmp.ITopicAuditLogService;
/**
 * 日志记录代理层
 * @author szy
 *
 */
@Service
public class TopicAuditLogProxy extends BaseProxy<TopicAuditLog>{

	@Autowired
	private ITopicAuditLogService topicAuditLogService;

	@Override
	public IBaseService<TopicAuditLog> getService() {
		return topicAuditLogService;
	}
}
