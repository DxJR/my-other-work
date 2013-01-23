$(window).ready(function() {
	imTv.init();
});

var imTv = ({
	init : function() {
		this.swipeInit("visualSwipe", ".visual_by", "500");
		this.swipeInit("swipeLecture", ".lecture_list", ".lecture_swipe_w", "500");
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
				this.swipeAnimation(swipeObjWidth * currentSwipeObj, swipeSpeed);
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
	}
});