(function(win,doc){
	var screenWidth = 1920;
	var screenHeight = 1080;
	function winResize(){
		var aspectRatio = doc.documentElement.clientWidth / doc.documentElement.clientHeight;
		if(aspectRatio > screenWidth/screenHeight){
			doc.documentElement.style.fontSize = doc.documentElement.clientHeight/screenHeight*100+'px';
		}else{
			doc.documentElement.style.fontSize = doc.documentElement.clientWidth/screenWidth*100+'px';
		}
	}
	winResize();
	win.addEventListener('resize',winResize);
})(window,document);