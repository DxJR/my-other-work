$charset="utf-8"

$(window).ready(function() {
	imTv.init();	

	if ($("#scriptScrollWrap").length!="0")
	{
		var screenHeight = $(window).height();
		var scriptScrollHeight = screenHeight - (47 + 91);

		if ($(".bscw_open").length!="0")
		{
			if ($(".bsc_only").length!="0")
			{
				$("#scriptScrollWrap").css("height",""+screenHeight+"px");
			} else {
				$("#scriptScrollWrap").css("height",""+scriptScrollHeight+"px");
			}			
			var myScroll = new iScroll('scriptScrollWrap');			
		}
	}
});

var imTv = ({
	init : function() {
		this.swipeInit("visualSwipe", ".visual_by", "500");
		this.swipeInit("swipeLecture", ".lecture_list", ".lecture_swipe_w", "500");
		this.tabSelector(".ld_tab_w","ld_c_w"); //강의상세보기
		this.tabSelector(".ml_tab_w","ml_c_w"); //내강의
		this.lectureListDetailView();
	},

	swipeInit : function(obj, inElement, inElementWidthTarget, speed) {
		var swipeObj = $("#"+obj);
		var swipeInObj = swipeObj.find(inElement);
		var swipeSpeed = speed;
		var currentSwipeObj = 0;
		var maxISwipeObj = swipeInObj.length;
		var swipeObjWidth = swipeInObj.width() + ((parseInt(swipeInObj.css("marginLeft")) + parseInt(swipeInObj.css("marginRight"))) * maxISwipeObj) ;
		swipeInObj.css('width',''+$(""+inElementWidthTarget+"").width()+'px');

		swipeObj.css("width",""+ swipeObjWidth * maxISwipeObj +"px");


		$("#"+obj).cfTouchSwipe({
			minSwipeLength: 50,
			minMoveLength: 15,
			triggerClick: true,
			preventDefault: true,
			swipeLeft: function() {
				currentSwipeObj = Math.max(currentSwipeObj + 1, 0);
				if (currentSwipeObj < maxISwipeObj) {
					this.swipeAnimation(swipeObjWidth * currentSwipeObj, swipeSpeed);
				}
			},
			swipeRight: function() {
				currentSwipeObj = Math.max(currentSwipeObj - 1, 0);
				this.swipeAnimation(swipeObjWidth * currentSwipeObj, swipeSpeed);
			},
			swipeAnimation : function(distance, duration) {
				swipeObj.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
				var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
				swipeObj.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
			}
		});
	},
	// 탭선택
	tabSelector : function(tabWrapper, tabContentClass) {
		var tabWrapper = $(tabWrapper);
		var tabMenu = tabWrapper.find(".ld_tab");
		var tabMenuList = tabMenu.find("li");
		var tabMenuMax = tabMenuList.length;
		var tabMenuNowIndex = tabMenuList.filter(".this").index();
		var tabMenuEachWidth = 100/tabMenuMax;		
		var tabBorder = tabWrapper.find(".bdb");

		tabMenuList.css("width",""+tabMenuEachWidth+"%");
		tabBorder.css("width",""+tabMenuEachWidth+"%");

		tabMenuList.each(function(index) {
			$("."+tabContentClass+"").css("display","none");
			$("."+tabContentClass+":eq("+tabMenuNowIndex+")").css("display","block");
			tabBorder.css("left",""+tabMenuEachWidth*tabMenuNowIndex+"%");
		});

		tabMenu.find("a").each(function(index) {
			$(this).bind("click", function() {
				var bindClickIndex = index;
				if ($(this).parent().attr("class") !== "this") {
					tabMenuList.removeClass("this");
					$(this).parent().addClass("this");	
					tabBorder.animate({"left" : ""+tabMenuEachWidth*index+"%"}, {duration:300, queue:true, complete:function() {
						$("."+tabContentClass+"").css("display","none");
						$("."+tabContentClass+":eq("+index+")").css("display","block");
					}});
				}
				return false;
			});
		});
	},
	// 개별강의 상세
	lectureListDetailView : function() {
		var lectureListWrap = $("#ldList");
		var lectureTitle = lectureListWrap.find("h5");
		var lectureControlTitle =$(".ld_list_ct");

		lectureTitle.each(function(index) {
			$(this).bind("click", function() {
				var listDetailWrap = $(".ld_list_d_w:eq("+index+")");

				if (listDetailWrap.attr("class")=="ld_list_d_w ld_list_d_w_open") {
					listDetailWrap.animate({"height" : "0px"}, {duration:300, queue:true, complete:function() {
						listDetailWrap.removeClass("ld_list_d_w_open");
						lectureTitle.removeClass("ld_list_in_this");
						$(".ld_list_ct_this").removeClass("ld_list_ct_this");
					}});
				} else {
					$(".ld_list_d_w_open").css("height","0").removeClass("ld_list_d_w_open");
					$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
					$(".ld_list_in_this").removeClass("ld_list_in_this");
					$(".ld_list_ct_this").removeClass("ld_list_ct_this");
					listDetailWrap.animate({"height" : ""+$(".ld_list_d:eq("+index+")").height()+"px"}, {duration:300, queue:true, complete:function() {
						listDetailWrap.addClass("ld_list_d_w_open");
						listDetailWrap.css("height","auto");
					}});
					$(this).addClass("ld_list_in_this");
				}
				return false;
			})	
		});
		lectureControlTitle.each(function(index) {
			$(this).bind("click", function() {
				var lectureFunctionWrap = $(".ld_list_fnc:eq("+index+")");

				if (lectureFunctionWrap.attr("class")=="ld_list_fnc ld_list_fnc_open") {
					lectureFunctionWrap.animate({"height" : "0px"}, {duration:300, queue:true, complete:function() {
						lectureFunctionWrap.removeClass("ld_list_fnc_open");
						lectureFunctionWrap.prev().removeClass("ld_list_ct_this");
					}});
				} else {
					$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
					$(".ld_list_ct_this").removeClass("ld_list_ct_this");
					lectureFunctionWrap.animate({"height" : "100px"}, {duration:300, queue:true, complete:function() {
						lectureFunctionWrap.addClass("ld_list_fnc_open");;
					}});
					lectureFunctionWrap.prev().addClass("ld_list_ct_this");
				}
				return false;
			});
		});
		// 담기 선택일 때
		$(".b_ldf_b").each(function(index) {
			var lectureDownProgress = '<span id="ldProgress"><i style="width:45%;"></i></span>';

			$(this).bind("click", function() {
				if ($(this).attr("class")=="b_ld_fnc b_ldf_b")
				{
					$(".ld_list_fnc_open").addClass("ld_list_fnc_ing").parent().append(lectureDownProgress);
					$(this).addClass("b_ldf_bc").removeClass("b_ldf_b").attr("id","btnDownCancel").html('<i class="icn"></i>담기취소');
				} else {
					$("#ldProgress").remove();
					$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
					$(this).addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>담기');
				}
				return false;
			});
		});
	},
	// 다운완료일 때 실행
	lectureDownComplete : function() {
		$("#ldProgress").remove();
		$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
		$(".b_ldf_bc").addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>다시담기');
	}
});