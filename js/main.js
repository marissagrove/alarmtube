var shuffleArray = function(arg) {
	return arg.sort(function(a,b){ return (Math.random() * 100) < 50})
};

// JSalarm code originally from http://www.javascriptkit.com/script/script2/alarm.shtml
var jsalarm={
	padfield:function(f){
		return (f<10)? "0"+f : f
	},
	showcurrenttime:function(){
		var dateobj=new Date()
		var ct=this.padfield(dateobj.getHours())+":"+this.padfield(dateobj.getMinutes())+":"+this.padfield(dateobj.getSeconds())
		this.ctref.innerHTML=ct
		this.ctref.setAttribute("title", ct)
		if (typeof this.hourwake!="undefined"){ //if alarm is set
			if (this.ctref.title==(this.hourwake+":"+this.minutewake+":"+this.secondwake)){
				clearInterval(jsalarm.timer);
				setInterval(setAppropriateVolume, 100);
				player.loadPlaylist({playlist:document.getElementById("playlist").value.split(","),
					listType:"playlist",
					index:0,
				});
				player.playVideo();
			}
		}

	},
	init:function(){
		var dateobj=new Date()
		this.ctref=document.getElementById("jsalarm_ct")
		this.submitref=document.getElementById("submitbutton")
		this.submitref.onclick=function(){
			jsalarm.setalarm()
			this.value="Alarm Set"
			this.disabled=true
			return false
		}
		this.resetref=document.getElementById("resetbutton")
		this.resetref.onclick=function(){
			jsalarm.submitref.disabled=false
			jsalarm.hourwake=undefined
			jsalarm.hourselect.disabled=false
			jsalarm.minuteselect.disabled=false
			jsalarm.secondselect.disabled=false
			return false
		}
		var selections=document.getElementsByTagName("select")
		this.hourselect=selections[0]
		this.minuteselect=selections[1]
		this.secondselect=selections[2]
		for (var i=0; i<60; i++){
			if (i<24) //If still within range of hours field: 0-23
				this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours()==i)
			this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes()==i)
			this.secondselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds()==i)

		}
		jsalarm.showcurrenttime()
		jsalarm.timer=setInterval(function(){jsalarm.showcurrenttime()}, 1000)
	},
	setalarm:function(){
		this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
		this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
		this.secondwake=this.secondselect.options[this.secondselect.selectedIndex].value
		this.hourselect.disabled=true
		this.minuteselect.disabled=true
		this.secondselect.disabled=true
	}
}

var player = null;

var onYouTubeIframeAPIReady = function() {
  player = new YT.Player('ytapiplayer', {
    height: '356',
    width:  '425',
    videoId: 'JW5meKfy3fY',
    events: {
      'onReady': onVideosReady
    }
  });
  player.cuePlaylist
};

var onVideosReady = function(event) {
  player = event.target;
};

var setAppropriateVolume = function() {
	var playerCurrentTime = player.getCurrentTime();
	var videoLength = player.getDuration();
	var currentPercent = playerCurrentTime / videoLength * 100;

	player.setVolume(currentPercent);
};

var delta = 0.005;

// Be sure to set element's opacity to a number before calling
// fadeInAndOut on it.
//
/* Example usage:
   setInterval(function(){
     fadeInAndOut(document.getElementById('ytapiplayer'))
     }, 10)
*/
var fadeInAndOut = function(element) {
	if (Math.round(parseFloat(element.style.opacity) * 100) >= 100) {
		delta = -0.005;
	};

	if (Math.round(parseFloat(element.style.opacity) * 100) <= 0) {
		delta = 0.005;
	};

	element.style.opacity = parseFloat(element.style.opacity) + delta;
};

window.onload = function() {
	jsalarm.init();

	var stopVideoButton = document.getElementById("stop-video"); 
	
	var stopVideo = function() {
		player.pauseVideo();

		return false;
	};

	stopVideoButton.onclick = stopVideo;

	var videoIds = ["oe1wtkkt9-E", "4NZdggNUvq0", "KQ5yjAH7bxM", "c90w77hmaa8", "rfUYuIVbFg0"];
	var playlistInput = document.getElementById("playlist");

	playlistInput.value = shuffleArray(videoIds);
};
			
