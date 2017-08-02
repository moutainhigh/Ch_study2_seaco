var pageii;
$(function(){
	
	$('.advertPlateditbtn').live('click',function(){
		
		var id= $(this).attr('param');						
		  pageii=$.layer({
            type : 2,
            title: '广告平台->编辑',
            shadeClose: true,
            maxmin: true,
            fix : false,  
            area: ['500px', 400],                     
            iframe: {
                src : domain+'/basedata/advertPlat/edit.htm?id='+id
            } 
        });
	}); 
	
	
	
	
	
//取消按钮
	$('.closebtn').on('click',function(){
		parent.layer.close(parent.pageii);
	});
	
$('.advertPlataddbtn').live('click',function(){				
		  pageii=$.layer({
            type : 2,
            title: '广告平台->增加',
            shadeClose: true,
            maxmin: true,
            fix : false,  
            area: ['500px', 400],                     
            iframe: {
                src : domain+'/basedata/advertPlat/add.htm'
            } 
        });
	}); 

if($("#datasubmit").is("input")){
	var butt=$("#datasubmit");
	$.formValidator.initConfig({submitButtonID:"datasubmit",debug:false,onSuccess:function(){advertPlatSubmit(butt);},onError:function(){alert("具体错误，请看网页上的提示")}});
	$("#advertPlatName").formValidator({onShow:"请输入品广告平台",onFocus:"至少1个字符,最多20个字符",onCorrect:"正确"}).inputValidator({min:1,max:40,onError:"你输入的广告平台不合法,请确认"});
	$("#remark").formValidator({onShow:"请输入备注",onFocus:"可以为空,最多50个字符",onCorrect:"正确"}).inputValidator({min:0,max:100,onError:"你输入的备注不合法,请确认"});	
	}
});

function advertPlatSubmit(button){
	var address= $(button).attr('param');
	$.ajax({
        cache: true,
        type: "POST",
        url:domain+address,
        data:$('#advertPlatupdate').serialize(),
        async: false,
        error: function(request) {
            alert("Connection error");
        },
        success: function(result) {
        	if(result.success){
                layer.alert("保存成功", 1, function(){
                	parent.window.location.reload();
                	parent.layer.close(parent.pageii);
                })
            }else{
            	layer.alert(result.msg.message, 8);		
            }
        }
    });
}
function dataReset(button){
	clearForm('queryForm');
}

function clearForm(id) {
	var formObj = document.getElementById(id);
	if (formObj == undefined) {
		return;
	}
	for (var i = 0; i < formObj.elements.length; i++) {
		if (formObj.elements[i].type == "text") {
			formObj.elements[i].value = "";
		} else if (formObj.elements[i].type == "password") {
			formObj.elements[i].value = "";
		} else if (formObj.elements[i].type == "radio") {
			formObj.elements[i].checked = false;
		} else if (formObj.elements[i].type == "checkbox") {
			formObj.elements[i].checked = false;
		} else if (formObj.elements[i].type == "select-one") {
			formObj.elements[i].options[0].selected = true;
		} else if (formObj.elements[i].type == "select-multiple") {
			for (var j = 0; j < formObj.elements[i].options.length; j++) {
				formObj.elements[i].options[j].selected = false;
			}
		} else if (formObj.elements[i].type == "file") {
			var file = formObj.elements[i];
			if (file.outerHTML) {
				file.outerHTML = file.outerHTML;
			} else {
				file.value = ""; // FF(包括3.5)
			}
		} else if (formObj.elements[i].type == "textarea") {
			formObj.elements[i].value = "";
		}
	}
}