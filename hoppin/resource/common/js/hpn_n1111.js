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

	for (i=0;i<litag.length ;i++ )
	{
		litag[i].className='';
	}
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


// 복사
var init_copy = true;
function copyText(txt) 
{
	var txtbox = document.getElementById(txt);

    if(txtbox.value == "") {
        alert("클립보드에 저장할 문자를 입력 하세요.");
        txtbox.focus();
        return;
    }
	if(init_copy == false) 
	{
		init_copy = true;
		var oTag = eval(txtbox); 
		var oRange = oTag.createTextRange(); 
		oRange.execCommand("Copy");   
		init_copy = false;
	}
	else
	{
		var oTag = eval(txtbox); 
		var oRange = oTag.createTextRange(); 
		oRange.execCommand("Copy");
	}
	var txtValueCode = txtbox.value;
	txtbox.value="복사하였습니다. ctrl+v로 이용해 주세요.";
	setTimeout(function(){txtbox.value=""+txtValueCode+"";}, 2000);
}