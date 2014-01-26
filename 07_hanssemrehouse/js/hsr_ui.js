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
			infiniteLoop: true
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
		mainModuleRolling('#hrModuleThumbBestr');
		mainModuleRolling('#hrModuleThumbExamr');
		setTimeout(function() {
			mainModuleRolling('#hrModuleThumbBestp');
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
		var hrSelectDefault = function(id) {
			$(""+id+"").selectbox({
				onOpen: function () {
					var thisOption = $(this).parent().find(".sbOptions");
					$(this).next().addClass("sbOpen");
					thisOption.css("top","32px");
					thisOption.find("li:first").addClass("first");
					thisOption.find("li:last").addClass("last");
				},
				onClose: function () {
					$(this).next().removeClass("sbOpen");
				},
			});
		};
		hrSelectDefault("#hrpSortSelect");
		hrSelectDefault("#hrpSubMenuSelect");
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
		var hrSnbWa = function() {
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
		};
		hrSnbWa();

		// SNB mouseover
		var hrSnbMouseAction = function() {
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
		};
		hrSnbMouseAction();
	},
	// footer selectbox
	hrFooterSelectBox : function() {
		$("#hrFamilySite").selectbox({});
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
});