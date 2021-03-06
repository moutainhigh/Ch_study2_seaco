package com.tp.world.controller.home;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tp.enums.common.PlatformEnum;
import com.tp.m.base.MResultVO;
import com.tp.m.base.Page;
import com.tp.m.query.home.QueryIndex;
import com.tp.m.util.JsonUtil;
import com.tp.m.util.StringUtil;
import com.tp.m.vo.home.BannerVO;
import com.tp.m.vo.home.IndexModuleVO;
import com.tp.m.vo.topic.TopicVO;
import com.tp.world.ao.home.IndexAO;

/**
 * 首页控制器
 * @author zhuss
 */
@Controller
@RequestMapping("/index")
public class IndexController {
	private static Logger log = LoggerFactory.getLogger(IndexController.class);
	
	@Autowired
	private IndexAO indexAO;

	
	/**
	 * 首页-广告位信息
	 * @return
	 */
	@RequestMapping(value={"/getbanners"}, method=RequestMethod.GET)
	@ResponseBody
	public String getBanners(QueryIndex indexQuery){
		if(log.isInfoEnabled()){
			log.info("[API接口 - 广告位信息 入参] = {}",JsonUtil.convertObjToStr(indexQuery));
		}
		MResultVO<List<BannerVO>> reuslt=indexAO.getBanners(indexQuery);
		/*if(log.isInfoEnabled()){
			log.info("[API接口 - 广告位信息 返回值] = {}",JsonUtil.convertObjToStr(reuslt));
		}*/
		return JsonUtil.convertObjToStr(reuslt);
	}
	
	/**
	 * 首页-今日上新
	 * @return
	 */
	@RequestMapping(value="/gettodaynew", method=RequestMethod.GET)
	@ResponseBody
	public String getTodayNew(QueryIndex indexQuery){
		if(log.isInfoEnabled()){
			log.info("[API接口 - 今日上新 入参] = {}",JsonUtil.convertObjToStr(indexQuery));
		}
		MResultVO<Page<TopicVO>> reuslt = null;
		//APP在1.0.0版本以上的包括单品团和主题团
		if(!StringUtil.equals(indexQuery.getAppversion(), "1.0.0") || StringUtil.equals(indexQuery.getApptype(), PlatformEnum.WAP.name())){
			reuslt = indexAO.topicAndSingleGroup(indexQuery);
		}else{
			reuslt = indexAO.getTodayNew(indexQuery);
		}
		if(log.isInfoEnabled()){
			log.info("[API接口 - 今日上新 返回值] = {}",JsonUtil.convertObjToStr(reuslt));
		}
		return JsonUtil.convertObjToStr(reuslt);
	}
	
	/**
	 * 首页- 模块信息
	 * @return
	 */
	@RequestMapping(value="/module", method=RequestMethod.GET)
	@ResponseBody
	public String getLabs(QueryIndex indexQuery){
		if(log.isInfoEnabled()){
			log.info("[API接口 - 首页模块 入参] = {}",JsonUtil.convertObjToStr(indexQuery));
		}
		MResultVO<IndexModuleVO> result = indexAO.queryIndexModular(indexQuery);
		log.info("[API接口 - 首页模块 出参] = {}",JsonUtil.convertObjToStr(result));
		return JsonUtil.convertObjToStr(result);
	}
}
