jQuery(function($){
	// Common
	var select_root = $('div.select');
	var select_value = $('.my_value');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');

	// 신혼이야기 메뉴 hover
	if ($(".slgj_mm2").length!=="0") {
		$(".slgj_mm2").find("a").bind({
			mouseover : function(){
				if ($(this).attr("class")!=="this")
				{
					$(this).find("img").attr('src',''+$(this).find("img").attr("src").replace("slgj_m2_","slgj_over_m2_")+'');
				}				
			},
			mouseout : function(){
				if ($(this).attr("class")!=="this")
				{
					$(this).find("img").attr('src',''+$(this).find("img").attr("src").replace("slgj_over_m2_","slgj_m2_")+'');
				}
			}
		})
	}


	// Radio Default Value
	$('div.my_value').each(function(){
		var default_value = $(this).next('.i_list').find('input[checked]').next('label').text();
		$(this).append(default_value);
	});

	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine')});
	select_value.bind('focusout',function(){$(this).removeClass('outLine')});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.my_value').addClass('outLine')});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.my_value').removeClass('outLine')});

	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}

	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}

	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}

	// Set Input
	function set_label(){
		var v = $(this).next('label').text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}

	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.a_list').parent('.select').removeClass('open');
	});

	select_value.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open')});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);

	// 좌측검색
	var btnSearchComm = $('#hs_cm_search .b_hscms_go');
	if (btnSearchComm)	{
		if (document.getElementById('hscms_ipt'))	{
			formCheck('hscms_ipt');
		}
		btnSearchComm.bind('mouseover',function() {
			this.className='gbtn b_hscms_go b_hscms_go_over';
		});
		btnSearchComm.bind('mouseleave',function() {
			this.className='gbtn b_hscms_go';
		});
	};

	hsstrLyr();
	mainVisual();
	hsmbSet1();
	// Product List
	showItemListHover(".hs_product_b_list>li");
	// 전시품 할인판매
	showItemListHover("#hs_show_item_list>tbody>tr");
	// 매장찾기
	showItemListHover(".hsf_si_list>tbody>tr");
	// 이벤트 당첨자발표
	showItemListHover(".hs_event_prc>tbody>tr");
	// 우편번호 검색결과
	showItemListHover(".zs_result_list>li");
	$("body").addClass('load_after');

	aniCrs.init();
	hsfSdPhoto();
});

// show layer
function showLayer(id) {
		var obj = document.getElementById(id);
		obj.style.display='inline';
}

// close layer
function closeLayer(id) {
		var obj = document.getElementById(id);
		obj.style.display='none';
}

// snb
var snbFunc = ({
	init : function() {
		ul3depth = $(".m_3d_snb");
		parentEle = $(".m_2d_snb>li.last");
		this.snbAnimation();
	},

	snbAnimation : function() {
		$(".m_2d_snb>li.last .b_s2_product").each(function(index){
			$(this).click(function(){
				var parentClass = $(this).parent().attr("class");
				if (parentClass=="last")
				{
					$(this).blur();
					$(this).parent().addClass("now");
					$(this).next().slideDown(250);
				} else {
					$(this).blur();
					$(this).parent().removeClass("now");
					$(this).next().slideUp(250);
				}
			});
		});

	},

	resetClass : function() {
		for (var i=0; i < parentEle.length ; i++ )
		{
			parentEle[i].className='last';
		}
	}
});

function productListAction() {
	$(".hsp_thumb").bind('mouseover', function() {
		$(".hsp_thumb").prev().css('display','none');
		$(this).prev().css('display','block');
	});
	$(".hsp_thumb").prev().bind('mouseleave', function() {
		$(this).css('display','none');
	})
};

// 리스트 hover
function showItemListHover(objElement) {
	$(""+objElement+"").bind('mouseover', function() {
		$(this).addClass("hover");
	});
	$(""+objElement+"").bind('mouseleave', function() {
		$(this).removeClass("hover");
	});
};

// 폼 검사
function formCheck(id) {
	var inpObj = document.getElementById(id);
	if (inpObj.value!=="") {
		var inpObjValue=inpObj.value;
	}
	inpObj.onfocus = function() {
		if (inpObj.value==inpObjValue){
			inpObj.value="";
		}
	}
	inpObj.onblur = function() {
		if (inpObj.value=="") {
			inpObj.value=inpObjValue;
		}
	}
};

// Mrs.패리스 스타일 액션
function mrsHide() {
	$("#hs_mrs_c_wrap div").css("display","none");
	$("#hs_mrs_m li").removeClass("this");
};

// 상단 레이어
function hsstrLyr() {
	var timer = null;
	$("a.b_gnb_sotry").mouseover(function() {
		$(this).parent().addClass("this");
		$("#m_gnb_t_lyr").show();
		if(timer) {clearTimeout(timer);}
	});
	$("a.b_gnb_sotry").mouseleave(function() {
		$(this).parent().removeClass("this");
		timer = setTimeout(function(){$("#m_gnb_t_lyr").hide()}, 500);
	});
	$("#m_gnb_t_lyr").mouseenter(function() {
		$("a.b_gnb_sotry").parent().addClass("this");
		$("#m_gnb_t_lyr").show();
		if(timer) {clearTimeout(timer);}
	});
	$("#m_gnb_t_lyr").mouseleave(function() {
		$("a.b_gnb_sotry").parent().removeClass("this");
		$("#m_gnb_t_lyr").hide();
	});
};

// 메인
function mainVisual() {
	var mvAni = $("#hsm_vsl");
	mvAni.delay(4000).animate({
		left: '-=731'
	}, 1000, function() {
			if (mvAni.css('left')=='-2193px')
			{
				mvAni.css('left','0');
				$("#hsm_vslBtn a").parent().removeClass("this");
				$("#hsm_vslBtn a").first().parent().addClass("this");
			}
			if (mvAni.css('left')=='-731px')
			{
				$("#hsm_vslBtn a").parent().removeClass("this");
				$("#hsm_vslBtn a").filter(".str2").parent().addClass("this");
			}
			if (mvAni.css('left')=='-1462px')
			{
				$("#hsm_vslBtn a").parent().removeClass("this");
				$("#hsm_vslBtn a").last().parent().addClass("this");
			}
			setTimeout(mainVisual, 4000);
			}
	);

	$("#hsm_vslBtn a").first().mouseover( function(){
		mvAni.stop();
		$("#hsm_vslBtn a").parent().removeClass("this");
		$(this).parent().addClass("this");
		mvAni.animate({left:'0'});
	})
	$("#hsm_vslBtn a").filter(".str2").mouseover( function(){
		mvAni.stop();
		$("#hsm_vslBtn a").parent().removeClass("this");
		$(this).parent().addClass("this");
		mvAni.animate({left:'-731'});
	})
	$("#hsm_vslBtn a").last().mouseover( function(){
		mvAni.stop();
		$("#hsm_vslBtn a").parent().removeClass("this");
		$(this).parent().addClass("this");
		mvAni.animate({left:'-1462'});
	});
}


// 메인 가운데배너(2개짜리)
function hsmbSet1() {
	var hsmbSet1Ani = $("#hsmbSet1");

	hsmbSet1Ani.find("div").each(function(index) {
		$(this).attr("id","hsmbSet1Inner"+index+"");
	});

	if (hsmbSet1Ani.find("div").filter(".this").attr("id")=="hsmbSet1Inner3")
	{
		hsmbSet1Ani.find("div").first().css("display","block");
	} else {
		hsmbSet1Ani.find("div").filter(".this").next().css("display","block");
	}
	
	hsmbSet1Ani.find("div").filter(".this").delay(2000).animate({
		opacity : 0
	}, 1000, function() {
			var nowThis = hsmbSet1Ani.find("div").filter(".this");
			nowThis.css("display","none");
			hsmbSet1Ani.find("div").removeClass("this");
			$("#hsmbSet1Menu a").parent().removeClass("this");

			if (nowThis.attr("id")=="hsmbSet1Inner0")
			{
				nowThis.next().addClass("this");					
				$("#hsmbSet1Menu a").filter(".str2").parent().addClass("this");
			} else if (nowThis.attr("id")=="hsmbSet1Inner1")
			{
				nowThis.next().addClass("this");	
				$("#hsmbSet1Menu a").filter(".str3").parent().addClass("this");

			} else if (nowThis.attr("id")=="hsmbSet1Inner2")
			{
				nowThis.next().addClass("this");	
				$("#hsmbSet1Menu a").filter(".str4").parent().addClass("this");
			} else if (nowThis.attr("id")=="hsmbSet1Inner3")
			{
				hsmbSet1Ani.find("div").first().addClass("this");
				$("#hsmbSet1Menu a").filter(".str1").parent().addClass("this");
			}
	
			hsmbSet1Ani.find("div").css("opacity","100");
			
			setTimeout(hsmbSet1,1000);
			}
	);

	$("#hsmbSet1Menu li").first().bind({
		mouseenter : function(){
			console.log("오버");
			hsmbSet1Ani.find("div").filter(".this").stop();

			$("#hsmbSet1Menu a").parent().removeClass("this");
			$(this).addClass("this");
		},
		mouseleave : function(){
			console.log("아웃");


		}
	});

	$("#hsmbSet1Menu a").filter(".str2").mouseover( function(){
		hsmbSet1Ani.find("div").filter(".this").stop();
		$("#hsmbSet1Menu a").parent().removeClass("this");
		$(this).parent().addClass("this");

		hsmbSet1Ani.find("div").removeClass("uthis");

		$("#hsmbSet1Inner1").css("display","block");
		$("#hsmbSet1Inner1").addClass("uthis");

		hsmbSet1Ani.find("div").filter(".this").fadeOut(500, function(){			
		});
	})
	$("#hsmbSet1Menu a").filter(".str3").mouseover( function(){
		hsmbSet1Ani.find("div").filter(".this").stop();
		$("#hsmbSet1Menu a").parent().removeClass("this");
		$(this).parent().addClass("this");

		hsmbSet1Ani.find("div").removeClass("uthis");

		$("#hsmbSet1Inner2").css("display","block");
		$("#hsmbSet1Inner2").addClass("uthis");

		hsmbSet1Ani.find("div").filter(".this").fadeOut(500, function(){			
		});
	})
	$("#hsmbSet1Menu a").last().mouseover( function(){
		hsmbSet1Ani.find("div").filter(".this").stop();
		$("#hsmbSet1Menu a").parent().removeClass("this");
		$(this).parent().addClass("this");

		hsmbSet1Ani.find("div").removeClass("uthis");

		$("#hsmbSet1Inner3").css("display","block");
		$("#hsmbSet1Inner3").addClass("uthis");

		hsmbSet1Ani.find("div").filter(".this").fadeOut(500, function(){			
		});
	});
}

// 거실레시피 before&after
function drBeforeAfter() {
	var wrapElement = $(".hsdr_t2_2dm").find("a");
	wrapElement.mouseover(function(){
		if ($(this).attr("class")!=="this")
		{
			$(this).find("img").attr("src",''+$(this).find("img").attr("src").replace('2dm_','2dm_over_')+'');
		}
	});
	wrapElement.mouseout(function(){
		if ($(this).attr("class")!=="this")
		{
			$(this).find("img").attr("src",''+$(this).find("img").attr("src").replace('2dm_over_','2dm_')+'');
		}
	});
}

function drBnAani() {
	var objElement = $(".in_mem").find("a");
	var animateElement = $(".hsdr_t2_rl_c_in");

	objElement.mouseover(function(){
		objElement .parent().removeClass("this");
		$(this).parent().addClass("this");
		if ($(this).attr("class")=="before")
		{
			animateElement.animate({'left':'0'});
		} else if ($(this).attr("class")=="after")
		{
			animateElement.animate({'left':'-731px'});
		}
	});

}

// 거실레시피 참여 신청서
function dRoomApply() {
	var elementWrap = $("#hsdrFmFileUpload");
	var btnElement = $("#hsdrFmFileAdd");
	var insertContemt = '<li><input type="file" class="ipfile" /><span class="file"><input type="text" class="iptxt" disabled="disabled" value="" /></span></li>';

	btnElement.click(function(){
		if (elementWrap.find("li").length>=10)
		{
			alert("사진파일은 최대 10개까지만 첨부 가능합니다.");
		} else {
			elementWrap.append(insertContemt);
		}
	});
}

// 가운데 하단 좌/우 캐러셀 배너
var aniCrs = ({
	init : function() {
		this.aniWrap = $("#hsmbSet2");
		this.aniObj = $("#hsmbSet2In");
		this.aniObjIn = this.aniObj.find("div");
		this.aniBtnWrap = $("#hsmbSet2Menu");


		this.aniObj.append(this.aniObjIn.filter(":first").clone());
		this.aniObj.css({"width":""+ parseInt(this.aniObjIn.filter(":first").css('width')) * this.aniObj.find("div").length +"", "height":""+this.aniObjIn.find("img").css('height')+""});

		// 애니메이션 각 오브젝트에 class 부여
		this.aniObj.find("div").each(function(index){
			var index = index+1;
			$(this).addClass("str"+index+"");
		});
		this.aniObj.find("div").filter(":first").addClass("eleFirst");
		this.aniObj.find("div").filter(":last").addClass("eleLast");

		this.play();
	},

	play : function() {
		_this = this;
		_this.aniObjIn.find("a").each(function() {
			$(this).bind({
				mouseenter : function() {
					_this.aniObj.stop(true, true);
				},
				mouseleave : function() {
					setTimeout(aniCrs.play(), 2000);
				}
			});
		});
		_this.aniBtnWrap.find("a").filter(".b_left").bind("click", function(){
			_this.aniObj.stop(true, true);
			if (parseInt(_this.aniObj.css("left"))=="0") {
				_this.aniObj.css("left","-"+ _this.aniObjIn.width() * _this.aniObjIn.length +"px");
				_this.aniObj.animate({"left":"+="+ _this.aniObjIn.width() +""}, 1000);
			} else {
				_this.aniObj.animate({"left":"+="+ parseInt(_this.aniObjIn.css('width'))+""}, 1000);
			}
			return false;
		});
		_this.aniBtnWrap.find("a").filter(".b_right").bind("click", function(){
			_this.aniObj.stop(true, true);
			if (parseInt(_this.aniObj.css("left"))=="-"+ _this.aniObjIn.width() * (_this.aniObjIn.length - 1) +"") {
				_this.aniObj.animate({"left":"-="+ _this.aniObjIn.width() +""}, 1000, function() {
					_this.aniObj.css("left","0");
				});
			} else {
				_this.aniObj.animate({"left":"-="+ parseInt(_this.aniObjIn.css('width'))+""}, 1000);
			}
			return false;
		});
	}
});

// 매장사진
function hsfSdPhoto() {
	$("#hsfSdThumb").find("a").bind("click", function(){
		$("#hsfSdThumb").find("a").removeClass("this");
		var thisImgSrc = $(this).find("img").attr("src");
		thisImgSrc = thisImgSrc.replace("_t_","_");
		$(this).addClass("this");
		$("#hsfSdPhoto").find("img").attr("src",""+ thisImgSrc +"");
		return false;
	});
}