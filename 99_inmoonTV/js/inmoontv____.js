$charset="utf-8"

$(window).ready(function() {
	imTv.init();
	$("#visualSwipe").css("overflow","visible");
});

var imTv = ({
	init : function() {
		this.swipeSlide("visualSwipe","visualSwipeIndicator",".visual_scroll", ".visual_by");
		this.swipeSlide("swipeLecture","swipeLectureIndicator",".lecture_scroll", ".lecture_list");
		this.tabSelector(".ld_tab_w","ld_c_w"); //강의상세보기
		this.tabSelector(".ml_tab_w","ml_c_w"); //내강의
		this.tabSelector(".ipf_tab_w","ipf_c_w"); //아이디/비밀번호찾기		
		this.tabSelector(".hpd_tab_w","hpd_c_w"); //고객센터
		this.lectureListDetailView();		
		if ($("#lyr_c_policy").length>0)
		{
			var policy1Scroll = new iScroll('lyrPolicy1ScrollWrap');
			var policy2Scroll = new iScroll('lyrPolicy2ScrollWrap');
			var policy3Scroll = new iScroll('lyrPolicy3ScrollWrap');
		}		
		this.lectureModeDelete();
		this.mainLogin();
		this.helpdeskList();		
		this.bindDialogs();
	},
	scriptScroll : function() {
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
				var scriptScroll = new iScroll('scriptScrollWrap');
			}
		}
	},
	// 첫화면 캐러셀
	swipeSlide : function(wrapperID,indicatorID,scrollingElement, swipeInnerElement) {
		var wrapperElement = $("#"+wrapperID);
		if (wrapperElement.length=="1")
		{
			var swipeInnerElement = $(swipeInnerElement);
			var scrollerWidth = (swipeInnerElement.width() + parseInt(swipeInnerElement.css("marginLeft")) + parseInt(swipeInnerElement.css("marginRight")) + parseInt(swipeInnerElement.css("paddingLeft")) + parseInt(swipeInnerElement.css("paddingRight"))) * swipeInnerElement.length;
			$(scrollingElement).css("width",""+scrollerWidth+"px");
			if (swipeInnerElement.attr("class") != "visual_by")
			{
				swipeInnerElement.css("width",""+wrapperElement.width()+"px");
			}		

			var swipeCarousel = new iScroll(""+wrapperID+"", {
				snap: true,
				momentum: false,
				hScrollbar: false,
				vScrollbar: false,
				onScrollEnd: function () {
					swipeCarousel.indicatorID = indicatorID;
					document.querySelector('#'+swipeCarousel.indicatorID+' > a.this').className = '';
					document.querySelector('#'+swipeCarousel.indicatorID+' > a:nth-child(' + (this.currPageX+1) + ')').className = 'this';
					swipeCarousel.refresh();
				},
			 });
		}
	},
	// 탭선택
	tabSelector : function(tabWrapper, tabContentClass) {
		var tabWrapper = $(tabWrapper);
		if (tabWrapper.length=="1")
		{
			tabWrapper.css("position","relative");
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
		}
	},
	// 개별강의 상세
	lectureListDetailView : function() {
		var lectureListWrap = $("#ldList");
		var lectureTitle = lectureListWrap.find("h5");
		var lectureControlTitle =$(".ld_list_ct");
		var lectureDimd = '<div class="lectureDimd"></div>';

		// 다운로드강의 일 때
		if (lectureListWrap.attr("id")!=="ldList")
		{
			var lectureTitle = $("#mlDownloadList > li > a");			
		}

		lectureTitle.each(function(index) {
			$(this).bind("click", function() {
				var listDetailWrap = $(".ld_list_d_w:eq("+index+")");

				if (lectureListWrap.attr("id")!=="ldList" && $("#mlDownload").attr("class")=="ml_c_w mld_mode_delete") 
				{

				} else {		
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
				}
			})
		});
		lectureControlTitle.each(function(index) {
			$(this).bind("click", function() {
				if (lectureListWrap.attr("id")!=="ldList" && $("#mlDownload").attr("class")=="ml_c_w mld_mode_delete")
				{

				} else {
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
				}
			});
		});
		// 담기 선택일 때
		$(".b_ldf_b").each(function(index) {
			var lectureDownProgress = '<span id="ldProgress"><i style="width:45%;"></i></span>';

			$(this).bind("click", function() {
				if ($(this).attr("class")=="b_ld_fnc b_ldf_b")
				{
					$(".ld_list_fnc_open").find("li").each(function() {
						$(this).append(lectureDimd);
					});	
					$(".ld_list_fnc_open").addClass("ld_list_fnc_ing").parent().append(lectureDownProgress);
					$(this).addClass("b_ldf_bc").removeClass("b_ldf_b").attr("id","btnDownCancel").html('<i class="icn"></i>담기취소');
				} else {
					$(".lectureDimd").remove();
					$("#ldProgress").remove();
					$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
					$(this).addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>담기');
				}
				return false;
			});
		});
		// 듣기 선택일 때		
		var scriptWrapper = $("#scriptWrapper");
		$(".b_ldf_l").each(function(index) {
			$(this).bind("click", function() {
				if ($(this).attr("class")=="b_ld_fnc b_ldf_l")
				{
					$(".ld_list_fnc_open").find("li").each(function() {
						$(this).append(lectureDimd);
					});						
					$(this).addClass("b_ldf_ln").removeClass("b_ldf_l");

					scriptWrapper.animate({"bottom" : "0"}, {duration:300, queue:true, complete:function() {
						}
					});
				} else {
					$(".lectureDimd").remove();					
					$(this).addClass("b_ldf_l").removeClass("b_ldf_ln");
					scriptWrapper.animate({"bottom" : "-70px"}, {duration:300, queue:true});
				}
				return false;
			});
		});
		// 스크립트 컨트롤
		$(".b_s_close").click(function() {
			scriptWrapper.animate({"bottom" : "-70px"}, {duration:300, queue:true});
		});
		$(".b_v_script").click(function() {
			if ($(".bscw_open").length=="0")
			{
				scriptWrapper.addClass("bscw_open");						
			} else {
				scriptWrapper.removeClass("bscw_open");						
			}
			$(".b_scrt_s").click(function() {									
				scriptWrapper.addClass("scsize_c");
				if ($(".scsize_l").length=="1")
				{
					scriptWrapper.removeClass("scsize_l").addClass("scsize_m");
				} else if ($(".scsize_m").length=="1")
				{
					scriptWrapper.removeClass("scsize_m").addClass("scsize_s");
				} else {
					scriptWrapper.addClass("scsize_s");
				}
			});
			$(".b_scrt_l").click(function() {				
				scriptWrapper.addClass("scsize_c");				
				if ($(".scsize_s").length=="1")
				{
					scriptWrapper.removeClass("scsize_s").addClass("scsize_m");
				} else if ($(".scsize_m").length=="1")
				{
					scriptWrapper.removeClass("scsize_m").addClass("scsize_l");
				} else {
					scriptWrapper.addClass("scsize_l");
				}
			});
		});
	},
	// 다운완료일 때 실행
	lectureDownComplete : function() {
		$("#ldProgress").remove();
		$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
		$(".b_ldf_bc").addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>다시담기');
	},
	// 다운로드 강의 삭제모드일 때
	lectureModeDelete : function() {
		var _this = this;
		var modeWrap = $("#mlDownload");
		var modeHead = $(".ml_down_head");
		var deleteElement = $(".ld_list_d_l");

		// 삭제모드진입
		$(".b_mld_del").on("click", function() {			
			modeWrap.addClass("mld_mode_delete");

			var modeDeleteHeadAppend = '<div id="mlDownDeleteHead">';
				modeDeleteHeadAppend += '<strong>선택 <em>133</em>MB</strong>';
				modeDeleteHeadAppend += '<button type="button" class="gbtn btn_st1_gray b_mld_cancel"><span>취소</span></button>';
				modeDeleteHeadAppend += '<button type="button" class="gbtn btn_st1 b_mld_delete"><span>삭제 (<em>0</em>)</span></button>';
				modeDeleteHeadAppend += '</div>';			
			modeHead.append(modeDeleteHeadAppend);

			$(".ld_list_d_w").css("height","auto");
			$(".ld_list_ct_this").removeClass("ld_list_ct_this");
			$(".ld_list_d_w_open").removeClass("ld_list_d_w_open");
			$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_ct_this");

			// 각 요소에 input 과 label 부여
			deleteElement.each(function(index) {
				var deleteLabel = '<input type="checkbox" id="mlDownloadListCheck_'+index+'" class="check" /><label for="mlDownloadListCheck_'+index+'"><strong class="ld_list_ct">'+$(this).find(".ld_list_ct").html()+'</strong></label>';
				$(this).find(".ld_list_ct").remove();
				$(this).prepend(deleteLabel);
			});
			$(this).css("display","none");	

			$(".check").on("click", function() {
				$(".b_mld_delete").find("em").html(''+$("input.check:checked").length+'');
			});
			// 취소
			$(".b_mld_cancel").on("click", function() {	
				$("#mlDownDeleteHead").remove();
				$(".ld_list_d_w").css("height","0");
				modeWrap.removeClass("mld_mode_delete");
				deleteElement.find("label").each(function() {
					var inLabelHtml = $(this).html();
					$(this).prev().remove();
					$(this).parent().prepend(inLabelHtml);
					$(this).remove();
				});
				_this.lectureListDetailView();
			});
		});	
	},
	// 로그인
	mainLogin : function() {
		$(".lg_id_pwd_w").find("label").each(function() {
			$(this).bind("click", function() {
				$(this).next().focus();				
			});
		});
		$(".lg_id_pwd_w").find("input").each(function() {
			$(this).bind({
				"focus": function() {
					$(this).prev().css({"left":"-9999em", "top":"-9999em"});
				},
				"focusout" : function() {
					if ($(this).val()=="")
					{
						$(this).prev().css({"left":"19px", "top":"13px"});
					}
				}
			});
		});
	},
	// 고객센터
	helpdeskList : function() {
		var wrapperElement = $(".helpdesk_list");
		
		$(".hpdl_tit").on("click", function() {
			var contentObjHeight = ($(this).next().find(".hpdl_cont_w").height()) + 23;

			if ($(this).next().attr("class")=="hpdl_cw_anis hpdl_cw_anis_open")
			{
				$(this).next().animate({"height" : "0"}, {duration:300, queue:true, complete:function() {
					$(this).removeClass("hpdl_cw_anis_open");
					}
				});
			} else {
				$(".hpdl_cw_anis_open").css("height","0").removeClass("hpdl_cw_anis_open");;
				$(this).next().animate({"height" : ""+contentObjHeight+"px"}, {duration:300, queue:true, complete:function() {
					$(this).addClass("hpdl_cw_anis_open");
					}
				});
			}
			return false;
		});

		$(".hpdl_cw_anis").find("h4").bind("click", function() {
			$(this).parent().parent().animate({"height" : "0"}, {duration:300, queue:true, complete:function() {
					$(this).removeClass("hpdl_cw_anis_open");
				}
			});
		});
	},
	// Dialogs
	openDialogs : function(obj) {
		$(".layer_wrap").css("display","block");
		$(".dimd").animate({"opacity" : "0.6"}, {duration:300, queue:true, complete:function() {
				var dialogObj = $("#"+obj+"");
				var objHeight = dialogObj.height();
				var screenHeight = screen.height;
				var screenWidth = $(window).width();
				var objPosition = parseInt((screenHeight - objHeight)/2);
				dialogObj.css({"width":""+screenWidth+"px", "top":""+objPosition+"px", "opacity":"1"}).addClass("lyrOpenThis");
			}
		})
	},
	bindDialogs : function() {
		this.dialogAction("a");
		this.dialogAction("button");
		this.dialogAction("input");
	},
	dialogAction : function(element) {
		$(""+element+"").each(function() {
			$(this).click(function() {				
				if ($(this).attr("rel"))
				{
					var dialogRel = $(this).attr("rel");					
				}

				if (dialogRel=="dialog")
				{					
					var dialogID = $(this).attr("href").replace("#","");
					imTv.openDialogs(dialogID)
				} else if (dialogRel=="dialogClose")
				{
					imTv.dialogClose();
				}
				return false;
			});
		});
	},
	dialogClose : function() {
		$(".lyrOpenThis").css("opacity","0");
		$(".dimd").animate({"opacity" : "0"}, {duration:300, queue:true, complete:function() {
				$(".layer_wrap").css("display","none");
			}
		});
	}
});