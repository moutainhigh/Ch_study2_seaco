<#include "/layout/inner_layout.ftl" />

<@sellContent title=""  
	js=[
	'/static/seller/js/jquery.tools.js',
	'/static/seller/js/layer/layer.min.js',
	'/static/seller/js/tab.js',
	'/static/seller/js/form.js',
	'/static/seller/js/json2.js',
	'/static/seller/js/item/item.js',
	'/static/seller/js/item/item-category.js',
	'/static/select2/js/select2.js',
	'/static/select2/js/select2Util.js',
	'/static/select2/js/select2_locale_zh-CN.js',
	'/static/seller/js/item/item-select2.js',
	'/static/seller/js/item/item-prd.js'
	] 
	css=[
	'/static/seller/css/style.css',
	'/static/select2/css/select2.css',
	'/static/select2/css/common.css',
	'/static/css/main.css',
	'/static/seller/css/main.css'
	 ] 
	 
	 
	 >
<!--
-->
<form id="inputForm" action="save.htm" method="post" enctype="multipart/form-data">
<#include "/seller/sellItem/subpage/add_spu.ftl">
<div class="tc">
	<input type="button" value="新增" id= "newPrdBtn" params = "${specGroupIdsStr}" class="ext_btn ext_btn_submit m10" />
	<input type="button" value="保存" id= "saveItemPrdsBtn" class="ext_btn ext_btn_submit m10" />
	<input type="button" value="返回"  id="backBtn" 	class="ext_btn  m10" />	
</div>
<#include "/seller/sellItem/subpage/prd_list.ftl">
</form>
</@sellContent>
