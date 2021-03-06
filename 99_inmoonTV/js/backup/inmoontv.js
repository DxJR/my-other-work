$(window).ready(function() {
	imTv.init();
	$(".ui-link").removeClass("ui-link");
	$(".ui-btn-hidden").removeClass("ui-btn-hidden");
	$(document).bind( "pagebeforeload", function( event, data ){
		data.deferred.resolve( data.absUrl, data.options, page );
	});
	$(".lyr_b_2ea").find("button:eq(0)").addClass("lyr_b_first");
});

var imTv = ({
	init : function() {
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
			$("#ldContentSwipe").css("height",""+ (Number($("#ldContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ld_c_w").height()) + Number(30)) +"px");
		}
		if ($("#mlContentSwipe").length=="1")
		{
			this.swipeSlide("mlContentSwipe","mlContentHtml","mlContentHtmlIndicator", "ml_c_w", "div");
			$("#mlContentHtml").remove();
			$(".ml_c_w:eq(0)").attr("id","mlList");
			$(".ml_c_w:eq(1)").attr("id","mlIngList");
			$(".ml_c_w:eq(2)").attr("id","mlDownload");
			$("#mlContentSwipe").css("height",""+ (Number($("#mlContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ml_c_w").height()) + Number(30)) +"px");
		}
		if ($("#HpdContentSwipe").length=="1")
		{
			this.swipeSlide("HpdContentSwipe","HpdContentHtml","HpdContentHtmlIndicator", "hpd_c_w", "div");
			$("#HpdContentHtml").remove();
			$(".hpd_c_w:eq(0)").attr("id","hpdNotice");
			$(".hpd_c_w:eq(1)").attr("id","hpdFAQ");
			$(".hpd_c_w:eq(2)").attr("id","hpdPolicy");
			$("#HpdContentSwipe").css("height",""+ (Number($("#HpdContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".hpd_c_w").height()) + Number(30)) +"px");
		}
		if ($("#IpfContentSwipe").length=="1")
		{
			this.swipeSlide("IpfContentSwipe","IpfContentHtml","IpfContentHtmlIndicator", "ipf_c_w", "div");
			$("#IpfContentHtml").remove();
			$(".ipf_c_w:eq(1)").attr("id","ipfID");
			$(".ipf_c_w:eq(2)").attr("id","ipfPassword");
			$("#IpfContentSwipe").css("height",""+ (Number($("#IpfContentSwipe-swipeview-slider>div").filter(".swipeview-active").find(".ipf_c_w").height()) + Number(30)) +"px");
		}
		//this.tabSelector(".ld_tab_w","ld_c_w"); //강의상세보기
		//this.tabSelector(".ml_tab_w","ml_c_w"); //내강의
		//this.tabSelector(".ipf_tab_w","ipf_c_w"); //아이디/비밀번호찾기
		//this.tabSelector(".hpd_tab_w","hpd_c_w"); //고객센터
		this.lectureListDetailView();
		if ($(".lyr_c_policy").length>0)
		{
			var policy1Scroll = new iScroll('lyrPolicy1ScrollWrap');
			var policy2Scroll = new iScroll('lyrPolicy2ScrollWrap');
			var policy3Scroll = new iScroll('lyrPolicy3ScrollWrap');
		}
		this.lectureModeDelete();
		this.mainLogin();
		this.helpdeskList();
		this.dialogAction();

		this.swipeTransition();
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
						var thisHref = $(this).attr("href")
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
		var carousel, el, i, page,slides = [];
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
							$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
						}});
					} else {
						$(".ld_list_d_w_open").css("height","0").removeClass("ld_list_d_w_open");
						$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
						$(".ld_list_in_this").removeClass("ld_list_in_this");
						$(".ld_list_ct_this").removeClass("ld_list_ct_this");
						$("#ldContentSwipe").css("height",""+$(this).height() + $(this).next().find(".ld_list_d").height()+"px");
						listDetailWrap.animate({"height" : ""+$(".ld_list_d:eq("+index+")").height()+"px"}, {duration:300, queue:true, complete:function() {
							listDetailWrap.addClass("ld_list_d_w_open");
							listDetailWrap.css("height","auto");
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
							$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
						}});
					} else {
						$(".ld_list_fnc_open").css("height","0").removeClass("ld_list_fnc_open");
						$(".ld_list_ct_this").removeClass("ld_list_ct_this");
						$("#ldContentSwipe").css("height",""+$("#ldContentSwipe").height() + 100 +"px");
						lectureFunctionWrap.animate({"height" : "100px"}, {duration:300, queue:true, complete:function() {
							lectureFunctionWrap.addClass("ld_list_fnc_open");;
							$("#ldContentSwipe").css("height",""+$("#ldList").height()+"px");
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
				$(".b_mld_del").css("display","block");
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
						$(this).prev().css({"left":"13px", "top":"19px"});
					}
				}
			});
		});
	},
	// 고객센터
	helpdeskList : function() {
		var wrapperElement = $(".helpdesk_list");

		$(".hpdl_tit").on("click", function() {
			$(".hpdl_tit_on").removeClass("hpdl_tit_on");
			$(this).removeClass("hpdl_tit_on");
			var contentObjHeight = ($(this).next().find(".hpdl_cont_w").height()) + 23;

			if ($(this).next().attr("class")=="hpdl_cw_anis hpdl_cw_anis_open")
			{
				$(this).next().animate({"height" : "0"}, {duration:300, queue:true, complete:function() {
					$(this).removeClass("hpdl_cw_anis_open");
					}
				});
			} else {
				$(this).addClass("hpdl_tit_on");
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
		$(".layer_wrap").css({"position":"fixed", "top":"0", "left":"0"});
		$(".dimd").animate({"opacity" : "0.6"}, {duration:300, queue:true, complete:function() {
				console.log(obj);
				var dialogObj = $("#"+obj+"");
				var objHeight = dialogObj.height();
				var docHeight = $(window).height();	//$(document).height();	//screen.height;
				var objPosition = parseInt((docHeight - objHeight)/2);
				console.log(dialogObj.attr("class"));
				dialogObj.css({"top":""+objPosition+"px", left:"50%", "opacity":"1", "zIndex":"998"}).addClass("lyrOpenThis");
			}
		});
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
						console.log(dialogID);
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
	},
	/** 은진추가 **/
	getContentsUrl :function(isMovie, lecture_code, class_seq, section_seq) {
		var target_url = 'http://vod-inmoontv.vod.cdn.cloudn.co.kr/';

		//강의별 folder 구하기
		target_url += lecture_code.substr(0,4) + '/';
		target_url += lecture_code + '/' + lecture_code + '_';
		//class_seq -> 01 formatting
		var temp = '00'.concat(class_seq);
		temp = temp.substr(temp.length-2);
		target_url += temp;

		//section_seq -> 01 formatting
		temp = '00'.concat(section_seq);
		temp = temp.substr(temp.length-2);
		target_url += temp;

		//파일 확장자 처리
		target_url += (isMovie) ? '.im4' : '.imi';

		return target_url;
	},
	/**
	 * File download
	 * @param member_code
	 * @param lecture_code
	 * @param class_seq
	 * @param section_seq
	 */
	goDownload : function(member_code, lecture_code, class_seq, section_seq) {
		var urlMovie = null;
		var urlScript = null;

		urlMovie = this.getContentsUrl(true, lecture_code, class_seq, section_seq);
		urlScript = this.getContentsUrl(false, lecture_code, class_seq, section_seq);

		// android에 Play 명령(download로그는 아래에서 남기기~)
		window.Android.startDownload(urlMovie, urlScript);
	},
	/**
	 * Player 구동
	 *
	 * play_type : 플레이어 구분
	 *             "Video" = 보기, "Audio" = 듣기, "Text" = 보기, "Trailer" = 1교시무료 또는 예고편(자막null처리)
	 * filename  : 컨텐츠파일이름
	 */
	goPlay : function(play_type, member_code, lecture_code, class_seq, section_seq) {
		var urlMovie = null;
		var urlScript = null;

		urlMovie = this.getContentsUrl(true, lecture_code, class_seq, section_seq);
		urlScript = this.getContentsUrl(false, lecture_code, class_seq, section_seq);

		// android에 Play 명령(play로그는 아래에서 남기기~)
		window.Android.startPlayer(play_type, urlMovie, urlScript);
	},
	isPC : function() {
		var filter = "win16|win32|win64|mac";
		if( navigator.platform )
		{
			if( filter.indexOf(navigator.platform.toLowerCase(), 0)<0)
			{
				return false;
			}
		}
		return true;
	}
});