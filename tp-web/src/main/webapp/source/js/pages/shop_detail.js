var specialid = xigou.getQueryString('tid'); //专场号
if(specialid.indexOf('#') > -1){
	specialid = specialid.substring(0,specialid.indexOf('#'));
}
//记录锚点,定位免税店首页
xigou.setSessionStorage("specialid",specialid);

var qiNiuUrl = ""; 
var brandStory = ""; //品牌故事
var tmnotice = xigou.getQueryString('tmnotice');//明日预告过来的
var isTmrNotice = 0;
if(tmnotice!=''){
	isTmrNotice = 1;
}
var refreshComp;//刷新组件
tmnotice = tmnotice?"&tmnotice="+tmnotice:"";
var haitao = xigou.getQueryString('haitao');
var comefromAd = xigou.getSessionStorage("comeFromAd");
var isascending = "0";//“0”表示不参考价格因素“1”表示升序，价格从底到高“2”表示降序，价格从高到底

var title = '';
var desc = '';
var imgUrl = '';
var listCount = 1;
var showLoading = true;
var shopMobileVal = null;

$(function() {
/*	$('.shop_detail_header1').hide();
	$(".header_imgs").hide();*/

	var dssUserInfo = xigou.getLocalStorage("dssUser");
	if(dssUserInfo && dssUserInfo != "{}"){
		var userInfo =JSON.parse(dssUserInfo);
		shopMobileVal = userInfo ?(userInfo.mobile && userInfo.token ?userInfo.mobile :null):null;
	}
	var dropload = $('.body').dropload({
    	scrollArea : window,
    	loadDownFn : function(me){
			if (listCount == 1 && xigou.getSessionStorage("hdlist") && specialid == xigou.getSessionStorage("hdlistid")) {
				loadHistoryData();
			}
			else {
				product(listCount,isascending,me);
			}
			listCount++;
			me.resetload();
    	}
	});

	getDssUserInfo();
	details(dropload); //店铺-详情
	xigou.setSessionStorage('productdetails_backurl', 'shop_detail.html?tid=' + specialid);

	if (xigou.getQueryString('from') == 'shop') {
		$('a.hd-back').attr("href", 'shop.html');
	}

	Initkf();
});

	function show(){
		$("#bg_shadow").addClass("bg_shadow").addClass("from-below");
		$("#bg_shadow").addClass("bg_shadow");
		
		setTimeout(function(){
			$("#bg_shadow").addClass("effeckt-show");
			
		},300);
	}
	function hide(){
		$("#bg_shadow").removeClass("effeckt-show").removeClass("bg_shadow").removeClass("from-below");
	}

	function show_shop(){
		$("#shop_detail_information").show();
		$("#shop_detail_information").addClass("from-below");
		setTimeout(function(){$("#shop_detail_information").addClass("effeckt-show").removeClass("from-below");},300);
		}
		function hide_shop(){
		/*$("#shop_detail_information").hide();*/
		$("#shop_detail_information").addClass("from-below").removeClass("effeckt-show");
		setTimeout(function(){$("#showDiv").addClass("from-below");},300);

		}

$(document).ready(function(){  
    var p=0,t=0;  
  
    $(window).scroll(function(e){  
            p = $(this).scrollTop();  
            if(t<=p && t>=237){//下滚              	
            	$("#shop_detail_header").addClass("shop_detail_header1");
        		$("#shop_top").addClass("shop_top1").removeClass("shop_top");
        		$("#ban_part").addClass("ban_part1").removeClass("ban_part");
        		$(".shop_products_list").css({
        			"padding-top":"76px"
        		})
        		$("#fifter").show().addClass("fifter");
        		/*$("#bg_shadow").addClass("bg_shadow");*/
/*        		$("#div_title").removeClass("div_title").addClass("div_title1");
        		$("#div_sort").removeClass("div_sort").addClass("div_sort1");*/
        		show();
            }else  if(t>p && p<=214){//上滚  
            	$("#shop_detail_header").removeClass("shop_detail_header1");
            	$("#ban_part").addClass("ban_part").removeClass("ban_part1");
        		$("#shop_top").addClass("shop_top").removeClass("shop_top1");
        		$(".shop_products_list").css({
        			"padding-top":"0px"
        		})
        		$("#fifter").hide().removeClass("fifter");
        		/*$("#bg_shadow").removeClass("bg_shadow");*/
/*        		$("#div_title").removeClass("div_title1").addClass("div_title");
        	  	$("#div_sort").removeClass("div_sort1").addClass("div_sort");*/
        	  	hide();
            }  
            if(t<=p && t>=30){//下滚  
            	hide_shop();
            }else if(t>p && p<=30){//上滚  
            	show_shop();
            }  
            setTimeout(function(){t = p;},0);         
    });  
});

/*$(window).scroll(function(){
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;

	if(scrolltop>=237){
		$("#shop_detail_information").hide();
		$("#shop_top").addClass("shop_top1").removeClass("shop_top");
		$("#bg_shadow").addClass("bg_shadow");
		$("#div_title").removeClass("div_title").addClass("div_title1");
		$("#div_sort").removeClass("div_sort").addClass("div_sort1");
	}else{
		$("#shop_detail_information").show();
		$("#shop_top").addClass("shop_top").removeClass("shop_top1");
		$("#bg_shadow").removeClass("bg_shadow");
		$("#div_title").removeClass("div_title1").addClass("div_title");
	  	$("#div_sort").removeClass("div_sort1").addClass("div_sort");
	}
//		if(scrolltop>50)
//		{
//			$('.shop_detail_header1').show();
//			$(".header_img").hide();
//			$(".header_imgs").show();
//			$("#shop_detail_information").hide(1000);
//			$("#div_title").removeClass("div_title").addClass("div_title1");
//			$("#div_sort").removeClass("div_sort").addClass("div_sort1");
//			$("#bg_shadow").addClass("bg_shadow");
//			$("#fifter").show().addClass("fifter");
//		}
//		 else{
//			$('.shop_detail_header1').hide();
//			$(".header_img").show();
//			$(".header_imgs").hide();
//		  	$("#shop_detail_information").show();
//		  	$("#div_title").removeClass("div_title1").addClass("div_title");
//		  	$("#div_sort").removeClass("div_sort1").addClass("div_sort");		  			  	
//		  	$("#bg_shadow").removeClass("bg_shadow");
//		  	$("#fifter").hide().removeClass("fifter");
		  	
//		 }
	});*/



//分享链接
$(".header_img3")[xigou.events.click](function() {
	$('.share_friends').show();
});
$(".share_friends")[xigou.events.click](function() {
	$('.share_friends').hide();
});

//店铺-详情
function details(dropload) {
	var params = {
		p: 'tid=' + specialid,
		showLoading : showLoading,
		callback: function(response, status) { //回调函数
			if (status == xigou.dictionary.success) {
				var json = response || null;
				if (null == json || json.length == 0) return false;

				if (json.code == 0) {
					if(json.data.status && parseInt(json.data.status) == 0){
						window.location.href = "specialsaleend.html?specialname="+json.data.name;
						return;
					}

					if (title == '西客商城' && json.data.name) {
						title = json.data.name;
					}

					if(typeof(tophtml) != undefined)
					{
						$('.hd-tophtml').append(json.data.tophtml);
			
					}

					$('title').text(json.data.name);
					var htmlData = [];
					$('#imgLogo').attr('src', qiNiuUrl+json.data.logoPath);//店铺logo
					$(".shop_detail_header_bg").css({'background':'url('+ qiNiuUrl + json.data.mobileImage +') top no-repeat'});//店铺背景图片
					$('#details').append(htmlData.join(''));
					$('.ui-imglazyload').imglazyload();
					$("#fifter, .shop_name_detail").html(json.data.shopName); // 店铺名称
					order_price(dropload);

					var el = $('.zhuangchang'),
						n = Date.parse(new Date()),
						s = $(el).attr('starttime'),
						e = $(el).attr('endtime');
					if(parseInt(e-n)/1000/60/60/24<=7) {
						getTimeRest(n,e,$(el),true);
					}
					
					//专场
					if(window.location.href.indexOf("=6885")>-1||window.location.href.indexOf("=7498")>-1||window.location.href.indexOf("=7348")>-1||window.location.href.indexOf("=7707")>-1){
						xigou.setSessionStorage('comeFromAd','1');
						$(".floor_top_filter").addClass('hide');
						$(".products_list").addClass('hide');
					}

					var _script = $('script[src*="bokecc.com"]');
					if(_script && _script.length != 0){
						var sc = document.createElement("script");
						sc.src = _script[0].src;
						var _hImage =$("#headerImage")[0];
						_hImage.appendChild(sc);
						_script.remove();
					}

					var ImgItem = $('img')[0];
					if (ImgItem) {
						imgUrl = ImgItem.getAttribute('src');
					}
				}
			}
		}
	}; 
	if(haitao){
		xigou.activeSpecialsale.htdetails(params);
	}else{
		xigou.activeSpecialsale.details(params);
	}

};

//专场-商品列表
var specialsale_max = "N";
function product(page, isascending, me) {
	//isascending说明
	//“0”表示不参考价格因素
	//“1”表示升序，价格从底到高
	//“2”表示降序，价格从高到底
	//默认为空
	if(me && specialsale_max == "Y") {
		//me.disable("down",false);
		//$('.ui-refresh-down').hide();
		//$('.ui-refresh-down>span:first-child').removeClass();
		if (me) {
			me.lock();
		}
		return false;
	}
	if (typeof(isascending) == 'undefined') isascending = '';
	var pa = [];
	pa.push('tid=' + specialid);
	pa.push('curpage=' + page);
	pa.push('sort=' + isascending);
	pa.push('shopmobile=' + shopMobileVal);
	var params = {
		p: pa.join('&'),
		showLoading : false,
		callback: function(response, status) { //回调函数
			if (status == xigou.dictionary.success) {
				var json = response || null;
				if (null == json || json.length == 0) return false;

				if (json.code == 0) {
                    //$(window).unbind("scroll");//移除scroll绑定的function
                    //$('.ui-refresh-down').remove();
                    var isLoad = false;
					if (status == xigou.dictionary.success) {
						var json = response || null;
						if (null == json || json.length == 0) return false;
						if (json.code == 0) {
							var htmlData = [],
								hothtmlData = [],
								data = json.data.list,
								flgs = false,
								_status = "",
								default_img = xigou.default_img;

							if(typeof(response.data) == "undefined" ||  response.data == "" || typeof(response.data.list) == "undefined" || response.data.list.length == 0)
							{
								me.lock();
								$(".dropload-down").hide();
							}
							else
							{
								for (var i = 0; i < data.length; i++) {

									var imageurl = data[i].imgurl || xigou.default_img;
									var tid = specialid, sku = data[i].sku;
									var href='item.html?tid=' + tid + '&sku' + sku;

									var Yan = "00", Fen = "00";
								    var CHARS = data[i].price.split('.');
								    if (CHARS.length > 0) {
								        Yan = CHARS[0];
								        if (CHARS.length > 1) {
								            Fen = CHARS[1];
								        }
								    }

									htmlData.push('<div class="product_item">');
									htmlData.push('	<div class="product_item_box" tid="' + tid + '" sku="' + sku + '">');
									htmlData.push('		<a href="item.html?tid=' + tid +'&sku=' + sku + '">');
									htmlData.push('			<img class="product_img" src="' + imageurl + '" >');
									htmlData.push('			<div class="product_name">' + data[i].name + '</div>');
									htmlData.push('			<div class="product_price">￥<span class="product_price_yuan">' + Yan +'</span>.' + Fen + '&nbsp;');
									htmlData.push('				<span class="product_old_price">￥' + data[i].oldprice + '</span>');
									htmlData.push('			</div>');
									htmlData.push('			<div class = "fy_price" style = "display: none;">返佣:￥<span>' + data[i].commision + '</span></div>');
									htmlData.push('		</a>');
									htmlData.push('	</div>');
									htmlData.push('</div>');
								}

								if (page == 1) $("#shop_products_id").empty();
								$("#shop_products_id").append(htmlData.join(" "));

								// //保持图片高度一致
								// var _imgWidth = $('#shop_products_id>li img').width();
								// $('#shop_products_id>li img').height(_imgWidth);

								$(".product_item")[xigou.events.click](function() {
									//var l_specialid = $(this).attr("specialid");
									//var l_productid = $(this).attr("productid");
									//xigou.setSessionStorage('productdetails_backurl', "ssale.html?sid=" + specialid);
									//window.location.href = "item.html?sid=" + l_specialid + "&pid=" + l_productid+tmnotice;
								});

								$('.ui-imglazyload').imglazyload();

								$('.store_timer').each(function(index, el) {
									var s = $(el).attr('starttime'),
										e = $(el).attr('endtime');
									getTimeRest(s, e, $(el));
								});

								if (json.data.list.length > 0) {
									$('.ui-refresh-down').show();
									flgs = true;
								}

								if(json.data.totalpagecount == page) {
									specialsale_max = "Y";
								}
								
								//专场
								if(window.location.href.indexOf("=6885")>-1||window.location.href.indexOf("=7498")>-1||window.location.href.indexOf("=7348")>-1||window.location.href.indexOf("=7707")>-1){
									xigou.setSessionStorage('comeFromAd','1');
									$(".floor_top_filter").addClass('hide');
									$(".products_list").addClass('hide');
								}

								//记录锚点=========================
								var hdhistory = xigou.getSessionStorage("hdlistid");
								var dataStr = JSON.stringify(data);
								if(page == 1 || hdhistory != specialid) {
									xigou.setSessionStorage("hdlist","");
								};
								var _speciallist = xigou.getSessionStorage("hdlist");
								if(_speciallist) {
									var _oldData = JSON.parse(_speciallist);
									for(var m = 0,len = data.length;m < len ;m++) {
										_oldData.push(data[m]);
									}
									xigou.setSessionStorage("hdlist",JSON.stringify(_oldData));
								}else {
									xigou.setSessionStorage("hdlist",dataStr);
								}
								xigou.setSessionStorage("historyhdpage",page);
								xigou.setSessionStorage("hdlistid",specialid);

								if(shopMobileVal){
									$(".fy_price").show();
								}
							}
						}
						else
						{
							me.lock();
							$(".dropload-down").hide();
						}
					}
				}
			}
		}
	};
	xigou.activeSpecialsale.product(params);
};

//价格排序
function order_price(dropload) {
	$('#div_sort')[xigou.events.click](function() {
		//isascending
		//“0”表示不参考价格因素
		//“1”表示升序，价格从底到高
		//“2”表示降序，价格从高到底
		//默认为空
		switch (isascending) {
			case "0":
				isascending = "1";
				$(this).addClass("div_sort_down");
				$(this).removeClass("div_sort_up");
				break;
			case "1":
				isascending = "2";
				$(this).removeClass("div_sort_down");
				$(this).addClass("div_sort_up");
				break;
			case "2":
				isascending = "0";
				$(this).removeClass("div_sort_down");
				$(this).removeClass("div_sort_up");
				break;
			default:
				break;
		}
		specialsale_max = "N";
		listCount = 1;
		$("#shop_products_id").empty();
		dropload.unlock();
		dropload.resetload();
		product(listCount++, isascending, dropload);
	});
};


var shopOwer = null;
function getDssUserInfo(){
	var dssUser = xigou.getLocalStorage("dssUser");
	if (dssUser && dssUser != "{}") {
		dssUser = JSON.parse(dssUser);
		if (dssUser.token && dssUser.token == xigou.getToken()) {
			shopOwer = dssUser.mobile || dssUser.shopmobile;
			return;
		}
		else if (!xigou.getQueryString("shop")) {
			shopOwer = dssUser.mobile || dssUser.shopmobile;
			return;
		}
	}

	xigou.getDssUserInfo({
		requestBody: {
			'shop': xigou.getQueryString("shop"),
			'token':xigou.getToken(),
			'priority':0
		},
		callback: function(response, status) {
			if (status == xigou.dictionary.success) {
				if (response != null && response.mobile) {
					shopOwer = response.mobile;
					if (parseInt(response.source) == 0) {
						response.token = xigou.getToken();
					}
					else {
						response.shop = xigou.getQueryString("shop");
					}
					if(xigou.getLocalStorage("dssUser", true) == null || xigou.getLocalStorage("dssUser", true) == "" || xigou.getLocalStorage("dssUser", true) == "{}" || xigou.getLocalStorage("dssUser", response, true).mobile != response.mobile)
						xigou.setLocalStorage("dssUser", response, true);
				}
			}
		}
	});
}

function InitWeixin(){
	showLoading = false;
	xigou.loading.open();

	var pa = [];
	var url = location.href.split('#')[0].replace(/&+/g, "%26");
	pa.push('url=' + url);

	xigou.activeUser.config({
		p : pa.join('&'),
		showLoading: false,
		callback: function(response, status) { //回调函数
			if (status != xigou.dictionary.success) {
				return;
			} else if (!response || 0 != response.code) {
				return;
			}
			var data = response.data;
			wx.config({
				appId: data.appid,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'scanQRCode',
				]
			});
		}
	})
}

wx.ready(function () {
	// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
	wx.checkJsApi({
		jsApiList: [
			'getNetworkType',
			'previewImage'
		],
		success: function (res) {
		}
	});

	var tid = xigou.getQueryString('tid');
	var lineLink = location.href.split('?')[0] + '?tid=' + tid;
	if (shopOwer) {
		lineLink = lineLink + "&shop=" + shopOwer;
	}

	wx.onMenuShareAppMessage({
		title: title,
		desc: desc,
		link: lineLink,
		imgUrl: imgUrl,
		trigger: function (res) {
			// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		},
		success: function (res) {
		},
		cancel: function (res) {
		},
		fail: function (res) {
		}
	});

	wx.onMenuShareTimeline({
		title: title,
		link: lineLink,
		imgUrl: imgUrl,
		trigger: function (res) {
			// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		},
		success: function (res) {
		},
		cancel: function (res) {
		},
		fail: function (res) {
		}
	});

	wx.onMenuShareQQ({
		title: title,
		desc: desc,
		link: lineLink,
		imgUrl: imgUrl,
		trigger: function (res) {
		},
		complete: function (res) {
		},
		success: function (res) {
		},
		cancel: function (res) {
		},
		fail: function (res) {
		}
	});

	wx.onMenuShareWeibo({
		title: title,
		desc: desc,
		link: lineLink,
		imgUrl: imgUrl,
		trigger: function (res) {
		},
		complete: function (res) {
		},
		success: function (res) {
		},
		cancel: function (res) {
		},
		fail: function (res) {
		}
	});

	wx.onMenuShareQZone({
		title: title,
		desc: desc,
		link: lineLink,
		imgUrl: imgUrl,
		trigger: function (res) {
		},
		complete: function (res) {
		},
		success: function (res) {
		},
		cancel: function (res) {
		},
		fail: function (res) {
		}
	});
	xigou.loading.close();
	xigou.wxreadyalert();
});

wx.error(function (res) {
});

function loadHistoryData(){
	listCount = xigou.getSessionStorage("historyhdpage");
	var _speciallist = xigou.getSessionStorage("hdlist");

	if(_speciallist) {
		var data = JSON.parse(_speciallist);
		var htmlData = [];

		for(var i = 0, len = data.length;i<len;i++) {
			var imageurl = data[i].imgurl || xigou.default_img;
			var tid = specialid, sku = data[i].sku;
			var href='item.html?tid=' + tid + '&sku' + sku;

			var Yan = "00", Fen = "00";
			var CHARS = data[i].price.split('.');
			if (CHARS.length > 0) {
				Yan = CHARS[0];
				if (CHARS.length > 1) {
					Fen = CHARS[1];
				}
			}

			htmlData.push('<div class="product_item">');
			htmlData.push('	<div class="product_item_box" tid="' + tid + '" sku="' + sku + '">');
			htmlData.push('		<a href="item.html?tid=' + tid +'&sku=' + sku + '">');
			htmlData.push('			<img class="product_img" src="' + imageurl + '" >');
			htmlData.push('			<div class="product_name">' + data[i].name + '</div>');
			htmlData.push('			<div class="product_price">￥<span class="product_price_yuan">' + Yan +'</span>.' + Fen + '&nbsp;');
			htmlData.push('				<span class="product_old_price">￥' + data[i].oldprice + '</span>');
			htmlData.push('			</div>');
			htmlData.push('			<div class = "fy_price" style = "display: none;">返佣:￥<span>' + data[i].commision + '</span></div>');
			htmlData.push('		</a>');
			htmlData.push('	</div>');
			htmlData.push('</div>');
		}
		$("#shop_products_id").empty().append(htmlData.join(" "));
		if(shopMobileVal){
			$(".fy_price").show();
		}

		var tid = xigou.getSessionStorage("specialid");
		var sku = xigou.getSessionStorage("specialSku");
		if (tid == specialid && sku) {
			var _scrollEl = $('a[href$="'+sku+'"]')[0];
			if (_scrollEl) {
				setTimeout(function(){
					_scrollEl.scrollIntoViewIfNeeded();
				}, 500);
			}
		}
	}
}

//初始化客服
function Initkf(){
	var name = xigou.getLocalStorage("show_name")|| xigou.getLocalStorage("login_name") || "西客会员";
	if (name) {
		var oScript= document.createElement("script");
		oScript.type = "text/javascript";
		oScript.src='https://qiyukf.com/script/6e39dddabff63d902f55df3961c2793d.js?name=' + name + '&mobile=' + name;
		$('body')[0].appendChild(oScript);
	}

	$('body').append('<div class="header_img header_img2" id="header_img2" onclick="ysf.open();return false;"></div>');
	
};