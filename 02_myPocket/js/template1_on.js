// BTN Menu
function initNavigation(seq) {
	nav = document.getElementById("main_btn");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	navLen = nav.childNodes.length;
	
	allA = nav.getElementsByTagName("a")
	for(k = 0; k < allA.length; k++) {
		allA.item(k).onmouseover = allA.item(k).onfocus = function () {
			nav.isOver = true;
		}
		allA.item(k).onmouseout = allA.item(k).onblur = function () {
			nav.isOver = false;
			setTimeout(function () {
				if (nav.isOver == false) {
					if (nav.menu[seq])
						nav.menu[seq].onmouseover();
					else if(nav.current) {
						menuImg = nav.current.childNodes.item(0);
						menuImg.src = menuImg.src.replace("_on.png", ".png");
						if (nav.current.submenu)
							nav.current.submenu.style.display = "none";
						nav.current = null;
					}
				}
			}, 500);
		}
	}

	for (i = 0; i < navLen; i++) {
		navItem = nav.childNodes.item(i);
		if (navItem.tagName != "LI")
			continue;

		navAnchor = navItem.getElementsByTagName("a").item(0);
		navAnchor.submenu = navItem.getElementsByTagName("ul").item(0);
		
		navAnchor.onmouseover = navAnchor.onfocus = function () {
			if (nav.current) {
				menuImg = nav.current.childNodes.item(0);
				menuImg.src = menuImg.src.replace("_on.png", ".png");
				if (nav.current.submenu)
					nav.current.submenu.style.display = "none";
				nav.current = null;
			}
			if (nav.current != this) {
				menuImg = this.childNodes.item(0);
				menuImg.src = menuImg.src.replace(".png", "_on.png");
				if (this.submenu)
					this.submenu.style.display = "block";
				nav.current = this;
			}
			nav.isOver = true;
		}
		nav.menuseq++;
		nav.menu[nav.menuseq] = navAnchor;
	}
	if (nav.menu[seq])
		nav.menu[seq].onmouseover();
}

// Adjust Layout
window.onload = function() {
	window.setInterval(function() {
		bodyEl = document.getElementById("body");
		subEl = document.getElementById("sub");
		if (!bodyEl || !subEl)
			return;
		if (bodyEl.offsetHeight < subEl.offsetHeight +  25) {
			bodyEl.style.height = subEl.offsetHeight + "px";
		}
	}, 200);
}

function initBoardList() {
	boardPager = document.getElementById("board-pager");
	if (boardPager)
		boardPager.getElementsByTagName("li").item(2).style.borderStyle = "none";
}
function initBoardViewPhoto() {
	imageContainer = document.getElementById("attach-photo");
	if (imageContainer) {
		imgEl = imageContainer.getElementsByTagName("img");
		for (i = 0; i < imgEl.length; i++) {
			if (imageContainer.offsetWidth < imgEl.item(i).offsetWidth) {
				imgEl.item(i).style.width = imageContainer.offsetWidth;
			}
		}
	}
}
