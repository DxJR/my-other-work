$(window).load(function() {
	hsRehouse.init();
});

var hsRehouse = ({
	init : function() {
		this.hrHeadNoticeRolling();
		this.hrHrefPrevent();
		this.hrGoToDocument();
		this.hrLabelControl();
		this.hrFooterSelectBox();
		this.hrSnbAction();
		this.hrGnbLogin();
	},
	// front UI
	hrForntPage : function() {
		// main visual rolling
		$('#hrMainVIsual').bxSlider({
			auto: true,
			pause: 5000,
			speed: 500,
			slideMargin:0,
			mode: 'horizontal',
			pager : true,
			infiniteLoop: true,
			onSliderLoad : function(id) {
				if ($.browser.msie) {
					//$(".hr_main_visual").css({marginLeft:'-1px'});
				}
			}
		});
		// section module rolling
		var mainModuleRolling = function(id) {
			$(''+id+'').bxSlider({
				auto: true,
				pause: 3800,
				speed: 500,
				slideMargin:0,
				mode: 'horizontal',
				pager : false,
				infiniteLoop: true
			});
		};
		mainModuleRolling('#hrModuleThumbExamr');
		setTimeout(function() {
			mainModuleRolling('#hrModuleThumbRecmp');
		}, 1000);
		// section banner
		$('#hrMainSectionBanner').bxSlider({
			auto: true,
			pause: 4000,
			speed: 500,
			slideMargin:0,
			mode: 'vertical',
			pager : false,
			infiniteLoop: true
		});
	},
	// subpage UI
	hrSubPage : function() {
		var hrSelectDefault = function(id, top) {
			$(""+id+"").selectbox({
				onOpen: function () {
					var thisOption = $(this).parent().find(".sbOptions");
					$(this).parent().css("zIndex","99");
					$(this).next().addClass("sbOpen");
					thisOption.css("top",""+top+"px");
					thisOption.find("li:first").addClass("first");
					thisOption.find("li:last").addClass("last");
				},
				onClose: function () {
					$(this).next().removeClass("sbOpen");
					$(this).parent().css("zIndex","10");
				},
			});
		};
		hrSelectDefault("#hrpSortSelect","32");
		hrSelectDefault("#hrpSubMenuSelect","32");
		hrSelectDefault("#hrpFaqSearchSelect","26");
		hrSelectDefault("#hrpSortShopType","32");
		hrSelectDefault("#hrpSortShopWhere","32");
	},
	// 상품소개 slide
	hrProductPhotoSlide : function(id) {
		$("#"+id+"").bxSlider({
			auto: true,
			pause: 5000,
			speed: 500,
			slideMargin:0,
			mode: 'horizontal',
			pager : true,
			infiniteLoop: true,
			onSliderLoad : function(id) {
				if ($.browser.msie) {
					//$(".hrppd_photo_list").css({marginLeft:'-1px'});
				}
			}
		});
	},
	// 자주묻는질문
	hrFaq : function() {
		// 가장자주묻는질문Top5
		var hrFaqTop5 = (function() {
			var hrpeFaqListTop = $("#hrpeFaqListTop");
			var hrpeFLTtitle = hrpeFaqListTop.find("h4");

			hrpeFLTtitle.each(function(index) {
				$(this).bind("click", function() {
					hrpeFaqListTop.find("li").removeClass("selected");
					$(this).parent().addClass("selected");
				});
			});
		})();
		// FAQ리스트
		var hrFaqList = (function() {
			var hrpeFaqList = $("#hrpeFaqList");
			var hrpeFaqListHref = hrpeFaqList.find(".subject").find("a");

			hrpeFaqListHref.each(function(index) {
				$(this).bind("click", function(e) {
					if ($(this).parent().parent().hasClass("selected")) {
						$(this).parent().parent().removeClass("selected").next().removeClass("asSelected");
					} else {
						hrpeFaqList.find("tr").removeClass("selected");
						hrpeFaqList.find("tr").removeClass("asSelected");
						$(this).parent().parent().addClass("selected").next().addClass("asSelected");
					}
					e.preventDefault();
				});
			});
		})();
	},
	// 공지사항 rolling
	hrHeadNoticeRolling : function() {
		$('#hrNotice').bxSlider({
			speed: 250,
			slideMargin:0,
			mode: 'vertical',
			pager : false,
			infiniteLoop: false,
			hideControlOnEnd: true,
			prevSelector: '#hrNoticePrev',
			prevText: '이전',
			nextSelector: '#hrNoticeNext',
			nextText: '다음'
		});
	},
	// SNB
	hrSnbAction : function() {
		var snbList = $(".hr_snb > li");
		var snbButton = $(".hr_snb > li > a.gbtn");
		var snb2depth = $(".hrsnb_2d");

		/* tab키로 이동 : 접근성 */
		var hrSnbWa = (function() {
			snbButton.each(function() {
				$(this).bind('focus', function() {
					snb2depth.css({top:'-9999px', left:'-9999px'});
					$(this).next().css({top:'48px', left:'0'});
				});
			});
			$(".hrsnb_2d > li:last-child > a.gbtn").each(function() {
				$(this).bind({
					'focus' : function() {
						snb2depth.css({top:'-9999px', left:'-9999px'});
						$(this).parent().parent().css({top:'48px', left:'0'});
					}
				});
			});
			$("#hrSearchInput").bind("focus", function() {
				snb2depth.css({top:'-9999px', left:'-9999px'});
			});
		})();

		// SNB mouseover
		var hrSnbMouseAction = (function() {
			snbList.each(function() {
				$(this).bind({
					'mouseenter' : function() {
						$(this).addClass("hover");
					},
					'mouseleave' : function() {
						$(this).removeClass("hover");
					},
				});
			});
		})();
	},
	// footer selectbox
	hrFooterSelectBox : function() {
		$("#hrFamilySite").selectbox({});
	},
	hrViewToBig : function(thumbnail, viewer, vSelector, eventMode) {
		var hsrThumbnail = $(""+thumbnail+"");
		var hsrThumbnailList = hsrThumbnail.find("a");
		var hsrViewer = $(""+viewer+"");
		var hsrViewerImg = hsrViewer.find(""+vSelector+"");

		hsrThumbnailList.each(function(index) {
			$(this).bind(""+eventMode+"", function(e) {
				e.preventDefault();
				hsrThumbnailList.parent().removeClass("selected");
				hsrViewerImg.removeClass("selected");
				$(this).parent().addClass("selected");
				hsrViewer.find(""+vSelector+":eq("+index+")").addClass("selected");
			});
		});
	},
	// href 가 # 일 때 prevent
	hrHrefPrevent : function() {
		$(".hrefTemp").each(function() {
			$(this).bind('click', function(e) {
				e.preventDefault();
			});
		});
	},
	// 본문바로가기(접근성)
	hrGoToDocument : function() {
		var bindButton = $("#bSkipToDocument");
		var documentIndi = $("#hrContent");

		bindButton.bind({
			'focus' : function() {
				$(this).css({top : '0', left : '0'});
			},
			'blur' : function() {
				$(this).css({top : '-99999px', left : '-99999px'});
			},
			'click' : function() {
				documentIndi.focus();
				$(this).css({top : '-99999px', left : '-99999px'});
			}
		});
	},
	// input 및 textarea 에 label 제어
	hrLabelControl : function() {
		var labelObject = $("label");

		labelObject.each(function(index) {
			var labelThis = $(this);
			var labelThisTop = labelThis.css("top");
			var labelThisLeft = labelThis.css("left");

			$("#"+$(this).attr("for")+"").bind({
				'focus' : function() {
					thisLabelInputType = $(this).attr("type");
					if (thisLabelInputType == "text" || !thisLabelInputType) {
						labelThis.css({top:'-999999px', left:'-999999px'});
					}
				}, 'blur' : function() {
					if (thisLabelInputType == "text" || !thisLabelInputType) {
						if ($(this).val() == "") {
							labelThis.css({top:''+labelThisTop+'', left:''+labelThisLeft+''});
						}
					}
				}
			});
			$(this).bind("click", function() {
				$("#"+$(this).attr("for")+"").focus();
			});
		});
	},
	// 체크박스/라디오버튼 스타일
	CheckboxRadio : function(wrap, eletype, parentEle) {
		var crWrapper = $(""+ wrap +"");
		var crElement = crWrapper.find("input[type="+ eletype +"]");
		var crParentElement = crWrapper.find(""+ parentEle +"");

		// 체크박스
		crElement.each(function() {
			if ($(this).is(":checked")) {
				$(this).parent().addClass("cr_element_on");
			};
			$(this).bind('click', function(e) {
				if ($(this).is(":checked")) {
					if (eletype=="radio") {
						resetCrElement();
					}
					$(this).parent().addClass("cr_element_on");
				} else if ($(this).is(":not(:checked)")) {
					$(this).parent().removeClass("cr_element_on");
				}
			});
		});
		var resetCrElement = function() {
			crParentElement.each(function() {
				$(this).removeClass("cr_element_on");
			});
		};
	},
	// GNB 로그인 레이어
	hrGnbLogin : function() {
		var hrGnbLogin = $("#hrGnbLoginLayer");
		var hrBtnGnbLogin = $("#hrBtnGnbLogin");
		var hrBtnGnbLoginClose = $("#hrglCloseLayer");

		hrBtnGnbLogin.bind("click", function() {
			if (hrGnbLogin.hasClass("hrglLayerShow")) {
				hrGnbLogin.removeClass("hrglLayerShow");
			} else {
				hrGnbLogin.addClass("hrglLayerShow");
			}
		});
		hrBtnGnbLoginClose.bind("click", function() {
			hrGnbLogin.removeClass("hrglLayerShow");
		});
	},
	// 마이페이지 레이어
	hrMyPageLayer : function() {
		var mypageLink = $(".tit_re_w>a");
		var mypageClose = $(".hrmpl_close>button");

		mypageLink.each(function(index) {
			$(this).bind("click", function(e) {
				$(".hrmpLayerOpen").removeClass("hrmpLayerOpen");
				$(this).parent().hasClass("hrmpLayerOpen") ? $(this).parent().removeClass("hrmpLayerOpen") : $(this).parent().addClass("hrmpLayerOpen");
				e.preventDefault();
			});
		});

		mypageClose.each(function() {
			$(this).bind("click", function() {
				$(".hrmpLayerOpen").removeClass("hrmpLayerOpen");
			});
		});
	}
});