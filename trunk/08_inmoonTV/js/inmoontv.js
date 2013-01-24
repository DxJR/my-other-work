$(window).ready(function() {
	imTv.init();
});

var imTv = ({
	init : function() {
		this.swipeInit("visualSwipe", ".visual_by", "500");
		this.swipeInit("swipeLecture", ".lecture_list", ".lecture_swipe_w", "500");
		this.lectureDetailView();
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
	// 강의 상세보기
	lectureDetailView : function() {
		var tabMenu = $(".ld_tab");
		var tabBorder = $(".bdb");
		var tabContentInfo = $("#ldInfo");
		var tabContentList = $("#ldList");
		var tabContentToggle = function() {
			if (tabMenu.find("li").filter(".this").index()==0) {
				tabContentInfo.css("display","block");
				tabContentList.css("display","none");
			} else if (tabMenu.find("li").filter(".this").index()==1) {
				tabContentInfo.css("display","none");
				tabContentList.css("display","block");
			}
		}

		tabContentToggle();

		tabMenu.find("a").each(function(index) {
			$(this).bind("click", function() {
				if ($(this).parent().attr("class") !== "this") {
					tabMenu.find("li").removeClass("this");
					$(this).parent().addClass("this");
					if (index==0) {
						tabBorder.animate({"left" : "0"}, {duration:300, queue:true});
					} else if (index==1) {
						tabBorder.animate({"left" : "50%"}, {duration:300, queue:true});
					}
				}
				tabContentToggle();
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
					}});
				} else {
					$(".ld_list_d_w").each(function() {
						$(this).css("height","0").removeClass("ld_list_d_w_open");
					});
					$(".ld_list_fnc").each(function() {
						$(this).css("height","0").removeClass("ld_list_fnc_open");
					});
					lectureTitle.each(function() {
						$(this).removeClass("ld_list_in_this");
					});
					listDetailWrap.animate({"height" : ""+$(".ld_list_d:eq("+index+")").height()+"px"}, {duration:300, queue:true, complete:function() {
						listDetailWrap.addClass("ld_list_d_w_open");
						listDetailWrap.css("height","auto");
					}});
					$(this).addClass("ld_list_in_this");
				}
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
					$(".ld_list_fnc").each(function() {
						$(this).css("height","0").removeClass("ld_list_fnc_open");
					});
					$(".ld_list_ct").each(function() {
						$(this).removeClass("ld_list_ct_this");
					});
					lectureFunctionWrap.animate({"height" : "100px"}, {duration:300, queue:true, complete:function() {
						lectureFunctionWrap.addClass("ld_list_fnc_open");;
					}});
					lectureFunctionWrap.prev().addClass("ld_list_ct_this");
				}
			});
		});
	}
});