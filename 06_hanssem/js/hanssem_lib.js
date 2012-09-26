jQuery(function($){
	// Common
	var select_root = $('div.select');
	var select_value = $('.my_value');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');

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
	// Product List
	showItemListHover(".hs_product_b_list>li");
	// 전시품 할인판매
	showItemListHover("#hs_show_item_list>tbody>tr");
	// 매장찾기
	showItemListHover(".hsf_si_list>tbody>tr");
	// 우편번호 검색결과
	showItemListHover(".zs_result_list>li");
	$("body").addClass('load_after');
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
		left: '-=930'
	}, 1000, function() {
			if (mvAni.css('left')=='-2790px')
			{
				mvAni.css('left','0');
				$("#hsm_vslBtn a").parent().removeClass("this");
				$("#hsm_vslBtn a").first().parent().addClass("this");
			}
			if (mvAni.css('left')=='-930px')
			{
				$("#hsm_vslBtn a").parent().removeClass("this");
				$("#hsm_vslBtn a").filter(".str2").parent().addClass("this");
			}
			if (mvAni.css('left')=='-1860px')
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
		mvAni.animate({left:'-930'});
	})
	$("#hsm_vslBtn a").last().mouseover( function(){
		mvAni.stop();
		$("#hsm_vslBtn a").parent().removeClass("this");
		$(this).parent().addClass("this");
		mvAni.animate({left:'-1860'});
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