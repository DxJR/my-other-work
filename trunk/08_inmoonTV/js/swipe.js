(function(a,b,c,d){function w(b){m=(new Date).getTime();var c=b.data.options,d=m-l,e=i-g,f=j-h,k=Math.abs(e),q=Math.abs(f),r=Math.round(Math.sqrt(Math.pow(e,2)+Math.pow(f,2)));if(c.triggerClick&&k<c.minMoveLength&&q<c.minMoveLength&&d<200){a(n).click();return}if(r<c.minSwipeLength){return}var s=Math.atan2(j-h,g-i);o=Math.round(s*180/Math.PI);if(o<0){o=360-Math.abs(o)}if(o<=45&&o>=0){p="left"}else if(o<=360&&o>=315){p="left"}else if(o>=135&&o<=225){p="right"}else if(o>45&&o<135){p="down"}else{p="up"}switch(p){case"left":if(c.swipeLeft&&typeof c.swipeLeft==="function")c.swipeLeft();break;case"right":if(c.swipeRight&&typeof c.swipeRight==="function")c.swipeRight();break;case"down":if(c.swipeDown&&typeof c.swipeDown==="function")c.swipeDown();break;case"up":if(c.swipeUp&&typeof c.swipeUp==="function")c.swipeUp();break}}function v(){g=0;h=0;i=0;j=0;k=false;l=null;m=null;n=null;o=null;p=null}function u(a){w(a);v()}function t(a){var b=a.data.options;if(b.preventDefault){a.preventDefault()}if(q){if(a.originalEvent.touches.length!=1){return}var c=a.originalEvent.touches[0];if(k){i=c.pageX;j=c.pageY}}else{if(k){i=a.pageX;j=a.pageY}}}function s(a){var b=a.data.options;if(b.preventDefault){a.preventDefault()}if(q){if(a.originalEvent.touches.length!=1){return}var c=a.originalEvent.touches[0];l=(new Date).getTime();g=i=c.pageX;h=j=c.pageY;k=true;n=a.target}else{l=(new Date).getTime();g=i=a.pageX;h=j=a.pageY;k=true;n=a.target}}function r(b,c){this.element=b;this.options=a.extend({},f,c);this._defaults=f;this._name=e;this.init()}var e="cfTouchSwipe",f={minSwipeLength:50,minMoveLength:15,triggerClick:true,preventDefault:true,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null};var g=0,h=0,i=0,j=0,k=false,l=null,m=null,n=null,o=null,p=null,q=!!("ontouchstart"in c.documentElement);r.prototype.init=function(){var b=a(this.element);if(q){b.unbind("touchstart.cfTouchSwipe");b.unbind("touchmove.cfTouchSwipe");b.unbind("touchend.cfTouchSwipe");b.bind("touchstart.cfTouchSwipe",{element:this.element,options:this.options},s);b.bind("touchmove.cfTouchSwipe",{element:this.element,options:this.options},t);b.bind("touchend.cfTouchSwipe",{element:this.element,options:this.options},u)}else{b.unbind("mousedown.cfTouchSwipe");b.unbind("mousemove.cfTouchSwipe");b.unbind("mouseup.cfTouchSwipe");b.bind("mousedown.cfTouchSwipe",{element:this.element,options:this.options},s);b.bind("mousemove.cfTouchSwipe",{element:this.element,options:this.options},t);b.bind("mouseup.cfTouchSwipe",{element:this.element,options:this.options},u)}};a.fn[e]=function(b){return this.each(function(){if(!a.data(this,"plugin_"+e)){a.data(this,"plugin_"+e,new r(this,b))}})}})(jQuery,window,document)