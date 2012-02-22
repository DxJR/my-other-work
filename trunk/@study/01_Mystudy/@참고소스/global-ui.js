function acOff(id) {
	document.getElementById(id).setAttribute("autocomplete","off");
}


var Dimmed = ({
	viewSize : Fsz.viewport,

	dimmedDiv : document.createElement("div"),
	targetDiv : null,
	
	// 딤드될 영역 설정
	setDimmedLayer : function() {

		if(!$('dimmedDiv')) {
			$(this.dimmedDiv).set('id','dimmedDiv');
			this.dimmedDiv.style.background = '#9F9F9F';
			if(Fsz.browser.isIE6()) {
				this.posInfo = 'absolute';
			} else {
				this.posInfo = 'fixed';
			}
			this.dimmedDiv.style.position = this.posInfo;
			this.dimmedDiv.style.left = '0';
			this.dimmedDiv.style.top = '0';
			this.dimmedDiv.style.zIndex = '3';
			this.dimmedDiv.style.height = this.viewSize.getContentsHeight() + 'px';
			this.dimmedDiv.style.width = this.viewSize.getContentsWidth() + 'px';
			$(this.dimmedDiv).setOpacity(60);
		} else {
			this.dimmedDiv.style.display = 'block';
		}
	},

	ie6Select : function() {
		var selObj = document.getElementsByTagName('select');
		if (navigator.appVersion.indexOf("MSIE 6") > -1)
		{
				for (i=0; i < selObj.length ;i++ )
				{
						if (selObj[i].style.visibility=='hidden')
						{
							selObj[i].style.visibility='visible';
						} else {
							selObj[i].style.visibility='hidden';
						}
				}
		}
	},

	dimmedLayer : function(tLayer) {
		this.setDimmedLayer();
		this.targetDiv = $(tLayer);
		this.targetDiv.style.position = 'absolute';
		this.targetDiv.style.top = '290px';
		this.targetDiv.style.zIndex = 4;
		this.targetDiv.style.left = '50%';

		var leftVar = ((parseInt(this.targetDiv.getStyle('width'),10) / 2) * -1) + 'px';
		
		if(this.targetDiv.lastChildElement().nodeName != 'IFRAME') {
			var tmpNodes = this.targetDiv.childElements();
			for(var i = 0; i<tmpNodes.length; i++) {
				tmpNodes[i].style.position = 'relative';
				tmpNodes[i].style.zIndex = 3;
			}
			
			var tobj = document.createElement('iframe');
			tobj.frameBorder = 0;
			tobj.style.position = 'absolute';
			tobj.style.left = 0;
			tobj.style.top = 0;
			tobj.width = parseInt(this.targetDiv.getStyle('width'),10) + 'px';
			tobj.style.height = '100%';
			this.targetDiv.appendChild(tobj);
		}
		
		this.targetDiv.style.marginLeft = leftVar;
		
		var target = document.getElementById('wrap_content');
		document.body.insertBefore(this.dimmedDiv,target);
		document.body.insertBefore($(tLayer),this.dimmedDiv);
		$(tLayer).show();
		this.ie6Select();
	},

	// 레이어 hide
	resetLayer : function() {
		this.dimmedDiv.hide();
		this.targetDiv.hide();
		this.ie6Select();
	}
});
 

function toggleLayer(id) {
	var tgL = document.getElementById(id);
	if (tgL.style.display=="none")
	{
		tgL.style.display="block";
	} else {
		tgL.style.display="none";
	}
}


function subTableOpen(strTDNum) {
	var MenuList = document.getElementById("maintable").getElementsByTagName('LI');
	var MenuListLength = MenuList.length;

	for (var i = 0; i < MenuListLength; i++) {
		if (i == strTDNum) {
			MenuList[i].className = 'tab' + (i + 1) + '_on';
			document.getElementById("subtbl_" + i).style.display = "block";
		} else {
			MenuList[i].className = 'tab' + (i + 1);
			document.getElementById("subtbl_" + i).style.display = "none";
		}
	}

	
	//MenuList[strTDNum].className = 'tab' + (strTDNum + 1) + '_on';
	//document.getElementById("subtbl_" + strTDNum).style.display = "block";

	/*
	var ncell_len = document.getElementById("maintable").childNodes.length;

	for (var i = 0; i < ncell_len; i++) {
		var obj = document.getElementById("menu_" + i);

		if (i == strTDNum) {
			obj.className = "tab" + (i+1) +"_on";
			document.getElementById("subtbl_" + i).style.display = "block";
		} else {
			obj.className = "tab" + (i+1);
			document.getElementById("subtbl_" + i).style.display = "none";
		}
	}
	*/
}


