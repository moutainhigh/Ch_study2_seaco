$(function(){

	$(".page1_5").click(function(){
		$(".page2").show().siblings().hide();
	})
	$(".page2_2").click(function(){
		$(".page2_2").hide();
		$(".page3").show().siblings().hide();
		$("audio").attr("src","music/mouse.wav");
		turn_next();
	})
	/*$(".page3").click(function(){
		$(".page4").show().siblings().hide();
		$("audio").attr({
			"src":"music/sergoor_1.mp3",
			"loop":"loop"
		});
	})*/
	$(".page4_5").click(function(){
		$(".page5").show().siblings().hide();
		$("audio").attr("src","");
	})
	$(".page2_3").click(function(){
		$(".page2_3").hide();
		$(".page4_7>img").attr("src","img/pants_word.png");
		$(".page6").show().siblings().hide();
		$("audio").attr({
			"src":"",
		});
		setTimeout(function () {
	        $("audio").attr({
				"src":"music/broken.wav",
				"loop":"",
			});
    	}, 1500);
    	turn_next();
	})
	$(".page2_4").click(function(){
		$(".page2_4").hide();
		$(".page4_7>img").attr("src","img/hot_word.png");
		$(".page7").show().siblings().hide();
		$("audio").attr({
			"src":"music/water_boom.mp3",
			"loop":""
		});
		turn_next();
	});
	var i = 0;
	$(".page4_6").click(function(){
		i++;
		$(".page2").show(function(){
			if(i>=2){
			setTimeout(function () {
	        	$(".page4_6").hide();
    		}, 1000);
		}
		}).siblings().hide();
		$("audio").attr({
			"src":"music/bg_music.mp3",
			"loop":"loop"
		});


	})
	$(".group-share").click(function() {
		$('.share_friends').show();
	});
	$(".share_friends").click(function() {
		$('.share_friends').hide();
	});
})

function turn_next(){
	setTimeout(function () {
		$(".page4").show().siblings().hide();
		$("audio").attr({
			"src":"music/sergoor_1.mp3",
			"loop":"loop"
		});
    }, 3000);
}
