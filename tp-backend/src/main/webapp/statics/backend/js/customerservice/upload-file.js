var pageii;
$(function(){
	
	$('#uploadFileBtn').live('click',function(){
		  pageii=$.layer({
            type : 2,
            title: '上传文件',
            shadeClose: true,
            maxmin: true,
            fix : false,  
            area: ['600px','300px', 300],                     
            iframe: {
                src : domain+'/customerservice/offset/importtemplate.htm'
            } 
        });
	}); 
	
	//取消按钮
	$('#closeBtn').on('click',function(){
		parent.layer.close(parent.pageii);
	});
	
	
	/**
	 * 上传附件
	 */
	$('#dataFormSave').live('click',function(){
		if(check()){
			$('#inputForm').submit();	
		}
	}); 
	
}); 	

function check(){
	var fileName = $("#skuExcel").val();
	if($.trim(fileName)==''){
		alert("请选择导入模板");
	    return false;
	}
	if(fileName.lastIndexOf(".")!=-1){
		var fileType = (fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)).toLowerCase();
	    var suppotFile = new Array();
	    suppotFile[0] = "xls";
	    for(var i =0;i<suppotFile.length;i++){
	       if(suppotFile[i]==fileType){
	    	   return true;
	       }else{
	    	   continue;
	       }
	    }
	    alert("不支持文件类型"+fileType);
		return false;
	 }
}