package com.tp.proxy.mmp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tp.model.mmp.TopicChangeAuditLog;
import com.tp.proxy.BaseProxy;
import com.tp.service.IBaseService;
import com.tp.service.mmp.ITopicChangeAuditLogService;
/**
 * 日志记录代理层
 * @author szy
 *
 */
@Service
public class TopicChangeAuditLogProxy extends BaseProxy<TopicChangeAuditLog>{

	@Autowired
	private ITopicChangeAuditLogService topicChangeAuditLogService;

	@Override
	public IBaseService<TopicChangeAuditLog> getService() {
		return topicChangeAuditLogService;
	}
}
