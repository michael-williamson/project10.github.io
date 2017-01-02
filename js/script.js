var $currentImage; 
var $overlay = $('<div id="overlay"><div id="lightbox"></div></div>');
var $leftArrow = $('<div class="left-arrow-wrapper"><div id="left-arrow" class="left-arrow"><</div></div>');
var $rightArrow = $('<div class="right-arrow-wrapper"><div id="right-arrow" class="right-arrow">></div></div>');
var $escape = $('<div id="esc-message">[esc]</div>');
var $closeX = $('<div id="close-x">x</div>');
var $overlayShowing = false; 



/**************************************************
this ajax function runs through spotify json top 
tracks to get the info needed
***************************************************/

$(document).ready(function(){
  var spotify = "https://api.spotify.com/v1/artists/4EVpmkEwrLYEg6jIsiPMIb/top-tracks?country=US";
  var displayPhotos = function(data){
    var html = '<ul>';
    $.each(data.tracks, function(i,eachTrack){
      html += '<li class="link">';
      html += '<a href="' + eachTrack.album.images[1].url + '">';
      html += '<img src="' + eachTrack.album.images[1].url + '" class="top-tracks-image">';
      html += '</a>';
      html += '<p id="album-text" class="album-text">' + eachTrack.album.name + '<span class="album-title-label">-album</span></p>';  
      html += '<p id="song-text" class="song-text">' + eachTrack.name + '</p>';
        var ms = eachTrack.duration_ms;
        var min = Math.floor(ms / 60000);
        var sec = ((ms % 60000) / 1000).toFixed(0); 
     if(sec < 10){
      html += '<p class="hidden min-sec">' + min + ':0' + sec + '</p>';
      }
     else{
      html += '<p class="hidden min-sec">' + min + ':' + sec + '</p>';
      }
      html += '<a class="hidden preview-mpeg-url" href="' + eachTrack.preview_url + '"></p>';
      html += '</li>';
    });
    html += '</ul>';
    $("main").html(html);
  }

  $.getJSON(spotify,displayPhotos);
});


/***************************************************
Preparing these templates to append to the lightbox div 
**************************************/
var $image = $('<img class="lightbox-image">');
var $songInfo = '<div id="song-info-div">';
        $songInfo += '<p class="overlay-album-text">Album: <span class="album-title"></span></p>';
        $songInfo += '<p class="overlay-song-text">Song: <span class="song-title"></span></p>';
        $songInfo += '<p class="overlay-song-text">Duration: <span class="duration-title"></span></p>';
        $songInfo += '<audio controls><source type="audio/mpeg"></audio>';
        $songInfo += '</div>';

$('body').append($overlay);
$overlay.hide(); 
$overlay.append($escape);
$("#lightbox").append($closeX);
$("#lightbox").append($image);
$image.hide().show("slow");
$("#lightbox").append($songInfo);
$("#lightbox").append($leftArrow);
$("#lightbox").append($rightArrow);

$("main").on("click", ".link", function (event) { 
        event.preventDefault();
        $currentImage = $(this);
        $overlay.hide().slideDown("slow");
        loadImage();
        $overlayShowing = true;   
});

function loadImage() {
        var $currentImageLocation = $currentImage.children("a").attr("href");
        $image.attr("src",$currentImageLocation);
        if( $(window).width() < 480){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "-150px",
            "left": "65px", });
            $(this).dequeue();
          });
         $image.fadeIn(2500);}
        if( $(window).width() >= 480 && $(window).width() < 700){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "16.625%",
            "left": "120%", });
            $(this).dequeue();
          });
        $image.fadeIn(2500);}
        if( $(window).width() >= 700 && $(window).width() < 1024){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "-150px",
            "left": "90px", });
            $(this).dequeue();
          });
        $image.fadeIn(2500);}

        var $album = $currentImage.children(".album-text").text();
        $album = $album.substr(0,($album.length - 6));                          //takes off the ("-album") string
        var $song = $currentImage.children(".song-text").text();
        var $duration = $currentImage.children(".min-sec").text();
        var $preview = $currentImage.children(".preview-mpeg-url").attr("href");
  
        $(".album-title").text($album);
        $(".song-title").text($song);
        $(".duration-title").text($duration);
  
        $("source").attr("src",$preview);
  
        $('audio').each(function(){
            this.load(); 
            this.volume = .25; 
            this.currentTime = 0;
            this.play(); 
        }); 
}

function loadImageResize() {
        var $currentImageLocation = $currentImage.children("a").attr("href");
        $image.attr("src",$currentImageLocation);
        if( $(window).width() < 480){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "-150px",
            "left": "65px", });
            $(this).dequeue();
          });
         $image.fadeIn(2500);}
        if( $(window).width() >= 480 && $(window).width() < 700){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "16.625%",
            "left": "120%", });
            $(this).dequeue();
          });
        $image.fadeIn(2500);}
        if( $(window).width() >= 700 && $(window).width() < 1024){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "120px",
            "height": "120px",
            "top": "-150px",
            "left": "90px", });
            $(this).dequeue();
          });
        $image.fadeIn(2500);}
        if( $(window).width() >= 1024){
        $image.fadeOut(1800);
        $(".lightbox-image")
            .delay(100)
            .queue(function(){
            $(this).css({
            "width": "300px",
            "height": "300px",
            "top": "0",
            "left": "0", });
            $(this).dequeue();
          });
        $image.fadeIn(2500);}

}


function loadImageSeekPhone() {
        var $currentImageLocation = $currentImage.children("a").attr("href");
        $image.attr("src",$currentImageLocation);
        $image.hide();
        $image.fadeIn(1500);

        var $album = $currentImage.children(".album-text").text();
        $album = $album.substr(0,($album.length - 6));                  //takes off the ("-album") string
        var $song = $currentImage.children(".song-text").text();
        var $duration = $currentImage.children(".min-sec").text();
        var $preview = $currentImage.children(".preview-mpeg-url").attr("href");
  
        $(".album-title").text($album);
        $(".song-title").text($song);
        $(".duration-title").text($duration);
        $("source").attr("src",$preview);
  
        $('audio').each(function(){
            this.load(); 
            this.volume = .25; 
            this.currentTime = 0;
            this.play(); 
        }); 
}
function loadImageSeek() {
        var $currentImageLocation = $currentImage.children("a").attr("href");
        $image.attr("src",$currentImageLocation);

        var $album = $currentImage.children(".album-text").text();
        $album = $album.substr(0,($album.length - 6));               //takes off the ("-album") string
        var $song = $currentImage.children(".song-text").text();
        var $duration = $currentImage.children(".min-sec").text();
        var $preview = $currentImage.children(".preview-mpeg-url").attr("href");
  
        $(".album-title").text($album);
        $(".song-title").text($song);
        $(".duration-title").text($duration);
        $("source").attr("src",$preview);
  
        $('audio').each(function(){
            this.load(); 
            this.volume = .25; 
            this.currentTime = 0;
            this.play(); 
        }); 
}

/****************************************
click events for traversing the dom
**************************************/

$('#left-arrow').on("click",function(){
        prevTrack();
        prevRecycle(); //ordered the recycle function after nextTrack
        if($(window).width() >= 1024){loadImageSeek();}
        else{loadImageSeekPhone();}
});

$('#right-arrow').on("click",function(){
        nextTrack();
        nextRecycle(); //ordered the recycle function after nextTrack
        if($(window).width() >= 1024){loadImageSeek();}
        else{loadImageSeekPhone();}
});

/****************************************
click events for hiding overlay
**************************************/

$("#close-x").on("click", function(){
        $overlay.slideUp();
        $('audio').each(function(){
            this.pause(); 
        }); 
});



/****************************************
keyboard events for traversing the dom
**************************************/


$(document).keydown(function(event){
  if($overlayShowing) {
    if(event.which == 39 ){              //right arrow
        nextTrack();
        nextRecycle(); //ordered the recycle function after nextTrack
        if($(window).width() >= 1024){loadImageSeek();}
        else{loadImageSeekPhone();}
    }
      
    else if (event.which == 37){          //left arrow
          prevTrack();
          prevRecycle();
        if($(window).width() >= 1024){loadImageSeek();}
        else{loadImageSeekPhone();}
    }
      
    else if (event.which == 32){          //spacebar
        $('audio').each(function(){
        if(this.paused){
          this.play();     // play and pause using spacebar
          } 
        else {
          this.pause(); 
          }
        }); 
      }
      
      else if(event.which == 27){    //esc key slides overlay up
           $('audio').each(function(){
                this.load();
           }); 
            if($(window).width() < 700){
            $(".lightbox-image").css({
            "width": "250px",
            "height": "250px",
            "top": "0",                 //so that when overlay slides up css reset for next click
            "left": "0",
            "z-index": "100",});}
        
            if($(window).width() >= 700 && $(window).width() < 1024){
            $(".lightbox-image").css({
            "width": "300px",
            "height": "300px",
            "top": "0",                 //so that when overlay slides up css reset for next click
            "left": "0",
            "z-index": "100",});}

           $overlay.slideUp("slow");
           $overlayShowing = false; 
      }
    } //-------end of $overlayShowing Bolean 
 });
//-------end of keydown function-----

window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        return false;
    }
};

/****************************************
Browser window resize event 
**************************************/

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});
 
 
function doneResizing(){
    loadImageResize(); 
}

function nextTrack(){
    $currentImage = $currentImage.next();
}
function prevTrack(){
    $currentImage = $currentImage.prev();
}

function nextRecycle(){
    if($currentImage.index() === -1){
        $currentImage = $(".link").first();  //loops lightbox forward and backward
    }
}

function prevRecycle(){
    if($currentImage.index() === -1){
        $currentImage = $(".link").last();
     }
}








