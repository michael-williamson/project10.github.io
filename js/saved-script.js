var $currentImage; 

$(document).ready(function(){
  var spotify = "https://api.spotify.com/v1/artists/4EVpmkEwrLYEg6jIsiPMIb/top-tracks?country=US";
  var displayPhotos = function(data){
    var html = '<ul>';
    $.each(data.tracks, function(i,eachTrack){
      html += '<li class="link">';
      html += '<a href="' + eachTrack.album.images[1].url + '">';
      html += '<img src="' + eachTrack.album.images[1].url + '">';
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

var $currentImageLocation; var $image; var $album; var $song; var $duration; var $preview; var $songInfo; 

function loadImage() {
        var $currentImageLocation = $currentImage.children("a").attr("href");
        var $image = $('<img class="lightbox-image" src="' + $currentImageLocation + '">');
       
        var $album = $currentImage.children(".album-text").text();
        var $song = $currentImage.children(".song-text").text();
        var $duration = $currentImage.children(".min-sec").text();
        var $preview = $currentImage.children(".preview-mpeg-url").attr("href");

        var $songInfo = '<div id="song-info-div">';
        $songInfo += '<p class="overlay-album-text">Album: <span>' + $album + '</span></p>';
        $songInfo += '<p class="overlay-song-text">Song: <span>' + $song + '</span></p>';
        $songInfo += '<p class="overlay-song-text">Duration: <span>' + $duration + '</span></p>';
        $songInfo += '<audio controls><source src="' + $preview + '"></audio>';
        $songInfo += '</div>';
}


$("main").on("click", ".link", function () { 
        event.preventDefault();
        $currentImage = $(this);
        var $overlay = $('<div id="overlay"><div id="lightbox"></div></div>');
        $('body').append($overlay); 
        loadImage();  
        $("#lightbox").append($image);
        $("#lightbox").append($songInfo);

});

$("main").on("keydown",".link",function(event){
    if(event.which == 39){
        $currentImage = $currentImage.next(); 
        loadImage(); 
    }
    console.log($currentImage);
});



//
//    var $currentImageLocation = $currentImage.children("a").attr("href");
//        var $image = $('<img class="lightbox-image" src="' + $currentImageLocation + '">');
//        $("#lightbox").append($image);
//       
//        var $album = $currentImage.children(".album-text").text();
//        var $song = $currentImage.children(".song-text").text();
//        var $duration = $currentImage.children(".min-sec").text();
//        var $preview = $currentImage.children(".preview-mpeg-url").attr("href");
//
//        var $songInfo = '<div id="song-info-div">';
//        $songInfo += '<p class="overlay-album-text">Album: <span>' + $album + '</span></p>';
//        $songInfo += '<p class="overlay-song-text">Song: <span>' + $song + '</span></p>';
//        $songInfo += '<p class="overlay-song-text">Duration: <span>' + $duration + '</span></p>';
//        $songInfo += '<audio controls><source src="' + $preview + '"></audio>';
//        $songInfo += '</div>';
//        $("#lightbox").append($songInfo);
//














































