function snsShareBtn() {
	var wrapEle = document.getElementById('snsShare');
	var sEle = wrapEle.getElementsByTagName('ul')[0];
	var seBtn = shareEle.getElementByTagName('button');

	for (i=0; i<seBtn.length;i++ )
	{
		seBtn[i].onclick = function() {
			this.parentNode.className='this';
		}
	}
}


function snsSLtoggle() {
	var ssLayer = document.getElementById('snsShareLayer');
	ssLayer.style.display='inline';
}


function snsSLtoggle() {
	var ssLayer = document.getElementById('snsShareLayer');
	ssLayer.style.display='inline';
}

function snsSLClose() {
	var ssLayer = document.getElementById('snsShareLayer');
	ssLayer.style.display='none';
}




function initTge() {
	var listwrap = document.getElementById('orList');
	var displayNtag = orList.getElementsByTagName('div');
	var litag = orList.getElementsByTagName('li');

	for (i=0; i<displayNtag.length;i++)
	{
		var displayNtagClass = displayNtag[i].className;
		if (displayNtagClass=='ordet_help' || displayNtagClass=='or_detail_set')
		{
			displayNtag[i].style.display='none';
		}
	}
}

function toggleEle(tgnd) {
	var targetNode = document.getElementById(tgnd);
	initTge();

	targetNode.style.display='block';
	targetNode.parentNode.className='this';
}