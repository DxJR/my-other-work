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