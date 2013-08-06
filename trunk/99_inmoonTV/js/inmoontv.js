$(window).ready(function() {
	if( $("#hiddenDelayInit")!==undefined && 
		$("#hiddenDelayInit").val() == "true" )
	{
		//alert('delay init');
	}else
	{
		console.log('start init()=====');
		
		imTv.init();
		
		if( $(".ui-link").length>0 ) 			$(".ui-link").removeClass("ui-link");
		if( $(".ui-btn-hidden").length>0 )  	$(".ui-btn-hidden").removeClass("ui-btn-hidden");
		
		$(document).bind( "pagebeforeload", function( event, data ){
		
			console.log('pagebeforeload...start');
			console.log('url==>' + data.url);
			console.log('absUrl==>' + data.absUrl);
			console.log('dataUrl==>' + data.dataUrl);
			console.log('data.options.transition==>' + data.options.transition);
			
			if( typeof data.toPage === 'string' )
			{
				console.log('topage==>' + data.toPage);
			}
			
			//data.deferred.resolve( data.absUrl, data.options );
			data.deferred.resolve( data.absUrl, data.options, page );

			console.log('pagebeforeload...end*****');
		});
		if( $(".lyr_b_2ea").length>0 &&
			$(".lyr_b_2ea").find("button:eq(0)").length>0 )
		{
			$(".lyr_b_2ea").find("button:eq(0)").addClass("lyr_b_first");
		}		
		
		console.log('end init()=======');
	}
});
var carousel;
var imTv = ({
	init : function() {
		SlideTabHeight = $(window).height() - 73;
		if ($("#visualSwipe").length=="1")
		{
			this.swipeSlide("visualSwipe","visualHtmlHide","visualSwipeIndicator", "visual_by", "div");
			$("#visualSwipe").css("overflow","visible");
		}
		if ($("#swipeLecture").length=="1")
		{
			this.swipeSlide("swipeLecture","swipeLectureHide","swipeLectureIndicator", "lecture_list", "ul");
		}
		if ($("#ldContentSwipe").length=="1")
		{
			this.swipeSlide("ldContentSwipe","ldContentHtml","ldContentHtmlIndicator", "ld_c_w", "div");
			$("#ldContentHtml").remove();
			$(".ld_c_w:eq(1)").attr("id","ldInfo");
			$(".ld_c_w:eq(2)").attr("id","ldList");
			var ldInitHeight = (Number($("#ldContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ld_c_w").height()) + Number(30));
			var ldInitHeight = (ldInitHeight < SlideTabHeight) ? SlideTabHeight  : ldInitHeight;
			$("#ldContentSwipe").css({"height" : ""+ ldInitHeight +"px"});
		}
		if ($("#mlContentSwipe").length=="1")	//내강의
		{
			this.swipeSlide("mlContentSwipe","mlContentHtml","mlContentHtmlIndicator", "ml_c_w", "div");
			$("#mlContentHtml").remove();
			$(".ml_c_w:eq(0)").attr("id","mlList");
			$(".ml_c_w:eq(1)").attr("id","mlIngList");
			$(".ml_c_w:eq(2)").attr("id","mlDownload");
			var mlInitHeight = (Number($("#mlContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ml_c_w").height()) + Number(30));
			var mlInitHeight = (mlInitHeight < SlideTabHeight) ? SlideTabHeight  : mlInitHeight;
			$("#mlContentSwipe").css({"height" : ""+ mlInitHeight +"px"});
		}
		if ($("#HpdContentSwipe").length=="1")
		{
			this.swipeSlide("HpdContentSwipe","HpdContentHtml","HpdContentHtmlIndicator", "hpd_c_w", "div");
			$("#HpdContentHtml").remove();
			$(".hpd_c_w:eq(0)").attr("id","hpdNotice");
			$(".hpd_c_w:eq(1)").attr("id","hpdFAQ");
			$(".hpd_c_w:eq(2)").attr("id","hpdPolicy");
			var hpdInitHeight = (Number($("#HpdContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".hpd_c_w").height()) + Number(30));
			var hpdInitHeight = (hpdInitHeight < SlideTabHeight) ? SlideTabHeight  : hpdInitHeight;
			$("#HpdContentSwipe").css({"height" : ""+ hpdInitHeight +"px"});
			//$("#HpdContentSwipe").css("height","100%");
		}
		if ($("#IpfContentSwipe").length=="1")
		{
			this.swipeSlide("IpfContentSwipe","IpfContentHtml","IpfContentHtmlIndicator", "ipf_c_w", "div");
			$("#IpfContentHtml").remove();
			$(".ipf_c_w:eq(1)").attr("id","ipfID");
			$(".ipf_c_w:eq(2)").attr("id","ipfPassword");
			var ipfdInitHeight = (Number($("#IpfContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ipf_c_w").height()) + Number(30));
			var ipfdInitHeight = (ipfdInitHeight < SlideTabHeight) ? SlideTabHeight  : ipfdInitHeight;
			$("#IpfContentSwipe").css({"height" : ""+ ipfdInitHeight +"px"});
		}
		this.lectureListDetailView();
		this.mainLogin();
		this.helpdeskList();
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
	// Transition slide NEW
	swipeTransition : function() {
		$("a, button, input").each(function() {
			if ($(this).attr("rel")) {
				$(this).click(function() {
					if ($(this).attr("rel"))
					{
						var dialogRel = $(this).attr("rel");
					}

					if (dialogRel=="nSlide")
					{
						var thisHref = $(this).attr("href");
						$("#content").css({position:'absolute', top:'0'}).animate({left:'-'+$("#content").width()+'px'},{duration:300, queue:true, complete:function() {
							$(location).attr("href",thisHref);
						}});
					}
					return false;
				});
			}
		});
	},
	// 첫화면 캐러셀
	swipeSlide : function(wrapper, elementWrap, indicator, pageHtml, createHtml) {
		//var carousel, el, i, page,slides = [];
		var el, i, page,slides = [];
		$("#"+elementWrap+"").find("."+pageHtml+"").each(function(index) {
			$(this).attr("rel",""+index+"");
			slides.push($(this).html());
		});
		if (wrapper=="ldContentSwipe" || wrapper=="ldContentSwipe" || wrapper=="IpfContentSwipe") {
			carousel = new SwipeView('#'+wrapper+'', {
				numberOfPages: slides.length,
				hastyPageFlip: true,
				loop:false
			});
		} else {
			carousel = new SwipeView('#'+wrapper+'', {
				numberOfPages: slides.length,
				hastyPageFlip: true
			});
		}
		for (i=0; i<3; i++) {
			page = i==0 ? slides.length-1 : i-1;
			el = document.createElement(''+createHtml+'');
			el.setAttribute('class',pageHtml);
			el.innerHTML = slides[page];
			carousel.masterPages[i].appendChild(el);
		}
		$("#"+wrapper+"").css("height",""+(Number($("#"+wrapper+"-swipeview-slider>div").filter(".swipeview-active").find("."+pageHtml+"").height()) + Number(30))+"px");
		carousel.onFlip(function () {
			var el , upcoming, i;
			for (i=0; i<3; i++) {
				upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;
				if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
					el = carousel.masterPages[i].querySelector(''+createHtml+'');
					el.innerHTML = slides[upcoming];
				}
			}
			$("#"+wrapper+"-swipeview-slider>div").each(function(index) {
				if ($(this).attr("class")=="swipeview-active")
				{
					nowIndex = $(this).attr("data-page-index");
					$("#"+indicator+" a").removeClass("this");
					$("#"+indicator+" a:eq("+nowIndex+")").addClass("this");
					$("#"+wrapper+"").css("height",""+(Number($(this).find("."+pageHtml+"").height()) + Number(30))+"px");
				}
			});
			if (wrapper=='ldContentSwipe')
			{
				var nowSwipePagingIndex =  $("#ldContentHtmlIndicator").find("a").filter(".this").index();
				$(".ld_tab_w .ld_tab li").removeClass("this");
				if (nowSwipePagingIndex=="0")
				{
					$(".ld_tab_w .ld_tab li:eq(0)").addClass("this");
					$(".bdb").animate({"left" : "0%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="1")
				{
					$(".ld_tab_w .ld_tab li:eq(1)").addClass("this");
					$(".bdb").animate({"left" : "50%"}, {duration:300, queue:true});
				}
			}
			if (wrapper=='mlContentSwipe')
			{
				var nowSwipePagingIndex =  $("#mlContentHtmlIndicator").find("a").filter(".this").index();
				$(".ml_tab_w .ld_tab li").removeClass("this");
				if (nowSwipePagingIndex=="0")
				{
					$(".ml_tab_w .ld_tab li:eq(0)").addClass("this");
					$(".bdb").animate({"left" : "0%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="1")
				{
					$(".ml_tab_w .ld_tab li:eq(1)").addClass("this");
					$(".bdb").animate({"left" : "33.3%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="2")
				{
					$(".ml_tab_w .ld_tab li:eq(2)").addClass("this");
					$(".bdb").animate({"left" : "66.6%"}, {duration:300, queue:true});
				}
			}
			if (wrapper=='HpdContentSwipe')
			{
				var nowSwipePagingIndex =  $("#HpdContentHtmlIndicator").find("a").filter(".this").index();
				$(".hpd_tab_w .ld_tab li").removeClass("this");
				if (nowSwipePagingIndex=="0")
				{
					$(".hpd_tab_w .ld_tab li:eq(0)").addClass("this");
					$(".bdb").animate({"left" : "0%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="1")
				{
					$(".hpd_tab_w .ld_tab li:eq(1)").addClass("this");
					$(".bdb").animate({"left" : "33.3%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="2")
				{
					$(".hpd_tab_w .ld_tab li:eq(2)").addClass("this");
					$(".bdb").animate({"left" : "66.6%"}, {duration:300, queue:true});
				}
			}
			if (wrapper=='IpfContentSwipe')
			{
				var nowSwipePagingIndex =  $("#IpfContentHtmlIndicator").find("a").filter(".this").index();
				$(".ipf_tab_w .ld_tab li").removeClass("this");
				if (nowSwipePagingIndex=="0")
				{
					$(".ipf_tab_w .ld_tab li:eq(0)").addClass("this");
					$(".bdb").animate({"left" : "0%"}, {duration:300, queue:true});
				} else if (nowSwipePagingIndex=="1")
				{
					$(".ipf_tab_w .ld_tab li:eq(1)").addClass("this");
					$(".bdb").animate({"left" : "50%"}, {duration:300, queue:true});
				}
			}
		});
		$(".ld_tab").find("a").each(function(index) {
			$(this).bind("click", function() {
				carousel.goToPage(index);
			});
		});
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

		var hdInitHeight = $(".lecture_list").height();
		var hdInitHeight = (hdInitHeight < SlideTabHeight) ? SlideTabHeight  : hdInitHeight;
		if ($("#swipeLecture").length==0)
		{
			$(".lecture_list").css("height",""+hdInitHeight+"px");
		}

		// 다운로드강의 일 때
		if (lectureListWrap.attr("id")!=="ldList")
		{
			var lectureTitle = $("#mlDownloadList > li > a");
		}

		lectureTitle.each(function(index) {
			$(this).bind("click", function() {
				var listDetailWrap = $(this).next();
				if (lectureListWrap.attr("id")!=="ldList" && $("#mlDownload").attr("class")=="ml_c_w mld_mode_delete")
				{
				} else {
					if (listDetailWrap.attr("class")=="ld_list_d_w ld_list_d_w_open") {
						listDetailWrap.animate({"height" : "0px"}, {duration:300, queue:true, complete:function() {
							listDetailWrap.removeClass("ld_list_d_w_open");
							lectureTitle.removeClass("ld_list_in_this");
							$(".ld_list_ct_this").removeClass("ld_list_ct_this");
							if (lectureListWrap.attr("id")!=="ldList")
							{
								var slideBeforeHeight = $("#mlDownload").height();
								var slideBeforeHeight = (slideBeforeHeight < SlideTabHeight) ? SlideTabHeight  : slideBeforeHeight;
								$("#mlContentSwipe").css("height",""+ slideBeforeHeight +"px");								
							}else
								var slideBeforeHeight = $("#ldList").height();
								var slideBeforeHeight = (slideBeforeHeight < SlideTabHeight) ? SlideTabHeight  : slideBeforeHeight;
								$("#ldContentSwipe").css("height",""+ slideBeforeHeight +"px");
						}});
					} else {
						$(".ld_list_d_w_open").css("height","0").removeClass("ld_list_d_w_open");
						$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
						$(".ld_list_in_this").removeClass("ld_list_in_this");
						$(".ld_list_ct_this").removeClass("ld_list_ct_this");
						if (lectureListWrap.attr("id")!=="ldList")
							$("#mlContentSwipe").css("height",""+$(this).height() + $(this).next().find(".ld_list_d").height()+"px");
						else
							$("#ldContentSwipe").css("height",""+$(this).height() + $(this).next().find(".ld_list_d").height()+"px");
						
						listDetailWrap.animate({"height" : ""+$(".ld_list_d:eq("+index+")").height()+"px"}, {duration:300, queue:true, complete:function() {
							listDetailWrap.addClass("ld_list_d_w_open");
							listDetailWrap.css("height","auto");

							if (lectureListWrap.attr("id")!=="ldList")
								$("#mlContentSwipe").css("height",""+$("#mlDownload").height()+"px");
							else
								$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
						}});
						$(this).addClass("ld_list_in_this");
					}
					return false;
				}
			});
		});
		lectureControlTitle.each(function(index) {
			$(this).bind("click", function() {
				if (lectureListWrap.attr("id")!=="ldList" && $("#mlDownload").attr("class")=="ml_c_w mld_mode_delete")
				{

				} else {
					var lectureFunctionWrap = $(this).next();

					if (lectureFunctionWrap.attr("class")=="ld_list_fnc ld_list_fnc_open") {
						lectureFunctionWrap.animate({"height" : "0px"}, {duration:300, queue:true, complete:function() {
							lectureFunctionWrap.removeClass("ld_list_fnc_open");
							lectureFunctionWrap.prev().removeClass("ld_list_ct_this");
							if (lectureListWrap.attr("id")!=="ldList")
							{
								$("#mlContentSwipe").css("height",""+$("#mlDownload").height()+"px");
							}else
								$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
						}});
					} else {
						$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
						$(".ld_list_ct_this").removeClass("ld_list_ct_this");
						if (lectureListWrap.attr("id")!=="ldList")
						{
							$("#mlContentSwipe").css("height",""+$("#mlContentSwipe").height() + 50 +"px");
						}else
							$("#ldContentSwipe").css("height",""+$("#ldContentSwipe").height() + 50 +"px");
						lectureFunctionWrap.animate({"height" : "100px"}, {duration:300, queue:true, complete:function() {
							lectureFunctionWrap.addClass("ld_list_fnc_open");;
							if (lectureListWrap.attr("id")!=="ldList")
							{
								$("#mlContentSwipe").css("height",""+$("#mlDownload").height()+"px");
							}else
								$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
						}});
						lectureFunctionWrap.prev().addClass("ld_list_ct_this");
					}
					return false;
				}
			});
		});
		// 담기 선택일 때 B110.jsp에서 처리
//		$(".b_ldf_b").each(function(index) {
//			var lectureDownProgress = '<span id="ldProgress"><i style="width:45%;"></i></span>';
//
//			$(this).bind("click", function() {
//				if ($(this).attr("class")=="b_ld_fnc b_ldf_b")
//				{
//					$(".ld_list_fnc_open").find("li").each(function() {
//						$(this).append(lectureDimd);
//					});
//					$(".ld_list_fnc_open").addClass("ld_list_fnc_ing").parent().append(lectureDownProgress);
//					$(this).addClass("b_ldf_bc").removeClass("b_ldf_b").attr("id","btnDownCancel").html('<i class="icn"></i>담기취소');
//				} else {
//					$(".lectureDimd").remove();
//					$("#ldProgress").remove();
//					$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
//					$(this).addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>담기');
//				}
//				return false;
//			});
//		});
		// 듣기 선택일 때
		var scriptWrapper = $("#scriptWrapper");
//		$(".b_ldf_l").each(function(index) {
//			$(this).bind("click", function() {
//				if ($(this).attr("class")=="b_ld_fnc b_ldf_l")
//				{
//					$(".ld_list_fnc_open").find("li").each(function() {
//						$(this).append(lectureDimd);
//					});
//					$(this).addClass("b_ldf_ln").removeClass("b_ldf_l");
//					scriptWrapper.animate({"bottom" : "0"}, {duration:300, queue:true, complete:function() {
//						}
//					});
//				} else {
//					$(".lectureDimd").remove();
//					$(this).addClass("b_ldf_l").removeClass("b_ldf_ln");
//					scriptWrapper.animate({"bottom" : "-70px"}, {duration:300, queue:true});
//				}
//				return false;
//			});
//		});
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
//	lectureDownComplete : function() {
//		$("#ldProgress").remove();
//		$(".ld_list_fnc_ing").removeClass("ld_list_fnc_ing");
//		$(".b_ldf_bc").addClass("b_ldf_b").removeClass("b_ldf_bc").removeAttr("id").html('<i class="icn"></i>다시담기');
//	},
	// 다운로드 강의 삭제모드일 때
//	lectureModeDelete : function() {
//		var _this = this;
//		var modeWrap = $("#mlDownload");
//		var modeHead = $(".ml_down_head");
//		var deleteElement = $(".ld_list_d_l");
//
//		// 삭제모드진입
//		$(".b_mld_del").on("click", function() {
//			modeWrap.addClass("mld_mode_delete");
//
//			var modeDeleteHeadAppend = '<div id="mlDownDeleteHead">';
//				modeDeleteHeadAppend += '<strong>선택 <em>133</em>MB</strong>';
//				modeDeleteHeadAppend += '<button type="button" class="gbtn btn_st1_gray b_mld_cancel"><span>취소</span></button>';
//				modeDeleteHeadAppend += '<button type="button" class="gbtn btn_st1 b_mld_delete"><span>삭제 (<em>0</em>)</span></button>';
//				modeDeleteHeadAppend += '</div>';
//			modeHead.append(modeDeleteHeadAppend);
//
//			$(".ld_list_d_w").css("height","auto");
//			$(".ld_list_ct_this").removeClass("ld_list_ct_this");
//			$(".ld_list_d_w_open").removeClass("ld_list_d_w_open");
//			$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_ct_this");
//
//			// 각 요소에 input 과 label 부여
//			deleteElement.each(function(index) {
//				var deleteLabel = '<input type="checkbox" id="mlDownloadListCheck_'+index+'" class="check" /><label for="mlDownloadListCheck_'+index+'"><strong class="ld_list_ct">'+$(this).find(".ld_list_ct").html()+'</strong></label>';
//				$(this).find(".ld_list_ct").remove();
//				$(this).prepend(deleteLabel);
//			});
//			$(this).css("display","none");
//
//			$(".check").on("click", function() {
//				$(".b_mld_delete").find("em").html(''+$("input.check:checked").length+'');
//			});
//			// 취소
//			$(".b_mld_cancel").on("click", function() {
//				$("#mlDownDeleteHead").remove();
//				$(".ld_list_d_w").css("height","0");
//				modeWrap.removeClass("mld_mode_delete");
//				deleteElement.find("label").each(function() {
//					var inLabelHtml = $(this).html();
//					$(this).prev().remove();
//					$(this).parent().prepend(inLabelHtml);
//					$(this).remove();
//				});
//				$(".b_mld_del").css("display","block");
//				_this.lectureListDetailView();
//			});
//		});
//	},
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
						$(this).prev().css({"left":"13px", "top":"19px"});
					}
				}
			});
		});
	},
	// 고객센터
	helpdeskList : function() {
		var wrapperElement = $(".helpdesk_list");

		var hdInitHeight = wrapperElement.height();
		var hdInitHeight = (hdInitHeight < SlideTabHeight) ? SlideTabHeight  : hdInitHeight;
		wrapperElement.css("height",""+hdInitHeight+"px");
		$(".regs_lw_wob").css("height",""+hdInitHeight+"px");

		$(".hpdl_tit").on("click", function() {
			$(".hpdl_tit_on").removeClass("hpdl_tit_on");
			$(this).removeClass("hpdl_tit_on");
			
			var contentObjHeight = ($(this).next().find(".hpdl_cont_w").height()) + 23;
			var parentHeight = $(this).parent().parent().parent().parent().parent().parent().height();
			var parentChangeHeight = parentHeight;
			
			if ($(this).next().attr("class")=="hpdl_cw_anis hpdl_cw_anis_open")
			{
				//열려있을때
				$(this).next().animate({"height" : "0"}, {duration:300, queue:true, complete:function() {
					$(this).removeClass("hpdl_cw_anis_open");
					}
				}); //현재자신거 닫는다
				
				//부모 height 줄이기
				//alert( '-' + contentObjHeight );
				parentChangeHeight -= contentObjHeight;
				//$(this).parent().parent().parent().parent().css("height", "100%");
			} else {
				//닫혀있을때
				//현재열린것의 높이 구하기
				var openContentsObjHeight = $(this).parent().parent().find(".hpdl_cw_anis_open").height();
				if( openContentsObjHeight!=null )
					parentChangeHeight -= openContentsObjHeight;
				
				$(this).addClass("hpdl_tit_on");
				$(".hpdl_cw_anis_open").css("height","0").removeClass("hpdl_cw_anis_open");;	//열려있는 것들 모두 닫기
				$(this).next().animate({"height" : ""+contentObjHeight+"px"}, {duration:300, queue:true, complete:function() {
					$(this).addClass("hpdl_cw_anis_open");
					}
				}); //현재자신거 연다
				
				//부모 height 늘이기
				parentChangeHeight += contentObjHeight;
				//alert( '-' + openContentsObjHeight + '+' + contentObjHeight );
			}
			//alert( parentHeight + ',' + parentChangeHeight);
			$(this).parent().parent().parent().parent().parent().parent().css("height", parentChangeHeight);
			
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
	
		var scrollWrap = $("#"+obj+"").find("#lyrPolicy1ScrollWrap");
		if( scrollWrap!==undefined &&
			scrollWrap.children().length == 1 )
		{
			new iScroll('lyrPolicy1ScrollWrap');
		//	this.dialogAction();
		}
		this.dialogAction();
		$(".layer_wrap").css({"position":"fixed", "top":"0", "left":"0"});
		$(".dimd").animate({"opacity" : "0.6"}, {duration:300, queue:true, complete:function() {
				//console.log(obj);
				var dialogObj = $("#"+obj+"");
				var objHeight = dialogObj.height();
				var docHeight = $(window).height();	//$(document).height();	//screen.height;
				var objPosition = parseInt((docHeight - objHeight)/2);
				//console.log(dialogObj.attr("class"));
				dialogObj.css({"top":""+objPosition+"px", left:"50%", "opacity":"1", "zIndex":"998"}).addClass("lyrOpenThis");				
			}
		});
		
		imTvBiz.setAndroidDimmed(true);
	},
	dialogAction : function() {
		$("a, button, input").each(function() {
			if ($(this).attr("rel")) {
				$(this).click(function() {
					if ($(this).attr("rel"))
					{
						var dialogRel = $(this).attr("rel");
					}

					if (dialogRel=="dialog")
					{
						var dialogID = $(this).attr("href").replace("#","");
						imTv.openDialogs(dialogID);
					} else if (dialogRel=="dialogClose")
					{
						imTv.dialogClose();
					}
					return false;
				});
			}
		});
	},
	dialogClose : function() {
		$(".lyrOpenThis").css({"opacity":"0","zIndex":"-1"});
		$(".dimd").animate({"opacity" : "0"}, {duration:300, queue:true, complete:function() {
				$(".layer_wrap").css({'position':'absolute', 'top':'-9999999em', 'left':'-9999999em'});
			}
		});
		
		imTvBiz.setAndroidDimmed(false);
	}
});