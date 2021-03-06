<#include "/common/common.ftl"/> 
<@backend title="优惠券发放" 
			js=['/statics/backend/js/coupon/couponIssue_edit.js',
				'/statics/backend/js/layer/layer.min.js']
			css=[]>
<form class="jqtransform" method="post" id="couponIssueForm" action="${domain}/coupon/issueCoupon.htm" method="post">
	<input type="hidden" class ="input-text" style="width:580px;"  id="id" name="id" value="${couponSend.id}"/>
	<div class="mt10" id="forms">
	    <div class="box">
	        <div class="box_border">
	            <div class="box_top">
	                <b class="pl15">促销管理->优惠券->优惠券发放</b> 
	            </div>
	            <table cellspacing="0" cellpadding="0" border="0" width="100%" class="form_table pt15 pb15">
	                <tbody>
	                    <!--虚线-->
	                    <tr>
	                        <td colspan="8">
	                            <hr style="border: 1px dashed #247DFF;" />
	                        </td>
	                    </tr>
					</tbody>
				</table>
				<table cellspacing="0" cellpadding="0" border="0" width="100%" class="form_table pt15 pb15">
	                <tbody>
	                 <tr>
	                        <td align="left">
	                        	<span>发送标题</span>
	                        </td>
	                        <td align="left">
	                        	<input type="text" class ="input-text" style="width:580px;"  id="name" value="${couponSend.name}"/>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td align="left">
	                        	<span>优惠券批次:</span>
	                        </td>
	                        <td colspan="5"  align="right">
	                        	<fieldset id="couponBatch">
	                        		<table id="couponList" cellspacing="0" cellpadding="0" border="0" width="100%" class="form_table pt15 pb15">
						                <tbody>
						                
						                	<#if (couponList??)>
													<#list couponList as coupon>
														<tr>
									                    	<td style="width:80px">
									                    		<a href="javascript:void(0);" name="plusCoupon" style="margin-right:10px;">+</a>
									                    		<a href="javascript:void(0);" name="minuCoupon" style="margin-right:10px;">-</a>
									                    	</td>
									                    	<td style="width:120px">
									                    		<span>优惠券批次:</span>
									                    	</td>
									                    	<td style="width:120px">
									                    		<input type="text" class="input-text lh30" style="width:80px" name="batchNo"  value="${coupon.id}"/>
									                    	</td>
									                    	<td style="width:300px">
									                    		<input type="text" class="input-text lh30" name="batchName"  value="${coupon.couponName}" />
									                    	</td>
									                    	<td>
									                    		<input type="button" class="btn btn82 btn_save2" name="confirm" value="确定" />
																<input type="button" class="btn btn82 btn_search" name="search" value="查询" />
									                    	</td>
									                    </tr>
													</#list>
													
												<#else>
														<tr>
									                    	<td style="width:80px">
									                    		<a href="javascript:void(0);" name="plusCoupon" style="margin-right:10px;">+</a>
									                    		<a href="javascript:void(0);" name="minuCoupon" style="margin-right:10px;">-</a>
									                    	</td>
									                    	<td style="width:120px">
									                    		<span>优惠券批次:</span>
									                    	</td>
									                    	<td style="width:120px">
									                    		<input type="text" class="input-text lh30" style="width:80px" name="batchNo"  id="default_cid"/>
									                    	</td>
									                    	<td style="width:300px">
									                    		<input type="text" class="input-text lh30" name="batchName" id="default_cname" />
									                    	</td>
									                    	<td>
									                    		<input type="button" class="btn btn82 btn_save2" name="confirm" value="确定" />
																<input type="button" class="btn btn82 btn_search" name="search" value="查询" />
									                    	</td>
									                    </tr>
													
												</#if>
													
						                    
						                </tbody>
						            </table>
	                        	</fieldset>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td align="left">
	                        	<span>用户清单:</span>
	                        </td>
	                        <td align="left">
	                        	<input type="checkbox" name="allUser" id="allUser"/><span>全体会员</span>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<td></td>
	                        <td align="left">
								<textarea id="userList" name="userList" style="width:100%;height:100px;">${couponSend.toUserIds}</textarea>
	                        </td>
	                    </tr>
	                    
	                    <tr>
	                        <td align="left">
	                        	<span>短信提醒:</span>
	                        </td>
	                        <td align="left">
	                        	<input type="checkbox" name="msgSend" id="msgSend"/>
	                        	<span>发送&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（建议70个字以内，最长140个字）</span>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<td></td>
	                        <td align="left">
								<textarea id="msgContent" name="msgContent" style="width:100%;height:100px;">${couponSend.msgContent}</textarea>
	                        </td>
	                    </tr>
	                    
	                    <tr>
						<td align="right">
						</td>
						<td align="left">
							<div style="padding-left:10px;float:left;">
								<input type="button" class="btn btn82 btn_save2 issue" id="save" value="保存" status= "0"/>
							</div>
							<div style="padding-left:10px;float:left;">
								<input type="button" class="btn btn82 btn_save2 issue" id="issue" value="提交" status= "1"/>
							</div>
							
							<div style="padding-left:10px;float:left;">
								<input type="button" class="btn btn82 btn_del closebtn" id="cancel_page" value="返回" />
							</div>
							
							<input type="hidden" id="dto" value='${infos}' />   
                     		<input type="hidden" id="conponSendId" value='${couponSend.id}'/>  
                     		<input type="hidden" id="only_view" value='${onlyView}'/>  
						</td>
					</tr>
					</tbody>
				</table>
				<#include  "/coupon/coupon_audit_info.ftl" />
				<#include  "/coupon/coupon_send_result.ftl" />
				
			</div>
		</div>
	</div>
</form>
</@backend>